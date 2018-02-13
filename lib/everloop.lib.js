const zmq = require('zmq');
const matrix = require('matrix-protos').matrix_io;

class Everloop {
  constructor(verbose) {
    this.verbose = verbose;

    this.creatorIp = '127.0.0.1';
    this.createEverloopPort = 20013 + 8;

    this.initSockets();
  }

  initSockets() {
    this.errSocket = zmq.socket('sub');
    this.errSocket.connect('tcp://' + this.creatorIp + ':' + (this.createEverloopPort + 2));
    this.errSocket.subscribe('');
    this.errSocket.on('message', (err) => {
      console.error(err);
    });

    this.dataSocket = zmq.socket('push');
    this.dataSocket.connect('tcp://' + this.creatorIp + ':' + (this.createEverloopPort));

    console.log('Socket initiated');
  }

  setColor(color) {
    color.white = 255;

    let image = matrix.malos.v1.io.EverloopImage.create();
    for(let i = 0; i < 35; i++) {
      let ledConf = matrix.malos.v1.io.LedValue.create(color);
      image.led.push(ledConf);
    }

    let config = matrix.malos.v1.driver.DriverConfig.create({image: image});
    this.dataSocket.send(matrix.malos.v1.driver.DriverConfig.encode(config).finish());
  }
}

module.exports = Everloop;