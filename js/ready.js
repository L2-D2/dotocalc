function updateAttrs(whom, lvl) {
  var spot = "#"+whom+"attrSpot";
  var hero = $(whom + ", .heroSelect" ).val();
  var stats = calc_level_stats(hero, lvl);
  stats.forEach(function(val, i) {
    $(spot).find("p ."+ATTRS[i]).text(val);
  });
};


$(document).ready( function {
  $("#yourLevelSlider").on("slidechange", function(event, ui) {
    $("#yourLevel").text(ui.value);
    updateAttrs("you", ui.value);
  });

  $("#theirLevelSlider").on("slide", function(event, ui) {
    $("#theirLevel").text(ui.value);
    updateAttrs("them", ui.value);
  });
});
