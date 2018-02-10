var HEROJSONURL = "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_heroes.json";
var ITEMJSONURL = "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/items.json";

function makeSkeleton() {
	$("#main").append(
		`<div class="container-fluid">
			<span class="row">
				<div id="heroTotal" class="col-4">
					<h2>Total Heroes</h2>
				</div>
				<div class="col-8">
					<span class="row">
						<div id="itemTotal" class="col-4">
							<h2>Total Items</h2>
						</div>
						<div id="consuTotal" class="col-4">
							<h2>Total Consumables</h2>
						</div>
					</span>
				</div>
			</span>
		</div>`
	);
};

function doFancyStats() {
	$('#heroTotal').append(`<h3>${calc_hero_total()}</h3>`);
	let item_totals = calc_item_totals();
	$('#itemTotal').append(`<h3>${item_totals[0]}</h3>`);
	$('#consuTotal').append(`<h3>${item_totals[1]}</h3>`);
};

$.when(find_JSON(HEROJSONURL), find_JSON(ITEMJSONURL)).done(function(h,i) {
	HEROES = JSON.parse(h[0]);
	ITEMS = JSON.parse(i[0]);
	makeSkeleton();
	FIX_QUIRKS();
	doFancyStats();
});
