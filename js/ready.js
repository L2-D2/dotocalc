var HEROES, ITEMS, YOU, THEM;
const PLAYERS = ["you", "them"];
const PLAYER_DICT = {
  you: {
    pickHero: "a Hero",
    possessive: "Your"
  },
  them: {
    pickHero: "an Enemy",
    possessive: "Their"
  }
};
const ATTRS = ["str", "agi", "int"];
const ARMORTYPES = ["Basic", "Hero", "Siege"];
const ATTR_DICT = {
  DOTA_ATTRIBUTE_STRENGTH: ATTRS[0],
  DOTA_ATTRIBUTE_AGILITY: ATTRS[1],
  DOTA_ATTRIBUTE_INTELLECT: ATTRS[2],
  str: ["bonus_strength", "Strength"],
  agi: ["bonus_agility", "Agility"],
  int: ["bonus_intellect", "Intelligence"]
};

function Player(whom) {
  this.heroID = $(`.${whom}.heroSelect`).val();
  this.heroObj = yank_hero_obj(this.heroID);
  this.heroLevel = parseInt($(`#${whom}Level`).text());
  this.lvlAttrs = calc_level_stats(this.heroID, this.heroLevel);
  this.effectiveArmor = 0;
}

function makeSkeleton(whom) {
  let whomLowPosses = PLAYER_DICT[whom].possessive.toLowerCase();
  let whomUpPosses = PLAYER_DICT[whom].possessive;
  $("#main").append(`<div id="${whom}" class="full-hero container-fluid col-lg-6">`);
  $(`#${whom}`)
    .append(`<span><h2>Pick ${PLAYER_DICT[whom].pickHero}!</h2></span>`)
    .append(`<span class="row ${whom} topRow"></span>`)
    .append(`<span><div id="${whom}LevelSlider" class="${whom} lvlSlider"></div></span>`)
    .append(`<span><h3>Pick ${whomLowPosses} Items!</h3></span>`)
    .append(`<span class="${whom} itemSpot"></span>`)
    .append(`<span>Pocket Riki? <input type="checkbox"></input></span>`)
    .append(`<span class="row ${whom} dpsRow vertAlign justify-content-center">`);
  $(`.${whom}.topRow`) // topRow
    .append(`<div class="col">
      <div class="row container-fluid ${whom} armorPlusLevel">
        <div class="col vertAlign"><p>${whomUpPosses} Level</p></div>
        <div class="col">
        <p class="box " id="${whom}Level">1</p>
        </div>
        <span class="w-100"></span>
      </div>
    </div>`)
    .append(`<div class="col vertAlign justify-content-center"><select class="${whom} heroSelect"></select></div>`)
    .append(`<div class="col vertAlign" id="${whom}AttrSpot"></div>`);  // !topRow
  $(`.${whom}.dpsRow`) // dps row
    .append(`<div class="col"><span><button onclick='updateDPS("${whom}", "${whomLowPosses}Button")'>DPS</button></span></div>`)
    .append(`<div class="col"><div class="box"><p id="${whom}DPS">Over 9000!</p></div></div>`)
    .append(`<div class="col justify-content-center vertAlign ${whom} towers"></div>`);
  $(`.${whom}.towers`)
    .append(`<div class="col vertAlign justify-content-center">Tower Aura?</div>`)
    .append(`<div class="col vertAlign justify-content-center ${whom} towerChecks"></div>`);
  [0,1,2,3].forEach(function(i) {
    let words = ( i==0 ? "No" : `T${i}` );
    $(`.${whom}.towerChecks`).append(`<span class="t${i}Check">${words}?<input name="${whom}Tower" type="radio"></input></span>`);
  });
};

function makeHeroOptions() {
  for (var key in HEROES.DOTAHeroes) {
    var hero = HEROES.DOTAHeroes[key];
    if (hero.HeroID && hero.HeroID != "127") {
      let heroNum = hero.HeroID;
      let heroName = hero.workshop_guide_name;
      $(".heroSelect").append(`<option value=${heroNum}>${heroName}</option>`);
    };
  };
};

function makeItemOptions() {
  for (var key in ITEMS.DOTAAbilities) {
    var itemObj = ITEMS.DOTAAbilities[key];
    if ( itemObj.ID && !itemObj.ItemRecipe && (itemObj.ItemAliases != "paint") ) {
      $(".itemDrop").append(`<option value=${itemObj.ID}>${key}</option>`);
    };
  };
  // var options = $(".itemDrop option");
  // options.detach().sort(function(a,b) {
  //   var at = $(a).text();
  //   var bt = $(b).text();
  //   return (at > bt)?1:((at < bt)?-1:0);
  // });
  // options.appendTo(".itemDrop option");
};

function makeItemSelects(whom) {
  $(".itemSpot."+whom).append('<div class="row"></div>');
  for (let i = 0; i < 6; i++) {
    $(`.itemSpot.${whom}`).children().append(`<div class="itemSpotChild col ${whom}"></div>`);
  };
  $(`.itemSpotChild.${whom}`).append(`<select class="itemDrop ${whom}"></select>`);

};

function makeArmorText(whom) {
  var spot = `.${whom}.armorPlusLevel`;
  $(spot).append(`<div class="col justify-content-center vertAlign box"><p class="${whom} armorVal">??</p></div>`);
  $(spot).append(`<div class="col vertAlign"><p class="${whom} armorText">Hero Armor?</p></div>`);
};

function makeAttrs(whom) {
  var spot = `#${whom}AttrSpot`;
  $(spot).append('<div class="row"></div>');
  ATTRS.forEach( function(atr) {
    let icon = `40px-${ATTR_DICT[atr][1]}_attribute_symbol.png`
    $(spot).children().append(`<div class="col justify-content-center vertAlign"><p class=${atr}></p></div>`);
    // $(spot).children().append(`<div class="col"><p>${atr}</p></div>`);
    $(spot).children().append(`<div class="col"><img class="${whom} ${atr}Icon"src=assets/${icon}></div>`);
    $(spot).children().append('<div class="w-100"></div>');
  });
};

$(document).ready( function() {
  // let playerArray = new Array;
  $.ajaxSetup({async: false});
  $.getJSON("json/heroes.json", function(data) {
    HEROES = data;
  });
  $.getJSON("json/items.json", function(data) {
    ITEMS = data;
  });
  PLAYERS.forEach( function(p) {
    makeSkeleton(p);
    makeItemSelects(p);
    makeAttrs(p);
    makeArmorText(p);
  });
  // playerArray.push(new Player(p));
  // [YOU, THEM] = playerArray;
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
