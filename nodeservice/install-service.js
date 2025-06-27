const { Service } = require('node-windows');
const path = require('path');

const svc = new Service({
  name: 'PaymentAgent',
  description: 'Runs the payment agent in background',
  script: path.join(__dirname, 'payment-agent.exe'),
  nodeOptions: [],
  wait: 2,
  grow: .5
});

svc.on('install', () => {
  console.log('Service installed and starting...');
  svc.start();
});

svc.install();
