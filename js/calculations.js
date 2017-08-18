// "npc_dota_hero_antimage": {
//   "HeroID": "1",
//   "Ability1": "antimage_mana_break",
//   "Ability2": "antimage_blink",
//   "Ability3": "antimage_spell_shield",
//   "Ability4": "antimage_mana_void",
//   "Ability10": "special_bonus_hp_150",
//   "Ability11": "special_bonus_attack_damage_20",
//   "Ability12": "special_bonus_attack_speed_20",
//   "Ability13": "special_bonus_unique_antimage",
//   "Ability14": "special_bonus_evasion_15",
//   "Ability15": "special_bonus_all_stats_10",
//   "Ability16": "special_bonus_agility_25",
//   "Ability17": "special_bonus_unique_antimage_2",
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

function calc_dps(whom) {
//  DPS =
  //  (((main damage × (1 + Σ percentage bonus damage) + flat bonus damage)
  //    × critical strike multiplier - blocked damage )
  //    × armor value multiplier × armor type multiplier
  //    × general damage multipliers) x attacks per second
  var heroObj = find_hero( $(whom + ", .heroSelect" ).val() );
  var heroAttr = ATTR_DICT[heroObj.AttributePrimary];
  // Main damage = dmg_base + dmg_attr
  var dmg_attr = parseFloat( $(spot).find("p."+heroAttr).text() );
  var dmg_main = dmg_base_avg(
    heroObj.AttackDamageMin,
    heroObj.AttackDamageMax
  ) + dmg_attr;
  var dmg_bonus_percent;
  var dmg_bonus_flat;
  var scalar_crit;
  var dmg_blocked;
  var scalar_armor
  var scalar_armor_type;
  var scalar_general;

};

function find_hero(id) {
  // Should return the object of the hero given the id
  var heroObj;
  for (var hero in HEROES.DOTAHeroes) {
    HEROES.DOTAHeroes[hero].HeroID == id ? heroObj = HEROES.DOTAHeroes[hero] : null;
  };
  return heroObj;
}

function find_hero_base_stats(heroNum) {
  var base_stats;
  var heroObj = find_hero(heroNum);
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
