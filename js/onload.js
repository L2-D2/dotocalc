const ATTRS = ["str", "agi", "int"]

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

function makeAttrs(whom) {
  var spot = "#"+whom+"AttrSpot";
  for (var i = 0; i < 3; i++) {
    $(spot).append('<div class="row '+ATTRS[i]+'"></div>');
    for (var j = 0; j < 2; j++) {
      $(spot)
        .find(".row."+ATTRS[i])
        .append('<div class="col j'+j+'"></div>');
      };
    $(spot)
      .find(".row."+ATTRS[i]+" > .col.j0")
      .append("<p class="+ATTRS[i]+">0</p>")

    $(spot)
      .find(".row."+ATTRS[i]+" > .col.j1")
      .append("<p>"+ATTRS[i]+"</p>")
  };
};

$(document).onLoad( function() {
  makeLvlSliders();
  makeItemSelects();
  makeHeroOptions();
  makeItemOptions();
  $(".itemDrop").selectmenu();
  $(".heroSelect").selectmenu();
  makeAttrs("you");
  makeAttrs("them");




});
