class Book {

    constructor() {
        this.tasks = [];
        this.users = [];

        this.solveTasks();
    }

    addTask(type, mixed, resolvePromise) {
        this.tasks.push({
            'type': type,
            'param': mixed,
            'resolvePromise': resolvePromise,
        });
        this.solveTasks();
    }

    solveTasks() {
        if (this.tasks.length > 0) {
            let task = this.tasks.shift();
            switch (task.type) {
                case 'isUser':
                    task.resolvePromise(this.isUserTask(task.param))
                    break;

                case 'addUser':
                    task.resolvePromise(this.addUserTask(task.param))
                    break;

                case 'removeUserBySocketID':
                    task.resolvePromise(this.removeUserBySocketIDTask(task.param))
                    break;

                case 'getUserByNumber':
                    task.resolvePromise(this.getUserByNumberTask(task.param))
                    break;

                case 'getUserBySocketId':
                    task.resolvePromise(this.getUserBySocketIdTask(task.param))
                    break;

                case 'editUserNumber':
                    task.resolvePromise(this.editUserNumberTask(task.param))
                    break;
            }
        }
        if (this.tasks.length > 0) {
            this.solveTasks();
        }
    }

    isUser(User) {
        return new Promise(function(resolve, reject) {
            this.addTask('isUser', User, resolve);
        }.bind(this));
    }

    isUserTask(User) {
        let result = false;
        this.users.forEach(function(user) {
            if (User.number === user.number && User.socket.id == user.socket.id) {
                result = true;
            }
        });

        return result;
    }


    addUser(User) {
        return new Promise(function(resolve, reject) {
            this.addTask('addUser', User, resolve);
        }.bind(this));
    }

    addUserTask(User) {
        if (this.getUserByNumberTask(User.number) === false) {
            this.users.push(User);
            return true;
        } else {
            return false;
        }
    }

    editUserNumber(User) {
        return new Promise(function(resolve, reject) {
            this.addTask('editUserNumber', User, resolve);
        }.bind(this));
    }

    editUserNumberTask(User) {
        var updateDone = false;
        this.users.forEach(function(user, key) {
            if (User.socket.id === user.socket.id) {
                this.users[key].number = User.number;
                updateDone = true;
            }
        }.bind(this));

        return updateDone;
    }


    removeUserBySocketID(socketID) {
        return new Promise(function(resolve, reject) {
            this.addTask('removeUserBySocketID', socketID, resolve);
        }.bind(this));
    }

    removeUserBySocketIDTask(socketID) {
        let userKey = false;
        this.users.forEach(function(user, key) {
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


    getUserByNumber(number) {
        return new Promise(function(resolve, reject) {
            this.addTask('getUserByNumber', number, resolve);
        }.bind(this));
    }

    getUserByNumberTask(number) {
        let result = false;
        this.users.forEach(function(user) {
            if (user.number === number) {
                result = user;
            }
        });
        return result;
    }

    getUserBySocketId(socktID) {
        return new Promise(function(resolve, reject) {
            this.addTask('getUserBySocketId', socktID, resolve);
        }.bind(this));
    }

    getUserBySocketIdTask(socketID) {
        let result = false;
        this.users.forEach(function(user) {
            if (user.socket.id === socketID) {
                result = user;
            }
        });
        return result;
    }

}

export default Book;
