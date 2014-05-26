new function() {
	String.prototype.replaceAll = function (org, dest) {
		return this.split(org).join(dest);
	};
};
