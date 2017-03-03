'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NnmUI = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NnmUI = function NnmUI(props) {
    return _react2.default.createElement(
        'div',
        null,
        'React is running! ',
        props.pass
    );
};

exports.NnmUI = NnmUI;