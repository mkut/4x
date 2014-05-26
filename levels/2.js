new function() {
	function RegionThor() {
		this.name = "Thor";
		this.defence = new $Region.UpgradableValue("Base").freeze();
		this.power = new $Region.UpgradableValue(new $Region.Power(2, 0))
			.push(new $Region.Power(3, 1))
			.push(new $Region.Power(4, 2))
			.freeze();
		this.conquered = true;
		this.linked = new Array();
	};
	RegionThor.prototype = $Region.RegionProto;
	function RegionFreja() {
		this.name = "Freja";
		this.defence = new $Region.UpgradableValue(new $Region.Defence(6)).freeze();
		this.power = new $Region.UpgradableValue("Clear").freeze();
		this.conquered = false;
		this.linked = new Array();
	};
	RegionFreja.prototype = $Region.RegionProto;

	function Level() {
		this.maxTurn = 5;
		this.regions = [
			new RegionThor(),
			new RegionFreja(),
		];
		this.regions[0].linked.push(this.regions[1]);
		this.regions[1].linked.push(this.regions[0]);
		this.cleared = function() {
			return this.regions[1].conquered;
		};
		this.researchList = [
			{
				name: 'Laser',
				cost: 4,
				text: 'Attack +2',
				researched: false,
				continuous: true,
				researchable: function(level) {
					if (level.researchPower() == 0) { return false; }
					var reqTurn = Math.ceil(this.cost / level.researchPower());
					return level.maxTurn - level.spentTurn >= reqTurn;
				},
			},
		];
	}
	Level.prototype = $Level.LevelProto;

	$Level.levels.push(Level);
};

