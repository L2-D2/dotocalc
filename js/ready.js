var HEROES, ITEMS, YOU, THEM, RESPONSES;
var HEROJSONURL = "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_heroes.json";
var ITEMJSONURL = "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/items.json";

const PLAYERS = ["you", "them"];
const PLAYER_DICT = {
  you: {
    pickHero: "a Hero",
    possessive: "Your",
    possessiveSafe: "your"
  },
  them: {
    pickHero: "an Enemy",
    possessive: "Their",
    possessiveSafe: "their"
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
  this.heroLevel = parseInt($(`#${whom}Level`).val());
  this.lvlAttrs = calc_level_stats(this.heroID, this.heroLevel);
  this.effectiveArmor = 0;
};

function makeSkeleton(whom) {
  let whomPossessive = PLAYER_DICT[whom].possessive;
  let whomPossessiveSafe = PLAYER_DICT[whom].possessiveSafe;
  $("#main").append(`<div id="${whom}" class="full-hero container-fluid col-lg-6">`);
  $(`#${whom}`).append(
      `<span class="row">
        <div class="col vertAlign justify-content-center">
          <h2 class="${whom}">Pick ${PLAYER_DICT[whom].pickHero}!</h2>
        </div>
        <div class="col vertAlign justify-content-center">
          <select class="${whom} heroSelect"></select>
        </div>
      </span>`)
      .append(
        `<span class="row">
          <div class="col">
            <div class="row container-fluid ${whom} armorPlusLevel">
              <div class="col vertAlign">
                <label for="${whom}Level">${whomPossessive} Level</label>
              </div>
              <div class="col">
                <input type="text" class="form-control" id="${whom}Level" autocomplete="off" maxlength="2" pattern="[0-9]?[0-9]">
              </div>
              <span class="w-100"></span>
            </div>
          </div>
          <div class="col vertAlign" id="${whom}AttrSpot"></div>
        </span>`)
      .append(
        `<span>
          <div id="${whom}LevelSlider" class="${whom} lvlSlider"></div>
        </span>`)
      .append(`<span><h3>Pick ${whomPossessive} Items!</h3></span>`)
      .append(`<span class="${whom} itemSpot row"></span>`)
      .append(`<span>Pocket Riki? <input type="checkbox"></input></span>`)
      .append(`<span class="row ${whom} dpsRow vertAlign justify-content-center">`);
  $(`.${whom}.dpsRow`) // dps row
    .append(`<div class="col box"><p id=${whom}DMG>Over 9000!</p></div>`)
    .append('<div class="col"><p>dmg x</p></div>')
    .append(`<div class="col box"<p id=${whom}hz_attack>5?</p></div>`)
    .append('<div class="col"><p>attk/s =</p></div>')
    .append(`<div class="col box"><p id="${whom}DPS">Over 9000!</p></div>`)
    .append(`<div class="col"><span><button onclick='dpsButton("${whom}", "${whomPossessiveSafe}Button")'>DPS</button></span></div>`)
};

function makeTowerRadios(whom) {
  [0,1,2].forEach(function(i) {
    let words = ( i==0 ? "No" : ( i==1 ? 'T1' : 'T2+' ) );
    $(`.${whom}.towerChecks`).append(
      `<span class="${whom}T${i}Check">
        ${words}
        <input name="${whom}Tower" class="${whom}Radio" value="${i}" type="radio"/>
      </span>`
    );
  });
};

function makeHeroOptions() {
  let heroes = new Object();
  heroes.names = new Object();
  for (var key in HEROES.DOTAHeroes) {
    var hero = HEROES.DOTAHeroes[key];
    if (hero.HeroID && hero.HeroID != "127") {
      let heroNum = hero.HeroID;
      let heroName = hero.workshop_guide_name;
      heroes.names[heroName] = heroNum;
    };
  };
  heroes.sorted = Object.keys(heroes.names).sort();
  heroes.sorted.forEach(function(i) {
    $(".heroSelect").append(`<option value=${heroes.names[i]}>${i}</option>`);
  })
};

function makeItemOptions() {
  let items = new Object();
  items.names = new Array();
  for (var key in ITEMS.relevant) {
    var itemObj = ITEMS.DOTAAbilities[key];
    let itemName = find_item_name(itemObj, key);
    items.names.push(itemName);
    items[itemName] = itemObj.ID;
  };
  items.names.sort();
  items.names.forEach(function(i) {
    $(".itemDrop").append(`<option value=${items[i]}>${i}</option>`);

  });
};

function makeItemSelects(whom) {
  for (let i = 0; i < 6; i++) {
    $(`.itemSpot.${whom}`).append(`<div id="${whom}item${i}" class="col"></div>`);
    $(`#${whom}item${i}`)
      .append(`<span class="itemSpotChild${i} row justify-content-center ${whom}"></span>`)
      .append(`<span id="${whom}itemSpecialList${i}" class="itemSpecialList row justify-content-center box"></span>`);
    if (i == 2) {
      $(`.itemSpot.${whom}`).append('<span class="w-100"></span>');
    };
    $(`.itemSpotChild${i}.${whom}`).append(`<select id="${whom}itemID${i}" class="itemDrop ${whom}"></select>`)
  };
};

function makeArmorText(whom) {
  var spot = `.${whom}.armorPlusLevel`;
  $(spot).append(`
    <span class="row container-fluid">
      <div class="col justify-content-center vertAlign box">
        <p class="${whom} armorBaseVal">??</p>
      </div>
      <div class="col justify-content-center vertAlign box">
        <p class="${whom} armorBonusVal">??</p>
      </div>
    </div>`);
  $(spot).append(`<div class="col vertAlign"><p class="${whom} armorText">Hero Armor?</p></div>`);
  $(spot).append(`<div class="col justify-content-center vertAlign ${whom} towers"></div>`);
  $(`.${whom}.towers`)
    .append(`<div class="col vertAlign justify-content-center">Tower Aura?</div>`)
    .append(`<div class="col vertAlign justify-content-center ${whom} towerChecks"></div>`);
};

function makeAttrs(whom) {
  var spot = `#${whom}AttrSpot`;
  $(spot).append('<div class="row"></div>');
  ATTRS.forEach( function(atr) {
    let icon = `40px-${ATTR_DICT[atr][1]}_attribute_symbol.png`
    $(spot).children().append(`<div class="col justify-content-center vertAlign"><p class=${atr}></p></div>`);
    $(spot).children().append(`<div class="col"><img class="${whom} ${atr}Icon"src=assets/${icon}></div>`);
    $(spot).children().append('<div class="w-100"></div>');
  });
};

function makeSliders(p) {
  $(`#${p}LevelSlider`).slider({
    max: 25,
    min: 1,
    value: 1
  });
  $(`#${p}Level`).val(1);
};

$.getJSON("json/responses.json").done(function(i) {
  RESPONSES = i;
})

$.when(find_JSON(HEROJSONURL), find_JSON(ITEMJSONURL)).done(function(h,i) {
  HEROES = JSON.parse(h[0]);
  ITEMS = JSON.parse(i[0]);
  PLAYERS.forEach( function(p) {
    makeSkeleton(p);
    makeArmorText(p);
    makeTowerRadios(p);
    makeItemSelects(p);
    makeAttrs(p);
    makeSliders(p);
  });
  FIX_QUIRKS();
  makeHeroOptions();
  makeItemOptions();
  $("button").button();
  $("select").selectmenu();
  $(".itemDrop").val(1).selectmenu("refresh");
  START();
});
