var HEROJSONURL = "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_heroes.json";
var ITEMJSONURL = "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/items.json";

function makeSkeleton() {
	$("#main").append(
		`<div class="container-fluid">
			<span class="row">
				<div id="heroTotal" class="col">
					<h2>Total Heroes</h2>
				</div>
				<div class="col"></div>
			</span>
		</div>`
	);
};

function doFancyStats() {
	$('#heroTotal').append(
		`<h3>${calc_hero_total()}</h3>`
	);
};

$.when(find_JSON(HEROJSONURL), find_JSON(ITEMJSONURL)).done(function(h,i) {
	HEROES = JSON.parse(h[0]);
	ITEMS = JSON.parse(i[0]);
	makeSkeleton();
	doFancyStats();
});
