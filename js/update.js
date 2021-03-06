function updateAttrs(whom) {
  let spot = `#${whom}AttrSpot`;
  let heroID = $(`.${whom}.heroSelect`).val();
  let lvl = parseInt($(`#${whom}Level`).val());
  let levelStats = calc_level_stats(heroID, lvl);
  let itemBonusObj = calc_special_bonus( find_items_special(whom) ).stats;
  levelStats.forEach(function(val, i) {
    let bonusVal = itemBonusObj.bonus_all_stats + itemBonusObj[ATTR_DICT[ATTRS[i]][0]];
    $(spot).find(`p.${ATTRS[i]}`).text((val+bonusVal).toFixed(1));
  });
};

function updateAttrIcons(whom) {
  let spot = `#${whom}AttrSpot`;
  let heroID = yank_hero_ID(whom);
  let heroObj = yank_hero_obj(heroID);
  let attrPrime = ATTR_DICT[heroObj.AttributePrimary];
  ATTRS.forEach(function(a) {
    $(spot).find(`img.${a}Icon`).attr("src", `assets/40px-${ATTR_DICT[a][1]}_attribute_symbol.png`);
  });
  $(spot).find(`img.${attrPrime}Icon`).attr("src", `assets/40px-${ATTR_DICT[attrPrime][1]}_primary_attribute_symbol.png`);
}

function updateItemSpecial(whom) {
  for (var i = 0; i < 6; i++) {
    let spot = `#${whom}itemSpecialList${i}`;
    $(spot).empty();
    let itemID = $(`#${whom}itemID${i}`).val();
    let itemsSpecial = find_items_special(whom);
    itemsSpecial[itemID].special.forEach(function(bonus) {
      let bonus_name = Object.keys(bonus)[0];
      $(spot).append(`<p>${bonus_name}: ${bonus[bonus_name]}</p><br>`);
    });
  }
}

function dpsButton(whom) {
    $("#randomDMG").prop("checked", false);
    updateDPS(whom);
};

function updateDPS(whom) {
  let dpsVars = calc_dps(whom);
  let dmg_main = dpsVars[0], hz_attack = dpsVars[1], scalar_armor_other = dpsVars[2];
  let dps = ((dmg_main * hz_attack)*(1-scalar_armor_other));
  $(`#${whom}DMG`).text(dmg_main.toFixed(2));
  $(`#${whom}hz_attack`).text(hz_attack.toFixed(4))
  $(`#${whom}DPS`).text(dps.toFixed(4));
}

function updateArmor(whom) {
  let armorClass = ARMORTYPES[1];
  let armors = calc_player_armor(whom);
  if (armors[1] > 0) {
    $(`.${whom}.armorBonusVal`).removeClass("textNegative");
    $(`.${whom}.armorBonusVal`).addClass("textPositive");
    armors[1] = `+${armors[1]}`;
  } else if (armors[1] < 0) {
    $(`.${whom}.armorBonusVal`).removeClass("textPositive");
    $(`.${whom}.armorBonusVal`).addClass("textNegative");
  } else if (armors[1] == 0) {
    $(`.${whom}.armorBonusVal`).removeClass("textNegative");
    $(`.${whom}.armorBonusVal`).removeClass("textPositive");
  }
  $(`p.${whom}.armorText`).text(`${armorClass} Armor`);
  $(`.${whom}.armorBaseVal`).text(armors[0]);
  $(`.${whom}.armorBonusVal`).text(armors[1]);
}

function updateFlavorText(whom) {
  let responseNum = Math.floor(Math.random() * RESPONSES.general.length);
  $(`h2.${whom}`).text(RESPONSES.general[responseNum]);
}

function updateEverything() {
  PLAYERS.forEach(function(p) {
    updateAttrs(p);
    updateArmor(p);
    updateItemSpecial(p);
    updateDPS(p)
  });
}

function defaultLC() {
  $(".heroSelect.you").val(104).selectmenu("refresh");
  updateFlavorText("you");
  updateAttrs("you");
  updateArmor("you");
  updateDPS("you");
}

function START() {
  PLAYERS.forEach( function(i) {
    $(`.heroSelect.${i}`).on("selectmenuchange", function() {
      updateEverything();
      updateFlavorText(i);
      updateAttrIcons(i);
    });
    $(`#${i}LevelSlider`).on("slide", function(e, ui) {
      $(`#${i}Level`).val(ui.value);
      updateEverything();
    });
    $(`#${i}Level`).change( function(e, ui) {
      let newValue = yank_hero_Level(i);
      $(`#${i}Level`).val(newValue);
      $(`#${i}LevelSlider`).slider("value", newValue);
      updateEverything();
    });
    $(`.${i}.itemDrop`).on("selectmenuchange", function(e) {
      updateEverything();
    });
    $(`input.${i}Radio`).change( function(e) {
      updateEverything();
    });
    updateAttrs(i);
    updateAttrIcons(i);
  });
  $("#randomDMG").change( function(e) {
    updateEverything();
  });
  $("#toggleItemStats").change( function() {
    $(".itemSpecialList").slideToggle("fast")
  });
  $(".itemSpecialList").slideToggle("fast");
  updateEverything();
  defaultLC();
};
