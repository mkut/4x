new function() {
	function RegionThor() {
		this.name = "Thor";
		this.defence = new $Region.UpgradableValue("Base").freeze();
		this.power = new $Region.UpgradableValue(new $Region.Power(2, 0))
			.push(new $Region.Power(3, 0))
			.push(new $Region.Power(4, 0))
			.freeze();
		this.conquered = true;
		this.linked = new Array();
	};
	RegionThor.prototype = $Region.RegionProto;
	function RegionNjord() {
		this.name = "Njord";
		this.defence = new $Region.UpgradableValue(new $Region.Defence(4)).freeze();
		this.power = new $Region.UpgradableValue("Clear").freeze();
		this.conquered = false;
		this.linked = new Array();
	};
	RegionNjord.prototype = $Region.RegionProto;

	function Level() {
		this.maxTurn = 3;
		this.regions = [
			new RegionThor(),
			new RegionNjord(),
		];
		this.regions[0].linked.push(this.regions[1]);
		this.regions[1].linked.push(this.regions[0]);
		this.cleared = function() {
			return this.regions[1].conquered;
		};
		this.researchList = [];
	}
	Level.prototype = $Level.LevelProto;

	$Level.levels.push(Level);
};
