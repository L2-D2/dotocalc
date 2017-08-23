function updateAttrs(whom) {
  let spot = `#${whom}AttrSpot`;
  let heroID = $(`.${whom}.heroSelect`).val();
  let lvl = parseInt($(`#${whom}Level`).text());
  let stats = calc_level_stats(heroID, lvl);
  // console.log(spot)
  stats.forEach(function(val, i) {
    var cleanVal = val.toFixed(1);
    $(spot).find(`p.${ATTRS[i]}`).text(cleanVal);
  });
};

function updateAttrIcons(whom) {
  let spot = `#${whom}AttrSpot`;
  let heroID = $(`.${whom}.heroSelect`).val();
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
  $(`.${whom}.armorVal`).text()
}

function updateEverything(whom, event) {
  updateAttrs(whom);
  updateDPS(whom, event);
  updateArmor(whom);
}

window.onload = function() {
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
    updateAttrs(i);
    updateAttrIcons(i);
  });
};
