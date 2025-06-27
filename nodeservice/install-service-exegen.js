const { Service } = require('node-windows');
const path = require('path');

const svc = new Service({
  name: 'PaymentAgentService',
  description: 'Launches local .exe when triggered by web app',
  script: path.join(__dirname, 'payment-agent.js')
});

svc.on('install', () => {
  console.log('Service installed');
  svc.start();
});

svc.install();
