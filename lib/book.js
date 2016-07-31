'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = function () {
    function Book() {
        _classCallCheck(this, Book);

        this.tasks = [];
        this.users = [];

        this.solveTasks();
    }

    _createClass(Book, [{
        key: 'addTask',
        value: function addTask(type, mixed, resolvePromise) {
            this.tasks.push({
                'type': type,
                'param': mixed,
                'resolvePromise': resolvePromise
            });
            this.solveTasks();
        }
    }, {
        key: 'solveTasks',
        value: function solveTasks() {
            if (this.tasks.length > 0) {
                var task = this.tasks.shift();
                switch (task.type) {
                    case 'isUser':
                        task.resolvePromise(this.isUserTask(task.param));
                        break;

                    case 'addUser':
                        task.resolvePromise(this.addUserTask(task.param));
                        break;

                    case 'removeUserBySocketID':
                        task.resolvePromise(this.removeUserBySocketIDTask(task.param));
                        break;

                    case 'getUserByNumber':
                        task.resolvePromise(this.getUserByNumberTask(task.param));
                        break;

                    case 'getUserBySocketId':
                        task.resolvePromise(this.getUserBySocketIdTask(task.param));
                        break;

                    case 'editUserNumber':
                        task.resolvePromise(this.editUserNumberTask(task.param));
                        break;
                }
            }
            if (this.tasks.length > 0) {
                this.solveTasks();
            }
        }
    }, {
        key: 'isUser',
        value: function isUser(User) {
            return new Promise(function (resolve, reject) {
                this.addTask('isUser', User, resolve);
            }.bind(this));
        }
    }, {
        key: 'isUserTask',
        value: function isUserTask(User) {
            var result = false;
            this.users.forEach(function (user) {
                if (User.number === user.number && User.socket.id == user.socket.id) {
                    result = true;
                }
            });

            return result;
        }
    }, {
        key: 'addUser',
        value: function addUser(User) {
            return new Promise(function (resolve, reject) {
                this.addTask('addUser', User, resolve);
            }.bind(this));
        }
    }, {
        key: 'addUserTask',
        value: function addUserTask(User) {
            if (this.getUserByNumberTask(User.number) === false) {
                this.users.push(User);
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'editUserNumber',
        value: function editUserNumber(User) {
            return new Promise(function (resolve, reject) {
                this.addTask('editUserNumber', User, resolve);
            }.bind(this));
        }
    }, {
        key: 'editUserNumberTask',
        value: function editUserNumberTask(User) {
            var updateDone = false;
            this.users.forEach(function (user, key) {
                if (User.socket.id === user.socket.id) {
                    this.users[key].number = User.number;
                    updateDone = true;
                }
            }.bind(this));

            return updateDone;
        }
    }, {
        key: 'removeUserBySocketID',
        value: function removeUserBySocketID(socketID) {
            return new Promise(function (resolve, reject) {
                this.addTask('removeUserBySocketID', socketID, resolve);
            }.bind(this));
        }
    }, {
        key: 'removeUserBySocketIDTask',
        value: function removeUserBySocketIDTask(socketID) {
            var userKey = false;
            this.users.forEach(function (user, key) {
                if (socketID === user.socket.id) {
                    userKey = key;
                }
            });

            if (userKey !== false) {
                this.users.splice(userKey, 1);

                return true;
            }

            return false;
        }
    }, {
        key: 'getUserByNumber',
        value: function getUserByNumber(number) {
            return new Promise(function (resolve, reject) {
                this.addTask('getUserByNumber', number, resolve);
            }.bind(this));
        }
    }, {
        key: 'getUserByNumberTask',
        value: function getUserByNumberTask(number) {
            var result = false;
            this.users.forEach(function (user) {
                if (user.number === number) {
                    result = user;
                }
            });
            return result;
        }
    }, {
        key: 'getUserBySocketId',
        value: function getUserBySocketId(socktID) {
            return new Promise(function (resolve, reject) {
                this.addTask('getUserBySocketId', socktID, resolve);
            }.bind(this));
        }
    }, {
        key: 'getUserBySocketIdTask',
        value: function getUserBySocketIdTask(socketID) {
            var result = false;
            this.users.forEach(function (user) {
                if (user.socket.id === socketID) {
                    result = user;
                }
            });
            return result;
        }
    }]);

    return Book;
}();

exports.default = Book;