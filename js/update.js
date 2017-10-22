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

function updateDPS(whom, parent) {
  let dpsVars = calc_dps(whom, parent);
  let dmg_main = dpsVars[0], hz_attack = dpsVars[1], scalar_armor_other = dpsVars[2];
  let dps = ((dmg_main * hz_attack)*scalar_armor_other);
  $(`#${whom}DMG`).text(dmg_main.toFixed(2));
  $(`#${whom}hz_attack`).text(hz_attack.toFixed(4))
  $(`#${whom}DPS`).text(dps.toFixed(4));
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
      $(`#${i}Level`).val(ui.value);
      updateEverything(i,e);
    });
    $(`#${i}Level`).on("change", function(e, ui) {
      let newValue = yank_hero_Level(i);
      $(`#${i}Level`).val(newValue);
      $(`#${i}LevelSlider`).slider("value", newValue);
      updateEverything(i, e);
    });
    $(`.${i}.itemDrop`).on("selectmenuchange", function(e) {
      updateEverything(i,e);
    });
    $(`input.${i}Radio`).change( function(e) {
      updateEverything(i);
    });
    updateAttrs(i);
    updateAttrIcons(i);
    updateEverything(i);
  });
};
