function makeHeroOptions() {
  $.getJSON("json/heroes.json").done( function(data) {
    // var theSelect = $(name);
    $.each(data["DOTAHeroes"], function() {
      if (this["HeroID"]) {
        var hero = this;
        var heroNum = hero["HeroID"];
        $(".heroSelect").append("<option value=" + heroNum + ">" + hero["workshop_guide_name"] + "</option>");
      };
    });
  });
};

function makeItemOptions() {
  $.getJSON("json/items.json").done( function(data) {
    // var theSelect = $(name)
    $.each(data["DOTAAbilities"], function() {
      var itemName = this["ItemAliases"] || Object.keys(this);
      if (this["ID"] && !this["ItemRecipe"] && (itemName != "paint")) {
        var item = this;
        var itemNum = item["ID"];
        $(".itemDrop").append("<option value=" + itemNum + ">" + itemName + "</option>");
      };
    });
  });
};

function makeItemSelects() {
  $(".itemSpot").append('<div class="row"></div>');
  for (let i = 0; i < 6; i++) {
    $(".itemSpot").children().append('<div class="itemSpotChild col"></div>');
    // i == 2 ? $(".itemSpot").children().append('<div class="w-100"></div>') : null;
  };
  $(".itemSpotChild").append('<select class="itemDrop"></select>');
};

function makeLvlSliders() {
  $(".lvlSlider").slider({
    max: 25,
    min: 1,
    value: 1
  });
};

function updateAttrs(id) {

}

function makeAttrs() {
  var html = `
  <div class="row">
    <div class="col">
      <p class="str">0</p>
    </div>
    <div class="col">
      str
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p class="agi">0</p>
    </div>
    <div class="col">
      agi
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p class="int">0</p>
    </div>
    <div class="col">
      int
    </div>
  </div>`;
  $("#yourAttrSpot").append(html);
  $("#theirAttrSpot").append(html);
}

$(document).ready( function() {
  makeLvlSliders();
  makeItemSelects();
  makeHeroOptions();
  makeItemOptions();
  $(".itemDrop").selectmenu();
  $(".heroSelect").selectmenu();
  makeAttrs();
  $("#yourLevelSlider").on("slide", function(event, ui) {
    var hero = $()
    $("#yourLevel").text(ui.value);
    updateAttrs("#");
  });
  $("#theirLevelSlider").on("slide", function(event, ui) {
    $("#theirLevel").text(ui.value);
    updateAttrs();
  });


});
