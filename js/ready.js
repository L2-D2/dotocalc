var HEROES;
var ITEMS;
const ATTRS = ["str", "agi", "int"];
const ATTR_DICT = {
  DOTA_ATTRIBUTE_STRENGTH: ATTRS[0],
  DOTA_ATTRIBUTE_AGILITY: ATTRS[1],
  DOTA_ATTRIBUTE_INTELLECT: ATTRS[2],
  str: "bonus_strength",
  agi: "bonus_agility",
  int: "bonus_intellect"
};

function makeHeroOptions() {
  for (var key in HEROES.DOTAHeroes) {
    var hero = HEROES.DOTAHeroes[key];
    if (hero.HeroID && hero.HeroID != "127") {
      var heroNum = hero.HeroID;
      $(".heroSelect").append("<option value=" + heroNum + ">" + hero.workshop_guide_name + "</option>");
    };
  };
};

function makeItemOptions() {
  for (var key in ITEMS.DOTAAbilities) {
    var itemObj = ITEMS.DOTAAbilities[key];
    if ( itemObj.ID && !itemObj.ItemRecipe && (itemObj.ItemAliases != "paint") ) {
      $(".itemDrop").append("<option value="+itemObj.ID+">"+key+"</option>");
    };
  };
};

function makeItemSelects(whom) {
  $(".itemSpot."+whom).append('<div class="row"></div>');
  for (let i = 0; i < 6; i++) {
    $(".itemSpot."+whom).children().append('<div class="itemSpotChild col '+whom+'"></div>');
  };
  $(".itemSpotChild."+whom).append('<select class="itemDrop '+whom+'"></select>');
};

function makeArmorText(whom) {
  var spot = "#"+whom+"AttrSpot";
  $(spot).append('<div class="row"></div>');
}

function makeAttrs(whom) {
  var spot = "#"+whom+"AttrSpot";
  $(spot).append('<div class="row"></div>');
  ATTRS.forEach( function(atr) {
      $(spot).children().append(`<div class="col"><p class=${atr}></p></div>`);
      $(spot).children().append(`<div class="col"><p>${atr}</p></div>`);
      $(spot).children().append('<div class="w-100"></div>');
  });
};

$(document).ready( function() {
  $.ajaxSetup({async: false});
  $.getJSON("json/heroes.json", function(data) {
    HEROES = data;
  });
  $.getJSON("json/items.json", function(data) {
    ITEMS = data;
  });
  ["you", "them"].forEach( function(i) {
    makeItemSelects(i);
    makeAttrs(i);
    makeArmorText(i);
  });
  makeHeroOptions();
  makeItemOptions();
  $(".lvlSlider").slider({
    max: 25,
    min: 1,
    value: 1
  });
  $("button").button();
  $("select").selectmenu();
});
