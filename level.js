new function() {
	var LevelProto = {
		spentTurn: 0,
		upgrade: function() {
			for (var i = 0; i < this.regions.length; i++) {
				var reg = this.regions[i];
				if (reg.conquered) {
					reg.power.upgrade();
				}
			}
			this.spentTurn += 1;
		},
		conquer: function(regionId) {
			this.regions[regionId].conquered = true;
			this.regions[regionId].powerLevel = 0;
			this.spentTurn += 1;
		},
		research: function(researchId) {
			this.researchList[researchId].researched = true;
			this.spentTurn += Math.ceil(this.researchList[researchId].cost / this.researchPower());
		},

		researched: function(name) {
			for (var i = 0; i < this.researchList.length; i++) {
				if (this.researchList[i].name == name) {
					return this.researchList[i].researched;
				}
			}
			return false;
		},
		researchPower: function() {
			var ret = 0;
			for (var i = 0; i < this.regions.length; i++) {
				if (this.regions[i].conquered) {
					ret += this.regions[i].power.currentValue().research;
				}
			}
			return ret;
		},
	};

	$Level = {
		LevelProto: LevelProto,
		levels: [],
	}
};
