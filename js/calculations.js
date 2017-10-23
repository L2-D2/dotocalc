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

function calc_player_armor(p) {
  let tower = $(`.${p}.towerChecks`).find(":checked").val();
  tower = ( typeof(tower) === "undefined" ? 0 : tower );
  let heroObj = yank_hero_obj( yank_hero_ID(p) );
  let armor_base = parseFloat(heroObj.ArmorPhysical);
  let armor_bonus_tower = ( tower == "0" ? 0 : tower == "1" ? 1 : 3 );
  let armor_bonus_obj = calc_special_bonus( find_items_special(p) ).armor;
  let armor_bonus = 0;
  for (let o in armor_bonus_obj) armor_bonus += armor_bonus_obj[o];
  let agi = yank_current_attrs(p)[1];
  let armor_agi = (yank_current_attrs(p)[1])/7;
  return ( armor_base + armor_agi + armor_bonus_tower + armor_bonus ).toFixed(3);
};

function calc_level_stats(heroID, level) {
  // base_stats = [str,agi,int,
  //                str_gain,agi_gain,int_gain]
  var base_stats = find_hero_base_stats(heroID);
  var new_stats = [
    base_stats[0]+(base_stats[3]*level),
    base_stats[1]+(base_stats[4]*level),
    base_stats[2]+(base_stats[5]*level)
  ];
  return new_stats;
};


function calc_special_bonus(specialObj) {
  // SpecialObj = { item1: { count: [1..6], special: [special_array] }, item2: {} }

  function special_bonus_stat_chomper(values) {
    ATTRS.forEach(function(a,i) {
      let short = "bonus_"+a;
      let long = ATTR_DICT[a][0];
      values[long] += ( values[short] || 0 );
      delete values[short];
    })
    return values;
  }

  let RELEVANTBONUSES = {
    armor: {bonus_armor: 0, armor_aura: 0},
    dmg: {bonus_damage: 0, bonus_attack_speed: 0},
    stats: {bonus_strength: 0, bonus_agility: 0, bonus_intellect: 0, bonus_all_stats: 0}
  };
  var bonus_values = new Object;
  var store_values = new Object;

  for (let item in specialObj) {
    specialObj[item].special.forEach( function(o,i) {
      let bonus_name = Object.keys(o)[0];
      let bonusObj = specialObj[item].special[i];
      store_values.hasOwnProperty(bonus_name) ?
        store_values[bonus_name] += (bonusObj[bonus_name]*specialObj[item].count)
      : store_values[bonus_name] = (bonusObj[bonus_name]*specialObj[item].count);
    });
  };
  store_values = special_bonus_stat_chomper(store_values);
  for (let cat in RELEVANTBONUSES) {
    for (let bon in RELEVANTBONUSES[cat]) {
      RELEVANTBONUSES[cat][bon] = ( store_values[bon] ? store_values[bon] : 0 )
    };
  };
  return RELEVANTBONUSES;
};

function calc_dps(whom, parent) {
  //  DPS =
  //  (((main damage × (1 + Σ percentage bonus damage) + flat bonus damage)
  //    × critical strike multiplier - blocked damage )
  //    × armor value multiplier × armor type multiplier
  //    × general damage multipliers) x attacks per second
  let randomDMG = $("#randomDMG").is(":checked") ? false : true;
  let otherWhom = ( whom=="you"? "them": "you");
  let itemBonusObj = calc_special_bonus( find_items_special(whom) );
  let heroObj = yank_hero_obj( yank_hero_ID(whom) );
  let heroAttr = ATTR_DICT[heroObj.AttributePrimary];
  let attrs_current = yank_current_attrs(whom);
  let attrs_effective = new Array;
  // effective attrs = current + bonus
  ATTRS.forEach( function(a,i){
    attrs_effective[i] = ( attrs_current[i]+itemBonusObj.stats[ ATTR_DICT[a][0] ]+itemBonusObj.stats.bonus_all_stats )
  });
  // is there bonus_attack_speed? yes: agi + bonus; no: agi
  let attack_speed = attrs_effective[1] + itemBonusObj.dmg.bonus_attack_speed;
  let armor_other
  let dmg_base_options = calc_dmg_base_avg(heroObj.AttackDamageMin, heroObj.AttackDamageMax);
  let dmg_base = randomDMG? dmg_base_options[1] : dmg_base_options[0];
  let dmg_bonus_percent;
  let dmg_bonus_flat = itemBonusObj.dmg.bonus_damage || 0;
  let dmg_attr = attrs_effective[ ATTRS.indexOf(heroAttr) ];
  let scalar_crit;
  let dmg_blocked;
  let scalar_armor_other = calc_scalar_armor(yank_current_armor(otherWhom));
  let scalar_armor_type;
  let scalar_general;
  let hz_attack = (100 + attack_speed) * 0.01 / parseFloat(heroObj.AttackRate);
  let dmg_main = dmg_base + dmg_attr + dmg_bonus_flat;

  return [dmg_main, hz_attack, scalar_armor_other];
};

function calc_scalar_armor(armor, armorClass, attkType) {
  // Damage multiplier = 1 - 0.06 × armor ÷ (1 + 0.06 × |armor|)
  return (1-0.06*armor)/(1+0.06*Math.abs(armor));
};

function calc_dmg_base_avg (min, max) {
  min = parseFloat(min);
  max = parseFloat(max);
  var avg = (min+max)/2;
  var rand_int = Math.floor(Math.random() * 42);
  var sum = 0;
  for (let i = 0; i < rand_int; i++) { sum += ((Math.random() * (max - min)) + min) };
  return [avg, (sum /rand_int)];
};
