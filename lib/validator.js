'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
    function Validator() {
        _classCallCheck(this, Validator);
    }

    _createClass(Validator, [{
        key: 'validate',
        value: function validate(data) {
            var response = {
                'valid': false,
                'type': '',
                'message': 'Not valid data.'
            };

            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && 'type' in data) {
                switch (data.type) {
                    case 'call':
                    case 'incoming_call_accepted':
                    case 'number':
                    case 'offer':
                    case 'answer':
                    case 'candidate':
                        response.type = 'number';
                        if ('number' in data) {
                            if (data.number.length > 2) {
                                response.valid = true;
                                response.message = 'OK';
                            } else {
                                response.message = 'Length of the number is less then 3 characters.';
                            }
                        } else {
                            response.message = 'Number not found in data.';
                        }
                        break;
                }
            }

            return response;
        }
    }, {
        key: 'sendMessage',
        value: function sendMessage(socket, code) {
            var type = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

            var message = {
                'valid': false,
                'message': '',
                'type': type
            };

            switch (code) {
                case 'USER_WITH_SAME_NUMBER':
                    message.message = 'There is user with the same number.';
                    break;
                case 'NEW_USER_ADDED':
                    message.valid = true;
                    message.message = 'You have been logged in to the server.';
                    break;
                case 'USER_EDITED_NUMBER':
                    message.valid = true;
                    message.message = 'Your number was edited.';
                    break;
                case 'COULD_NOT_FIND_USER':
                    message.valid = false;
                    message.message = 'Cannot find user.';
                    break;
            }

            socket.emit('message', message);
        }
    }]);

    return Validator;
}();

exports.default = Validator;