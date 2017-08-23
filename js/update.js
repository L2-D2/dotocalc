function updateAttrs(whom) {
  var spot = `#${whom}AttrSpot`;
  var hero = $(`.${whom}.heroSelect`).val();
  var lvl = parseInt($(`#${whom}Level`).text());
  var stats = calc_level_stats(hero, lvl);
  // console.log(spot)
  stats.forEach(function(val, i) {
    var cleanVal = val.toFixed(1);
    $(spot).find(`p.${ATTRS[i]}`).text(cleanVal);
  });
};

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
    });
    $(`#${i}LevelSlider`).on("slide", function(e, ui) {
      $(`#${i}Level`).text(ui.value);
      updateEverything(i,e);
    });
    $(`.${i}.itemDrop`).on("selectmenuchange", function(e) {
      updateEverything(i,e);
    });
    updateAttrs(i);
  });
};
