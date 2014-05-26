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
	function RegionUllr() {
		this.name = "Ullr";
		this.defence = new $Region.UpgradableValue(new $Region.Defence(4)).freeze();
		this.power = new $Region.UpgradableValue(new $Region.Power(2, 0))
			.push(new $Region.Power(3, 1))
			.push(new $Region.Power(4, 2))
			.freeze();
		this.conquered = false;
		this.linked = new Array();
	};
	RegionUllr.prototype = $Region.RegionProto;
	function RegionSif() {
		this.name = "Sif";
		this.defence = new $Region.UpgradableValue(new $Region.Defence(6)).freeze();
		this.power = new $Region.UpgradableValue("Clear").freeze();
		this.conquered = false;
		this.linked = new Array();
	};
	RegionSif.prototype = $Region.RegionProto;

	function Level() {
		this.maxTurn = 7;
		this.regions = [
			new RegionThor(),
			new RegionUllr(),
			new RegionSif(),
		];
		this.regions[0].linked.push(this.regions[1]);
		this.regions[1].linked.push(this.regions[0]);
		this.regions[1].linked.push(this.regions[2]);
		this.regions[2].linked.push(this.regions[1]);
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

