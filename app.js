const Socket = require('socket.io-client');

class AvaHotSpot {
  constructor() {
    this.say = this.say.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);

    console.log('Starting hotspot...');
    this.startApp();
  }

  async startApp() {
    try {
      await this.findCore();
      await this.connect();
      await this.setupHandlers();

      console.log('Hotspot started !');
    } catch(err) {
      console.log(err);
    }
  }

  findCore() { }

  connect() {
    return new Promise((resolve, reject) => {
      this.socket = Socket('http://127.0.0.1:8002/', {
        reconnection: false
      });
      this.socket.on('connect', () => resolve());
    });
  }

  setupHandlers() {
    this.socket.on('play', this.play);
    this.socket.on('say', this.say);
    this.socket.on('stop', this.stop);
  }

  say(msg) {
    console.log(msg);
  }

  play(url) {

  }

  stop() {

  }
}

let avaHotSpot = new AvaHotSpot();