function find_JSON(jsonURL) {
  return $.ajax({
    url: jsonURL,
    datatype: "json",
  });
};

function yank_hero_obj(id) {
  // Should return the object of the hero given the id
  var heroObj;
  for (var hero in HEROES.DOTAHeroes) {
    HEROES.DOTAHeroes[hero].HeroID == id ? heroObj = HEROES.DOTAHeroes[hero] : null;
  };
  return heroObj;
};

// returns longest alias in given item object
function find_item_name(obj, key) {
  if (obj.ItemAliases == undefined) return key;
  let k = 0;
  let name = "";
  let aliases = obj.ItemAliases.split(";");
  aliases.forEach( function(alias) {
    if (alias.length > k) {
      k = alias.length;
      name = alias;
    };
  });
  return name;
};

function yank_hero_ID(whom) { return $( `.${whom}.heroSelect` ).val() };

function yank_hero_Level(whom) {
  var value = $(`#${whom}Level`).val();
  if (isNaN(value) || value < 1) {
    value = $(`#${whom}LevelSlider`).slider("value");
    $(`#${whom}Level`).val(value);
  } else if (value > 25) {
    value = 25;
  };
  return value
}

function find_hero_base_stats(heroNum) {
  var base_stats;
  var heroObj = yank_hero_obj(heroNum);
  base_stats = [
    parseInt(heroObj.AttributeBaseStrength, 10),
    parseInt(heroObj.AttributeBaseAgility, 10),
    parseInt(heroObj.AttributeBaseIntelligence, 10),
    parseFloat(heroObj.AttributeStrengthGain, 10),
    parseFloat(heroObj.AttributeAgilityGain, 10),
    parseFloat(heroObj.AttributeIntelligenceGain, 10)
  ];
  return base_stats;
};

function yank_item_special(id) {
  let bons = new Array;
  for (let item in ITEMS.DOTAAbilities) {
    ITEMS.DOTAAbilities[item].ID == id ? (
      bons = ITEMS.DOTAAbilities[item].AbilitySpecial
    ) : null;
  };
  return bons
};

function yank_current_armor(whom) {
  let baseText = $( `.${whom}.armorBaseVal` ).text();
  let bonusText = $( `.${whom}.armorBonusVal` ).text();
  baseText = baseText == "??" ? 0 : parseFloat(baseText);
  bonusText = bonusText == "??" ? 0 : parseFloat(bonusText);
  return baseText + bonusText;
};

function yank_current_attrs(whom) {
  updateAttrs(whom);
  let attrs = new Array;
  var spot = `#${whom}AttrSpot`;
  ATTRS.forEach( function(attr, i) {
    attrs[i] = parseFloat( $(spot).find(`p.${attr}`).text() );
  });
  return attrs;
};

function find_items_special(whom) {
  let items_special = new Object;
  let special_array = new Array;
  let itemIDs = new Array;

  // itemIDs: the 6 items in an array as item.IDs
  $(`.${whom}.itemSpot`).find(".itemDrop").map( function() {
    itemIDs.push( $().add(this).val() );
  });

  // items_special = { item.ID: { count: [1..6], special: [special_array] }, otheritem.ID: {..}, ..}
  itemIDs.forEach( function(id) {
    items_special.hasOwnProperty(id) ? items_special[id].count += 1 : items_special[id] = {
      "count": 1,
      "special": yank_item_special(id)
    };
  });

  return items_special;
};

function GETBONUSES() {
  let list = new Array;
  for (let i in ITEMS.DOTAAbilities) {
    let bonuses = new Array;
    if (ITEMS.DOTAAbilities[i].AbilitySpecial) {
      ITEMS.DOTAAbilities[i].AbilitySpecial.forEach(function(e) {
        bonuses.push(Object.keys(e)[0]);
      });
      bonuses.forEach( function(e) {
        !list.includes(e) ? list.push(e) : null;
      });
    };
  };
  return list;
};
