function updateAttrs(whom, lvl) {
  var spot = "#"+whom+"AttrSpot";
  var hero = $(whom + ", .heroSelect" ).val();
  var stats = calc_level_stats(hero, lvl);
  // console.log(spot)
  stats.forEach(function(val, i) {
    var cleanVal = val.toFixed(2);
    $(spot).find("p."+ATTRS[i]).text(cleanVal);
  });
};


$(document).ready( function() {
  ["you", "them"].forEach( function(i) {
    $(".heroSelect."+ i).on("selectmenuchange", function() {
      var lvl = $(i+"")
      updateAttrs(i, 1);
    });
    $("#"+i+"LevelSlider").on("slide", function(event, ui) {
      $("#"+i+"Level").text(ui.value);
      updateAttrs(i, ui.value);
    });
    updateAttrs(i, 1);
  });
});
