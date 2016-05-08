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
    })
  }

  solveTasks() {
    setInterval(function() {
      if(this.tasks.length > 0) {
        let task = this.tasks.shift();

        switch(task.type) {
          case 'isUser':
            task.resolvePromise(this.isUserTask(task.param))
          break;

          case 'addUser':
            task.resolvePromise(this.addUserTask(task.param))
          break;

          case 'removeUser':
            task.resolvePromise(this.removeUserTask(task.param))
          break;

          case 'getUserByNumber':
            task.resolvePromise(this.getUserByNumberTask(task.param))
          break;

          case 'getUserBySocketId':
            task.resolvePromise(this.getUserBySocketId(task.param))
          break;
        }
      }
    }.bind(this), 100);
  }

  isUser(User) {
    return new Promise(function(resolve, reject) {
      this.addJob('isUser', User, resolve);
    }.bind(this));
  }

  isUserTask(User) {
    let result = false;
    this.users.forEach(function(user) {
      if(User.number === user.number && User.socket.id == user.socket.id ) {
        result = true;
      }
    });

    return result;
  }


  addUser() {
    return new Promise(function(resolve, reject) {
      this.addJob('addUser', User, resolve);
    }.bind(this));
  }

  addUserTask(User) {
    if(this.isUserTask(User) === false) {
      this.users.push(User);
      return true;
    }
    else {
      return false;
    }
  }


  removeUser(User) {
    return new Promise(function(resolve, reject) {
      this.addJob('removeUser', User, resolve);
    }.bind(this));
  }

  removeUserTask(User) {
    let userKey = false;
    this.users.forEach(function(user, key)) {
      if(User.number == user.number) {
        userKey = key;
      }
    });

    if(userKey !== false) {
      this.users.splice(userKey, 1);
    }

    return false;
  }


  getUserByNumber(number) {
    return new Promise(function(resolve, reject) {
      this.addJob('getUserByNumber', number, resolve);
    }.bind(this));
  }

  getUserByNumberTask(number) {
    let result = false;
    this.users.forEach(function(user){
      if(user.number === number) {
        return user;
      }
    });
    return result;
  }

  getUserBySocketId(socktID) {
    return new Promise(function(resolve, reject) {
      this.addJob('getUserBySocketId', socktID, resolve);
    }.bind(this));
  }

  getUserBySocketIdTask(socktID) {
    let result = false;
    this.users.forEach(function(user){
      if(user.socket.id === socktID) {
        return user;
      }
    });
    return result;
  }
}

export default Book;
