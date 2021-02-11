"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Adapter = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Adapter = /*#__PURE__*/function () {
  function Adapter(items = []) {
    _classCallCheck(this, Adapter);
  }

  _createClass(Adapter, [{
    key: "getItems",
    value: function getItems() {
      return this.items;
    }
  }, {
    key: "addItem",
    value: function addItem(item) {
      this.items.unshift(item);
    }
  }]);

  return Adapter;
}();

exports.Adapter = Adapter;