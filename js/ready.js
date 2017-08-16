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

  $("#yourLevelSlider").on("slidechange", function(event, ui) {
    $("#yourLevel").text(ui.value);
    updateAttrs("you", ui.value);
  });

  $("#theirLevelSlider").on("slide", function(event, ui) {
    $("#theirLevel").text(ui.value);
    updateAttrs("them", ui.value);
  });

  ["you", "them"].forEach( function(i) {
    $(".heroSelect."+ i).on("selectmenuchange", function() {
      updateAttrs(i, 1);
    });
    updateAttrs(i, 1);
  });

});
