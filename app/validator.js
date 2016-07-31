class Validator {

    validate(data) {
        let response = {
            'valid': false,
            'type': '',
            'message': 'Not valid data.',
        };

        if (typeof data === 'object' && 'type' in data) {
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

    sendMessage(socket, code, type = '') {
        let message = {
            'valid': false,
            'message': '',
            'type': type
        }

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

}

export default Validator;
