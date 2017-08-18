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


window.onload = function() {
  ["you", "them"].forEach( function(i) {
    $(".heroSelect."+ i).on("selectmenuchange", function() {
      updateAttrs(i);
    });
    $("#"+i+"LevelSlider").on("slide", function(event, ui) {
      $("#"+i+"Level").text(ui.value);
      updateAttrs(i, ui.value);
    });
    updateAttrs(i);
  });
};
