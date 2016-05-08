class Validator {

  validate(data) {
    let response = {
      'valid': false,
      'message': 'Not valid data.',
    };

    if(typeof data === 'object' && 'type' in data) {
      switch(data.type) {
        case 'number':
          if('number' in data) {
            if(data.number.length > 2) {
              response.valid = true;
              response.message = 'OK';
            }
            else {
              response.message = 'Length of the number is less then 3 characters.';
            }
          }
          else {
            response.message = 'Number not found in data.';
          }
        break;
      }

    }

    return response;
  }

  sendMessage(socket, code) {
    let message = {
      'valid': false,
      'message': ''
    }

    switch(code) {
      case 'USER_WITH_SAME_NUMBER':
        message.message = 'There is user with the same number.';
      break;
      case 'NEW_USER_ADDED':
        message.valid = true;
        message.message = 'New user has been registered.';
      break;
    }

    socket.emit('message', message);


  }

}

export default Validator;
