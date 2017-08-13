function makeHeroOptions(name) {
  $.getJSON("json/heroes.json").done( function(data) {
    var theSelect = $(name);
    $.each(data["DOTAHeroes"], function() {
      if (this["HeroID"]) {
        var hero = this;
        var heroNum = hero["HeroID"];
        $(theSelect).append("<option value=" + heroNum + ">" + hero["workshop_guide_name"] + "</option>");
      };
    });
  });
};

function makeItemOptions(name) {
  $.getJSON("json/items.json").done( function(data) {
    var theSelect = $(name)
    $.each(data["DOTAAbilities"], function() {
      var itemName = this["ItemAliases"] || Object.keys(this);
      if (this["ID"] && !this["ItemRecipe"] && (itemName != "paint")) {
        var item = this;
        var itemNum = item["ID"];
        $(theSelect).append("<option value=" + itemNum + ">" + itemName + "</option>");
      };
    });
  });
};

function makeItemSelects() {
  $(".itemSpot").append('<div class="row"></div>');
  $(".itemSpot").append('<div class="row"></div>');
  $(".itemSpot").children().append('<div class="itemSpotChild col-sm-2"></div>');
  $(".itemSpot").children().append('<div class="itemSpotChild col-sm-2"></div>');
  $(".itemSpot").children().append('<div class="itemSpotChild col-sm-2"></div>');
  $(".itemSpotChild").append('<select class="itemDrop"></select>');
};

function makeLvlSliders() {
  $(".lvlSlider").slider({
    max: 25,
    min: 1,
    value: 1
  });
};

function helpLvlSliders() {
  // $("#yourLevelSlider").children().("ID", "yourLevelSlider")
}

$(document).ready( function() {
  makeLvlSliders();
  makeItemSelects();
  makeHeroOptions(".heroDrop");
  makeItemOptions(".itemDrop");
  $(".itemDrop").selectmenu();
  $(".heroDrop").selectmenu();
  $("#yourLevelSlider").on("slide", function(event, ui) {
    $("#yourLevel").text(ui.value);
  });
  $("#theirLevelSlider").on("slide", function(event, ui) {
    $("#theirLevel").text(ui.value);
  });

});
