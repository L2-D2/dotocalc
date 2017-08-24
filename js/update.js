function updateAttrs(whom) {
  let spot = `#${whom}AttrSpot`;
  let heroID = $(`.${whom}.heroSelect`).val();
  let lvl = parseInt($(`#${whom}Level`).text());
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

function updateDPS(whom, parent) {
  var spot = `#${whom}DPS`;
  var dps = calc_dps(whom, parent);
  $(spot).text(dps);
}

function updateArmor(whom) {
  let armorClass = ARMORTYPES[1];
  $(`p.${whom}.armorText`).text(`${armorClass} Armor`);
  $(`.${whom}.armorVal`).text(calc_player_armor(whom));
}

function updateEverything(whom, event) {
  let otherWhom = (whom=="you"?"them":"you");
  updateAttrs(whom);
  updateArmor(whom);
  updateArmor(otherWhom);
  updateDPS(whom, event);
  updateDPS(otherWhom, event);
}

function START() {
  PLAYERS.forEach( function(i) {
    $(`.heroSelect.${i}`).on("selectmenuchange", function(e) {
      updateEverything(i,e);
      updateAttrIcons(i);
    });
    $(`#${i}LevelSlider`).on("slide", function(e, ui) {
      $(`#${i}Level`).text(ui.value);
      updateEverything(i,e);
    });
    $(`.${i}.itemDrop`).on("selectmenuchange", function(e) {
      updateEverything(i,e);
    });
    $(`input.${i}Radio`).change( function(e) {
      updateEverything(i);
    });
    updateAttrs(i);
    updateAttrIcons(i);
  });
};
