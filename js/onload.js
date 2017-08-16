// json = [heroes, items, abilites]
var HEROES;
var ITEMS;
const ATTRS = ["str", "agi", "int"];

function makeHeroOptions() {
  for (var key in HEROES.DOTAHeroes) {
    var hero = HEROES.DOTAHeroes[key];
    if (hero.HeroID) {
      var heroNum = hero.HeroID;
      $(".heroSelect").append("<option value=" + heroNum + ">" + hero.workshop_guide_name + "</option>");
    };
  };
};

function makeItemOptions() {
  for (var key in ITEMS.DOTAAbilities) {
    var item = ITEMS.DOTAAbilities[key];
    var itemName = item.ItemAliases || Object.keys(item);
    if (item["ID"] && !item["ItemRecipe"] && (itemName != "paint")) {
      var itemNum = item["ID"];
      $(".itemDrop").append("<option value=" + itemNum + ">" + itemName + "</option>");
    };
  };
};

function makeItemSelects() {
  $(".itemSpot").append('<div class="row"></div>');
  for (let i = 0; i < 6; i++) {
    $(".itemSpot").children().append('<div class="itemSpotChild col"></div>');
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

window.onload = function() {
  $.ajaxSetup({async: false});
  $.getJSON("json/heroes.json", function(data) {
    HEROES = data;
  });
  $.getJSON("json/items.json", function(data) {
    ITEMS = data;
  });

  makeLvlSliders();
  makeItemSelects();
  makeHeroOptions();
  makeItemOptions();
  $(".itemDrop").selectmenu();
  $(".heroSelect").selectmenu();
  makeAttrs("you");
  makeAttrs("them");
};
