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
      if (this["ID"] && !this["ItemRecipe"] && (this["ItemAliases"] != "paint")) {
        var item = this;
        var itemNum = item["ID"];
        $(theSelect).append("<option value=" + itemNum + ">" + item["ItemAliases"] + "</option>");
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

$(document).ready( function() {
  makeItemSelects();
  makeHeroOptions(".heroDrop");
  makeItemOptions(".itemDrop");

});
