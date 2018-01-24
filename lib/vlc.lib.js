const { spawn } = require('child_process');

class VlcPlayer {
  constructor(verbose) {
    this.verbose = verbose;
  }

  play(url) {
    this.stop();

    this.process = spawn('cvlc', ['--vout', 'none', url]);
    this.process.on('error', (err) => {
      console.log(err);
    });
  }

  pause() {

  }

  stop() {
    if(this.process) {
      this.process.kill();
    }
  }
}

module.exports = VlcPlayer;