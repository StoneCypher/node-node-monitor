'use strict';

var _nnm = require('./nnm.js');

var nnm = _interopRequireWildcard(_nnm);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

nnm.lib.monitorTick().then(function (res) {
       return console.log('Result:\n------\n\n' + JSON.stringify(res, undefined, 4));
});