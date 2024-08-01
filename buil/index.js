"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.listen(3000);
console.log('Server listen on port', 3000);