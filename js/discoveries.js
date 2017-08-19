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
  let items_special = new Array;
  let itemIDs = new Array;
  $("."+whom+".itemSpot").find(".itemDrop").map( function() {
    itemIDs.push( $().add(this).val() );
  });
  for (item in ITEMS.DOTAAbilities) {
    // console.log(ITEMS.DOTAAbilities[item].ID);
    itemIDs.includes( ITEMS.DOTAAbilities[item].ID ) ? items_special.push(ITEMS.DOTAAbilities[item].AbilitySpecial) : null;
  };
  return items_special;
}
