'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.seq = exports.boundedAll = exports.monitorTick = undefined;

var _metrics = require('./metrics.js');

var seq = function seq(to) {
    return new Array(to).fill(false).map(function (_, i) {
        return i;
    });
};

var boundedAll = function boundedAll(promiseArray) {

    var started_at = new Date().getTime();

    return Promise.all(promiseArray).then(function (results) {

        var ended_at = new Date().getTime();
        return { start: started_at, end: ended_at, time: ended_at - started_at, results: results };
    });
};

var monitorTick = function monitorTick() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$promises = _ref.promises,
        promises = _ref$promises === undefined ? (0, _metrics.runMetrics)() : _ref$promises;

    return boundedAll(promises);
};

exports.monitorTick = monitorTick;
exports.boundedAll = boundedAll;
exports.seq = seq;