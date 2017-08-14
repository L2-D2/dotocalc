const ATTRIBUTES = ["str", "agi", "int"]

function makeHeroOptions() {
  $.getJSON("json/heroes.json").done( function(data) {
    // var theSelect = $(name);
    $.each(data["DOTAHeroes"], function() {
      if (this["HeroID"]) {
        var hero = this;
        var heroNum = hero["HeroID"];
        $(".heroSelect").append("<option value=" + heroNum + ">" + hero["workshop_guide_name"] + "</option>");
      };
    });
  });
};

function makeItemOptions() {
  $.getJSON("json/items.json").done( function(data) {
    // var theSelect = $(name)
    $.each(data["DOTAAbilities"], function() {
      var itemName = this["ItemAliases"] || Object.keys(this);
      if (this["ID"] && !this["ItemRecipe"] && (itemName != "paint")) {
        var item = this;
        var itemNum = item["ID"];
        $(".itemDrop").append("<option value=" + itemNum + ">" + itemName + "</option>");
      };
    });
  });
};

function makeItemSelects() {
  $(".itemSpot").append('<div class="row"></div>');
  for (let i = 0; i < 6; i++) {
    $(".itemSpot").children().append('<div class="itemSpotChild col"></div>');
    // i == 2 ? $(".itemSpot").children().append('<div class="w-100"></div>') : null;
  };
  $(".itemSpotChild").append('<select class="itemDrop"></select>');
};

function makeLvlSliders() {
  $(".lvlSlider").slider({
    max: 25,
    min: 1,
    value: 1
  });
};

function updateAttrs(whom, lvl) {
  var spot = "#"+whom+"attrSpot";
  var hero = $(whom + " .heroSelect option:selected" ).val();
  var stats = calc_level_stats(hero, lvl);
  stats.forEach(function(val, i) {
    $(spot).find("p ."+ATTRIBUTES[i]).text(val);
  });
};

function makeAttrs(whom) {
  var spot = "#"+whom+"AttrSpot";
  for (var i = 0; i < 3; i++) {
    $(spot).append('<div class="row '+ATTRIBUTES[i]+'"></div>');
    for (var j = 0; j < 2; j++) {
      $(spot+" > .row")
        .find(ATTRIBUTES[i])
        .append('<div class="col"></div>');
      j == 0 ? (
        $(spot+"> .row "+ATTRIBUTES[i]+" > .col")
          .append("<p class="+ATTRIBUTES[i]+">0</p>")
      ) : (
        $(spot+"> .row "+ATTRIBUTES[i]+" > .col")
          .append("<p>"+ATTRIBUTES[i]+"</p>")
       );
    };
  };
};

$(document).ready( function() {
  makeLvlSliders();
  makeItemSelects();
  makeHeroOptions();
  makeItemOptions();
  $(".itemDrop").selectmenu();
  $(".heroSelect").selectmenu();
  makeAttrs("you");
  makeAttrs("them");

  $("#yourLevelSlider").on("slidechange", function(event, ui) {
    $("#yourLevel").text(ui.value);
    updateAttrs("you", ui.value);
  });

  $("#theirLevelSlider").on("slide", function(event, ui) {
    $("#theirLevel").text(ui.value);
    updateAttrs("them", ui.value);
  });


});
