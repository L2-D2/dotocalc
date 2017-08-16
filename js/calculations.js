function final_armor(base, agi, tower, aura_armor, reduction) {
  var bonus_armor_tower = tower == 0 ? 0 : tower == 1 ? 1 : 3;
  var armor = base + agi/7 + bonus_armor_tower + aura_armor - reduction;
  return armor;
};

function calc_level_stats(hero, level) {
  // should be an array of [str,agi,int,str_gain,agi_gain,int_gain]
  var these_stats = find_hero_base_stats(hero);
  console.log("calc base "+ these_stats);
  var new_stats = [
    these_stats[0]+(these_stats[4]*level),
    these_stats[1]+(these_stats[5]*level),
    these_stats[2]+(these_stats[6]*level)
  ];
  return new_stats;
};

function find_hero_base_stats(heroNum) {
  var base_stats;
  var heroObj;
  for (var hero in HEROES.DOTAHeroes) {
    HEROES.DOTAHeroes[hero].HeroID == heroNum ? heroObj = HEROES.DOTAHeroes[hero] : null;
  };
  console.log(heroObj || "nein");
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
