import SIO from 'socket.io';
import Validator from './lib/validator';
import User from './lib/user';


const SocketService = SIO(8888);
const validator = new Validator();
const book = new Book();

global.book = book;
global.validator = validator;

console.log('DialIn Server is listening on port 8888.');

SocketService.on('connection', function(socket) {


  socket.on('message', function(data) {
      let socktID = socket.id;
      let resultOfValidator = validator.validate(data);

      if(resultOfValidator.valid === true) {
        switch(data.type) {

          case 'number':
            let userPromise = book.getUserByNumber(data.number);
            userPromise.then(function(result) {
              if((result instanceof User) === false) {
                let user = new User();
                user.setNumber(data.number);
                user.setSocket(data.socket);
                book.addUser(user).then(function(result) {
                  if(result === true) {
                    validator.sendMessage(socket, 'NEW_USER_ADDED');
                  }
                  else {
                      validator.sendMessage(socket, 'USER_WITH_SAME_NUMBER');
                  }
                });
              }
              else {
                  validator.sendMessage(socket, 'USER_WITH_SAME_NUMBER');
              }
            });
          break;




        }
      }
      else {
        socket.emit('message', resultOfValidator);
      }
  });

    socket.on('disconnect', function() {

    });
});
