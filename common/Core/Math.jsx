/** @return {number} */
Math.degToRad = function(n) {
	return parseFloat(n) * Math.PI / 180;
};

/** @return {number} */
Math.radToDeg = function(n) {
	return parseFloat(n) * 180 / Math.PI;
};

/** @return {number} */
Math.clamp = function(n, a, b) {
	if(a > b) {
		[a,b] = [b,a];
	}

	return Math.max(a, Math.min(n, b));
};

/** @return {number} */
Math.clamp01 = function(n) {
	return Math.clamp(n, 0, 1)
};

/** @return {number} */
Math.lerp = function(value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};

/** @return {number} */
Math.smoothDamp = function(current, target, out, smoothTime, maxSpeed = Infinity, deltaTime = Time.deltaTime) {
	// For some reason this implementation of smoothDamp calculates time incorrectly.
	// 0.4x multiplier solves the problem.
	smoothTime *= 0.4;

	out.velocity = out.velocity || 0;
	smoothTime = Math.max(0.0001, smoothTime);

	let num = 2 / smoothTime;
	let num2 = num * deltaTime;
	let num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
	let num4 = current - target;
	let num5 = target;
	let num6 = maxSpeed * smoothTime;

	num4 = Math.clamp(num4, -num6, num6);
	target = current - num4;

	let num7 = (out.velocity + num * num4) * deltaTime;
	out.velocity = (out.velocity - num * num7) * num3;
	let num8 = target + (num4 + num7) * num3;

	if(num5 - current > 0 == num8 > num5) {
		num8 = num5;
		out.velocity = (num8 - num5) / deltaTime;
	}
	return num8;
};

const precalculatedPrecisions = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10];

Math.roundTo = function round(num, _prec = 0) {
	const _precision = precalculatedPrecisions[_prec] || (10 * Math.pow(10, _prec));
	return Math.round(num * _precision + 1e-14) / _precision;
};
