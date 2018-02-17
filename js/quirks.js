function fix_special_quarterstaff() {
  ITEMS.DOTAAbilities.item_quarterstaff.AbilitySpecial[1].bonus_attack_speed =
    ITEMS.DOTAAbilities.item_quarterstaff.AbilitySpecial[1].bonus_speed;
  delete ITEMS.DOTAAbilities.item_quarterstaff.AbilitySpecial[1].bonus_speed;
};

function fix_special_ac_vlads() {
  let acSpecial = ITEMS.DOTAAbilities.item_assault.AbilitySpecial;
  let vladSpecial = ITEMS.DOTAAbilities.item_vladmir.AbilitySpecial;
  acSpecial.push({"aura_armor": acSpecial[4].aura_positive_armor});
  acSpecial.push({"corruption_armor": acSpecial[5].aura_negative_armor});
  vladSpecial.push({"aura_armor": vladSpecial[3].armor_aura});
}

function fix_alias_silver_edge() {
  let sword = ITEMS.DOTAAbilities.item_invis_sword;
  let aliases = sword.ItemAliases.split(";");
  aliases = aliases.filter(function(a) {return a != "shadow blade"}).join(";");
  sword.ItemAliases = aliases;
};

function fix_alias_hurricane_pike() {
 let pike = ITEMS.DOTAAbilities.item_hurricane_pike;
 let alias = pike.ItemAliases;
 pike.ItemAliases = alias+";hurricane pike";
};

function fix_alias_bloodthorn() {
  ITEMS.DOTAAbilities.item_bloodthorn.ItemAliases = "bloodthorn";
};

function fix_alias_ror() {
  ITEMS.DOTAAbilities.item_ring_of_regen.ItemAliases = "ring of regen";
};

function fix_alias_crimson() {
  ITEMS.DOTAAbilities.item_crimson_guard.ItemAliases = "crimson guard";
};

function parse_items() {
  let itemKeys = Object.keys(ITEMS.DOTAAbilities);
  ITEMS.consumables = {};
  ITEMS.relevant = {};
  ITEMS.recipes = {};
  let irrelevantItems = [
    "item_courier",
    "item_flying_courier",
    "item_tango",
    "item_tango_single",
    "item_ward_sentry",
    "item_ward_observer",
    "item_ward_dispenser",
    "item_tpscroll",
    "item_travel_boots_2",
    "item_aegis",
    "item_dust",
    "item_clarity",
    "item_bottle",
    "item_flask",
    "item_cheese",
    "item_gem",
    "item_tome_of_knowledge"
  ];
  itemKeys.forEach(function(key) {
    let theItemObj = ITEMS.DOTAAbilities[key];
    if (theItemObj.ItemRecipe == 1) {
      ITEMS.recipes[key] = theItemObj;
    };
    if (theItemObj.ItemQuality == "consumable") {
      ITEMS.consumables[key] = theItemObj;
    };
    if (theItemObj.AbilitySpecial
    && theItemObj.AbilitySpecial[0].paint_duration == undefined
    && !irrelevantItems.includes(key)
    && theItemObj.ItemQuality != "consumable") {
      ITEMS.relevant[key] = theItemObj;
    };
  });
};

function FIX_QUIRKS() {
  fix_special_quarterstaff();
  fix_special_ac_vlads()
  fix_alias_hurricane_pike();
  fix_alias_silver_edge();
  fix_alias_bloodthorn();
  fix_alias_ror();
  fix_alias_crimson();
  parse_items();
};
