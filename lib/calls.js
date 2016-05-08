import randomString from 'randomstring';

class Calls {

  constructor() {
    this.calls = [];
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


        }
      }
    }.bind(this), 100);
  }

  createCall(callerNumber, callingNumber) {
    let call = {
      'callerNumber': callerNumber,
      'callingNumber': callingNumber,
      'status': 'calling',
      'token': randomString.generate(15)
    }

    

  }

  createCallTask() {

  }


}
