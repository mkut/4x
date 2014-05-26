new function() {
	// Upgrade System
	var UpgradableValueProto = {
		maxLevel: function() {
			return this.data.length;
		},
		getValue: function(level) {
			return this.data[level - 1];
		},
		currentValue: function() {
			return this.getValue(this.level);
		},
		upgrade: function() {
			if (this.level < this.data.length) {
				this.level += 1;
			}
		},
	};
	function UpgradableValue(original) {
		this.data = new Array();
		this.level = 1;
		this.push = function(arg) {
			if (typeof arg == 'string' || arg instanceof String) {
				this.data.push({ text: arg });
			} else {
				this.data.push(arg);
			}
			return this;
		};
		this.freeze = function() {
			this.push = undefined;
			this.freeze = undefined;
			return this;
		};

		this.push(original);
		return this;
	};
	UpgradableValue.prototype = UpgradableValueProto;

	// Defence
	function Defence(shield) {
		this.shield = shield;
	};

	// Power
	function Power(production, research) {
		this.production = production;
		this.research = research;
	};

	// Region
	var RegionProto = {
		attackValue: function(level) {
			var ret = 0;
			for (var i = 0; i < this.linked.length; i++) {
				if (this.linked[i].conquered) {
					ret = Math.max(ret, this.linked[i].power.currentValue().production);
				}
			}
			if (level.researched('Laser')) { ret += 2; }
			return ret;
		},
		conquerable: function(level){
			if (this.conquered) { return false; }
			return this.attackValue(level) >= this.defence.currentValue().shield;
		},
	};

	// Publish
	$Region = {
		UpgradableValue: UpgradableValue,
		Power: Power,
		Defence: Defence,
		RegionProto: RegionProto,
	};
};
