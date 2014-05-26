var $Game = {
	level: 0,
	reset: function() {
		if (this.gameState != undefined && this.gameState.cleared()) {
			if (this.level == $Level.levels.length - 1) {
				console.log("ALL CLEAR!!");
			} else {
				this.level += 1;
			}
		}
		this.gameState = new $Level.levels[this.level]();
	},
};

var $UI = {
	refresh: function() {
		var gs = $Game.gameState;
		var infoBlock = $("#info-block").empty();
		$("<div/>")
			.addClass("turn-text")
			.text("Turn: ")
			.appendTo(infoBlock);
		for (var i = 0; i < gs.spentTurn; i++) {
			$("<div/>")
				.addClass("turn-marker-on")
				.appendTo(infoBlock);
		}
		for (var i = 0; i < gs.maxTurn - gs.spentTurn; i++) {
			$("<div/>")
				.addClass("turn-marker-off")
				.appendTo(infoBlock);
		}
		$("<div/>")
			.addClass("info-research-text")
			.text("Research: ")
			.appendTo(infoBlock);

		var mapBlock = $("#map-block").empty();
		var regions = gs.regions;
		for (var i = 0 ; i < regions.length; i++) {
			var region = $("<div/>")
				.addClass("region")
				.addClass(regions[i].conquered ? "region-conquered" : "")
				.appendTo(mapBlock);
			$("<div/>")
				.addClass("region-name")
				.text(regions[i].name)
				.appendTo(region);
			var regionDefence = $("<div/>")
				.addClass("region-defence-container")
				.appendTo(region);
			for (var lv = 1; lv <= regions[i].defence.maxLevel(); lv++) {
				var tmp = $("<div/>")
					.addClass("region-defence")
					.addClass(regions[i].defence.level >= lv ? "region-defence-upgraded" : "")
					.addClass(regions[i].defence.level == lv && !regions[i].conquered ? "region-defence-current" : "")
					.appendTo(regionDefence);
				var def = regions[i].defence.getValue(lv);
				if (def.text != undefined) {
					tmp.append($("<div/>").addClass("region-defence-text").text(def.text));
				} else {
					tmp.append($("<div/>").addClass("region-shield").text("Shield " + def.shield));
				}
			}
			var regionPower = $("<div/>")
				.addClass("region-power-container")
				.appendTo(region);
			for (var lv = 1; lv <= regions[i].power.maxLevel(); lv++) {
				var tmp = $("<div/>")
					.addClass("region-power")
					.addClass(regions[i].power.level >= lv ? "region-power-upgraded" : "")
					.addClass(regions[i].power.level == lv ? "region-power-current" : "")
					.appendTo(regionPower);
				var pow = regions[i].power.getValue(lv);
				if (pow.text != undefined) {
					tmp.append($("<div/>").addClass("region-power-text").text(pow.text));
				} else {
					tmp
						.append($("<div/>").addClass("region-production").text(pow.production))
						.append($("<div/>").addClass("region-research").text(pow.research))
				}
			}
			region.click((function(gs, i) {
				return function() {
					if (gs.spentTurn >= gs.maxTurn) {
						return;
					}
					if (gs.regions[i].conquered) {
						gs.upgrade();
					} else if (gs.regions[i].conquerable(gs)) {
						gs.conquer(i);
					}
					$UI.refresh();
				};
			})(gs, i));
		}

		var researchBlock = $("#research-block").empty();
		for (var i = 0; i < gs.researchList.length; i++) {
			var res = gs.researchList[i];
			$("<div/>")
				.addClass("research")
				.addClass(res.researched ? "research-researched" : "")
				.addClass(res.researched && res.continuous ? "research-enabled" : "")
				.addClass(res.researched && !res.continuous ? "research-disabled" : "")
				.append($("<div/>").addClass("research-name").text(res.name))
				.append($("<div/>").addClass("research-cost").text("Cost " + res.cost))
				.append($("<div/>").addClass("research-text").text(res.text))
				.appendTo(researchBlock)
				.click((function(gs, i) {
					return function() {
						if (gs.researchList[i].researchable(gs)) {
							gs.research(i);
							$UI.refresh();
						}
					};
				})(gs, i));
		}
	},
};

$(document).ready(function(){
	$("#reset-button").click(function() {
		$Game.reset();
		$UI.refresh();
	});
	$Game.reset();
	$UI.refresh();
});
