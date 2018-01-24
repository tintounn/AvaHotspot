const Socket = require('socket.io-client');
const VlcPlayer = require('./lib/vlc.lib');

class AvaHotSpot {
  constructor() {
    this.say = this.say.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.disconnect = this.disconnect.bind(this);

    console.log('Starting hotspot...');
    this.startApp();
  }

  async startApp() {
    try {
      await this.initConfig();
      await this.findCore();
      await this.connect();
      await this.setupHandlers();

      this.player = new VlcPlayer(false);
      this.play("http://cdn.nrjaudio.fm/adwz1/fr/30043/mp3_128.mp3?origine=fluxradios");

      console.log('Hotspot started !');
    } catch(err) {
      console.log(err);
    }
  }

  initConfig() {

  }

  findCore() {
    return Promise.resolve();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.socket = Socket('http://127.0.0.1:8002/', {
        reconnection: false
      });
      this.socket.on('connect', () => resolve());
      this.socket.on('connect_timeout', () => reject());
    });
  }

  setupHandlers() {
    this.socket.on('play', this.play);
    this.socket.on('say', this.say);
    this.socket.on('stop', this.stop);
    this.socket.on('disconnect', this.disconnect);
  }

  disconnect() {
    this.player.stop();
    console.log('Socket disconnected');
  }

  say(msg) {
    console.log(msg);
  }

  play(url) {
    this.player.play(url);
  }

  stop() {
    this.player.stop();
  }
}

let avaHotSpot = new AvaHotSpot();