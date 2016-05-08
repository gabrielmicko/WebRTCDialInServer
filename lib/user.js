class User {
  constructor() {
    this.socket = false;
    this.number = 0;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setNumber(number) {
    this.number = number;
  }

  sameSocket(socket) {
      if(socket.id === this.socket.id) {
        return true;
      }
      return false;
  }

  getNumber() {
    return this.number;
  }

}

export default User;
