import SIO from 'socket.io';
import Validator from './validator';
import User from './user';
import Book from './book';
import nConf from 'nconf';
import path from 'path';

let configPath = path.join(__dirname, '../config/config.json');
nConf.argv().env().file({
    file: configPath
});

//const app = express();
const SocketService = SIO(nConf.get('port'));
const validator = new Validator();
const book = new Book();

global.book = book;
global.validator = validator;

console.log('DialIn Server is listening on port ' + nConf.get('port') + '.');

SocketService.on('connection', function(socket) {
    socket.on('message', function(data) {
        let socktID = socket.id;
        let resultOfValidator = validator.validate(data);
        if (resultOfValidator.valid === true) {
            switch (data.type) {
                case 'number':
                    book.getUserBySocketId(socket.id)
                        .then(function(UserRes) {
                            if (UserRes === false) {
                                let user = new User();
                                user.setNumber(data.number);
                                user.setSocket(socket);
                                book.addUser(user)
                                    .then(function(addUserResult) {
                                        if (addUserResult === true) {
                                            console.log('Adding new user.' + 'SID: ' + socket.id + ',' + 'NUMBER:' + data.number);
                                            validator.sendMessage(socket, 'NEW_USER_ADDED', 'number');
                                        } else {
                                            console.log('Adding user failed.' + 'SID: ' + socket.id + ',' + 'NUMBER:' + data.number);
                                            validator.sendMessage(socket, 'USER_WITH_SAME_NUMBER', 'number');
                                        }
                                    });
                            } else {
                                book.getUserByNumber(data.number).then(function(User) {
                                    if (User === false) {
                                        book.editUserNumber({
                                            'socket': socket,
                                            'number': data.number
                                        }).then(function(result) {
                                            if (result === true) {
                                                console.log('User edited.' + 'SID: ' + socket.id + ',' + 'NUMBER:' + data.number);
                                                validator.sendMessage(socket, 'USER_EDITED_NUMBER', 'number');
                                            } else {
                                                console.log('No user!');
                                                validator.sendMessage(socket, 'COULD_NOT_FIND_USER', 'number');
                                            }
                                        });
                                    } else {
                                        if (socket.id !== User.socket.id) {
                                            console.log('Same number user.');
                                            validator.sendMessage(socket, 'USER_WITH_SAME_NUMBER', 'number');
                                        } else {
                                            console.log('User edited number! (not really)');
                                            validator.sendMessage(socket, 'USER_EDITED_NUMBER', 'number');
                                        }
                                    }
                                });
                            }
                        });
                    break;
                case 'incoming_call_accepted':
                case 'call':
                    book.getUserBySocketId(socket.id)
                        .then(function(Caller) {
                            if (Caller !== false) {
                                book.getUserByNumber(data.number)
                                    .then(function(User) {

                                        if (User !== false) {
                                            let type = 'call';
                                            if (data.type == 'call') {
                                                type = 'incoming_call';
                                            }

                                            if (data.type == 'incoming_call_accepted') {
                                                type = 'incoming_call_accepted_fw';
                                            }
                                            User.socket.emit('message', {
                                                'valid': true,
                                                'type': type,
                                                'number': Caller.number
                                            });
                                        } else {
                                            validator.sendMessage(socket, 'COULD_NOT_FIND_USER', 'number');
                                        }
                                    });
                            } else {
                                validator.sendMessage(socket, 'COULD_NOT_FIND_USER', 'number');
                            }
                        }.bind(this));

                    break;

                case 'offer':
                case 'answer':
                case 'candidate':
                    book.getUserBySocketId(socket.id)
                        .then(function(Caller) {
                            if (Caller !== false) {
                                book.getUserByNumber(data.number)
                                    .then(function(User) {
                                        if (User !== false) {
                                            User.socket.emit('message', {
                                                'valid': true,
                                                'type': data.type,
                                                'number': Caller.number,
                                                'message': data.message
                                            });
                                        } else {
                                            validator.sendMessage(socket, 'COULD_NOT_FIND_USER', 'number');
                                        }
                                    });
                            } else {
                                validator.sendMessage(socket, 'COULD_NOT_FIND_USER', 'number');
                            }
                        }.bind(this));

                    break;

            }
        } else {
            console.log('Refused thing!');
            socket.emit('message', resultOfValidator);
        }
    });

    socket.on('disconnect', function() {
        book.removeUserBySocketID(socket.id).then(function() {
            console.log('User removed.' + 'SID: ' + socket.id);
            //Break any call i had
        })
    });
});

//For debugging
// app.get('/', function (req, res) {
//   res.send('' + book.users.length);
//   console.log(book.users);
// });
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
