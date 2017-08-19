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

function find_items_special(whom) {
  let listIDs = new Array;
  let items_special = new Array;
  $(whom+".itemSpot").find(".itemDrop").map(function(item) {
    listIDs.push(item)
  });
  listIDs.forEach(
    items_special.push(ITEMS.DOTAAbilities[item].AbilitySpecial)
  )
  return items_special;
}
