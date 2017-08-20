function updateAttrs(whom) {
  var spot = "#"+whom+"AttrSpot";
  var hero = $(whom + ", .heroSelect" ).val();
  var lvl = parseInt($("#"+whom+"Level").text());
  var stats = calc_level_stats(hero, lvl);
  // console.log(spot)
  stats.forEach(function(val, i) {
    var cleanVal = val.toFixed(1);
    $(spot).find("p."+ATTRS[i]).text(cleanVal);
  });
};

function updateDPS(whom, parent) {
  var spot = "#"+whom+"DPS";
  var dps = calc_dps(whom, parent);
  $(spot).text(dps);
}

window.onload = function() {
  ["you", "them"].forEach( function(i) {
    $(".heroSelect."+ i).on("selectmenuchange", function(e) {
      updateAttrs(i);
      updateDPS(i, e);
    });
    $("#"+i+"LevelSlider").on("slide", function(event, ui) {
      $("#"+i+"Level").text(ui.value);
      updateAttrs(i, ui.value);
      updateDPS(i, event);
    });
    $(".itemDrop."+i).on("selectmenuchange", function(e) {
      updateDPS(i,e)
    });
    updateAttrs(i);
  });
};
