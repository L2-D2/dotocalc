// "npc_dota_hero_antimage": {
//   "HeroID": "1",
//   "ArmorPhysical": "-1",
//   "AttackCapabilities": "DOTA_UNIT_CAP_MELEE_ATTACK",
//   "AttackDamageMin": "27",
//   "AttackDamageMax": "31",
//   "AttackRate": "1.450000",
//   "AttackAnimationPoint": "0.300000",
//   "AttackAcquisitionRange": "600",
//   "AttackRange": "150",
//   "ProjectileSpeed": "0",
//   "AttributePrimary": "DOTA_ATTRIBUTE_AGILITY",
//   "AttributeBaseStrength": "22",
//   "AttributeStrengthGain": "1.500000",
//   "AttributeBaseIntelligence": "15",
//   "AttributeIntelligenceGain": "1.800000",
//   "AttributeBaseAgility": "22",
//   "AttributeAgilityGain": "2.800000",
//   "MovementSpeed": "315",
//   "MovementTurnRate": "0.500000",
// }

function calc_final_armor(base, agi, tower, aura_armor, reduction) {
  var bonus_armor_tower = tower == 0 ? 0 : tower == 1 ? 1 : 3;
  var armor = base + agi/7 + bonus_armor_tower + aura_armor - reduction;
  return armor;
};

function calc_level_stats(hero, level) {
  // base_stats = [str,agi,int,
  //                str_gain,agi_gain,int_gain]
  var base_stats = find_hero_base_stats(hero);
  var new_stats = [
    base_stats[0]+(base_stats[3]*level),
    base_stats[1]+(base_stats[4]*level),
    base_stats[2]+(base_stats[5]*level)
  ];
  return new_stats;
};

function calc_special_bonus(specialObj) {
  // SpecialObj = { item1: { count: [1..6], special: [special_array] }, item2: {} }
  var RELEVANTBONUSES = [
    "bonus_damage",
    "bonus_attack_speed",
    "bonus_strength",
    "bonus_agility",
    "bonus_intellect"
  ];
  var store_values = new Object;
  var bonus_values = new Object;
  for (let item in specialObj) {
    specialObj[item].special.forEach( function(o,i) {
      let bonus_name = Object.keys(o)[0];
      let bonusObj = specialObj[item].special[i];
      store_values.hasOwnProperty(bonus_name) ? (
        store_values[bonus_name] += (bonusObj[bonus_name]*specialObj[item].count)
      ) : (
        store_values[bonus_name] = (bonusObj[bonus_name]*specialObj[item].count)
      );
    });
  };
  ATTRS.forEach(function(a,i) {
    let short = "bonus_"+a;
    let long = ATTR_DICT[a];
    store_values[long] += (store_values[short] || 0);
    delete store_values[short];
  });
  RELEVANTBONUSES.forEach(function(bon) {
    bonus_values[bon] = store_values[bon] || 0;
  });
  // bonus_values = { bonus1: total-value, bonus2: total-value.. }
  return bonus_values;
};

function calc_dps(whom, parent) {
  //  DPS =
  //  (((main damage × (1 + Σ percentage bonus damage) + flat bonus damage)
  //    × critical strike multiplier - blocked damage )
  //    × armor value multiplier × armor type multiplier
  //    × general damage multipliers) x attacks per second

  var itemBonusObj = calc_special_bonus( find_items_special(whom) );
  var heroObj = yank_hero_obj( $(whom + ", .heroSelect" ).val() );
  var heroAttr = ATTR_DICT[heroObj.AttributePrimary];
  var attrIndex = ATTRS.indexOf(heroAttr);
  var current_attrs = yank_current_attrs(whom);
  // is there bonus_attack_speed? yes: agi + bonus; no: agi
  var attack_speed =
    itemBonusObj.bonus_attack_speed ?
      current_attrs[1] + itemBonusObj.bonus_attack_speed
      :current_attrs[1];
  var dmg_base = calc_dmg_base_avg(heroObj.AttackDamageMin, heroObj.AttackDamageMax);
  var dmg_bonus_percent;
  var dmg_bonus_flat = itemBonusObj.bonus_damage || 0;
  var dmg_attr = ( current_attrs[attrIndex] )+( itemBonusObj[ATTR_DICT[heroAttr]] );
  var scalar_crit;
  var dmg_blocked;
  var scalar_armor;
  var scalar_armor_type;
  var scalar_general;
  var hz_attack = (100 + attack_speed) * 0.01 / parseFloat(heroObj.AttackRate);

  var dmg_main = dmg_base + dmg_attr + dmg_bonus_flat;
  return (dmg_main * hz_attack).toFixed(4);
};

function calc_dmg_base_avg (min, max) {
  min = parseFloat(min);
  max = parseFloat(max);
  var avg = (min+max)/2;
  // return avg;
  var rand_int = Math.floor(Math.random() * 420);
  var valSum = 0;
  for (let i = 0; i < rand_int; i++) { valSum += (Math.random() * (max - min) + avg) };
  return valSum / (parseFloat(rand_int));
};
