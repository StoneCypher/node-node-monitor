'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var cpu = function cpu() {
	return new Promise(function (resolve, reject) {
		return resolve({ which: 'cpu', pass: true, data: 'cpu auto-pass' });
	});
};
var ram = function ram() {
	return new Promise(function (resolve, reject) {
		return resolve({ which: 'ram', pass: true, data: 'ram auto-pass' });
	});
};

var metricsLookup = { cpu: cpu, ram: ram },
    allMetrics = Object.keys(metricsLookup),
    defaultMetrics = allMetrics;

var getMetrics = function getMetrics() {
	var whichMetrics = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMetrics;
	return whichMetrics.map(function (key) {
		return metricsLookup[key];
	});
};
var runMetrics = function runMetrics() {
	var whichMetrics = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMetrics;
	return whichMetrics.map(function (key) {
		return metricsLookup[key]();
	});
};

exports.ram = ram;
exports.cpu = cpu;
exports.metricsLookup = metricsLookup;
exports.getMetrics = getMetrics;
exports.runMetrics = runMetrics;
exports.allMetrics = allMetrics;
exports.defaultMetrics = defaultMetrics;