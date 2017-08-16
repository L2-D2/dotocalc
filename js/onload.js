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
  $(spot).append('<div class="row"></div>')
  ATTRS.forEach( function(atr) {
      $(spot).children().append('<div class="col"><p class="'+atr+'"></p></div>');
      $(spot).children().append('<div class="col"><p>'+atr+'</p></div>');
      $(spot).children().append('<div class="w-100"></div>');
  });
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
