import "common/Core/Math";

global.compare = function(a, b) {
	if(a == b) {
		return 0;
	}

	return (a > b) ? 1 : -1;
};

global.compareProp = function(fn) {
	if(valueType(fn) == String) {
		fn = (k => x => x[k])(fn);
	}

	return (a,b) => compare(fn(a), fn(b));
};