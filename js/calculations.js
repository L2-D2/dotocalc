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
  // SpecialObj = { item1: { count: [1-6], special: [special_array] }, item2: {} }
  var RELEVANTBONUSES = [
    "bonus_damage",
    "bonus_str",
    "bonus_agi",
    "bonus_int"
  ];
  var bonus_values = new Object;
  for (let item in specialObj) {
    specialObj[item].special.forEach( function(o) {
      let bonus_name = Object.keys(o)[0];
      RELEVANTBONUSES.includes(bonus_name) ? (
        bonus_values.hasOwnProperty(bonus_name) ? (
          bonus_values[bonus_name] += (specialObj[item].special[0][bonus_name]*specialObj[item].count)
        ) : (
          bonus_values[bonus_name] = (specialObj[item].special[0][bonus_name]*specialObj[item].count)
        )
      ) : null; // RELEVANTBONUSES.includes?
    });
  };
  return bonus_values;
};

function calc_dps(whom, parent) {
  // console.log({calling_calc_dps: parent});
  //  DPS =
  //  (((main damage × (1 + Σ percentage bonus damage) + flat bonus damage)
  //    × critical strike multiplier - blocked damage )
  //    × armor value multiplier × armor type multiplier
  //    × general damage multipliers) x attacks per second

  var itemBonusObj = calc_special_bonus( find_items_special(whom) );
  var heroObj = find_hero( $(whom + ", .heroSelect" ).val() );
  var heroAttr = ATTR_DICT[heroObj.AttributePrimary];
  var spot = "#"+whom+"AttrSpot";
  var dmg_attr = parseFloat( $(spot).find("p."+heroAttr).text() );
  var agi = parseFloat( $(spot).find("p.agi").text() );
  var dmg_base = calc_dmg_base_avg(heroObj.AttackDamageMin, heroObj.AttackDamageMax);
  var dmg_bonus_percent;
  var dmg_bonus_flat = itemBonusObj.bonus_damage || 0;
  var scalar_crit;
  var dmg_blocked;
  var scalar_armor;
  var scalar_armor_type;
  var scalar_general;
  var hz_attack = (100 + agi) * 0.01 / parseFloat(heroObj.AttackRate);

  // for the sake to seeing anything happen
  // console.log(whom, [dmg_base, dmg_attr, dmg_bonus_flat], itemBonusObj);
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
