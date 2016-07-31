"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
    function User() {
        _classCallCheck(this, User);

        this.socket = false;
        this.number = 0;
    }

    _createClass(User, [{
        key: "setSocket",
        value: function setSocket(socket) {
            this.socket = socket;
        }
    }, {
        key: "setNumber",
        value: function setNumber(number) {
            this.number = number;
        }
    }, {
        key: "sameSocket",
        value: function sameSocket(socket) {
            if (socket.id === this.socket.id) {
                return true;
            }
            return false;
        }
    }, {
        key: "getNumber",
        value: function getNumber() {
            return this.number;
        }
    }]);

    return User;
}();

exports.default = User;