function final_armor(base, agi, tower, aura_armor, reduction) {
  var bonus_armor_tower = tower == 0 ? 0 : tower == 1 ? 1 : 3;
  var armor = base + agi/7 + bonus_armor_tower + aura_armor - reduction;
  return armor;
};

function find_level_stats(hero, level) {
  // should be an array of [str,agi,int,str_gain,agi_gain,int_gain]
  var base_stats = find_hero_base_stats(hero);
  var new_stats = [
    base_stats[0]+(base_stats[4]*level),
    base_stats[1]+(base_stats[5]*level),
    base_stats[2]+(base_stats[6]*level)
  ];
  return new_stats;
};

function find_hero_base_stats(hero) {
  var base_stats = [];
  $.getJSON("json/heroes.json").done( function(data) {
    var thisHero;
    $.each(data["DOTAHeroes"]) this.HeroID == hero ? {thisHero = this; break;};
    base_stats == [
      thisHero.AttributeBaseStrength,
      thisHero.AttributeBaseAgility,
      thisHero.AttributeBaseIntelligence,
      thisHero.AttributeStrengthGain,
      thisHero.AttributeAgilityGain,
      thisHero.AttributeIntelligenceGain
    ];
  });
  return base_stats;
};
