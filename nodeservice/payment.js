const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());

// Log service start
fs.appendFileSync('service-log.txt', `[${new Date()}] Service starting...\n`);

app.get('/ping', (req, res) => {
  res.send('Agent is running');
});

/*
app.get('/start-payment', (req, res) => {
  console.log('Received payment trigger from browser.');
  exec('notepad.exe', (err) => {
    if (err) {
      console.error('Error launching exe:', err);
      fs.appendFileSync('service-log.txt', `[${new Date()}] Error launching exe: ${err.message}\n`);
      return res.status(500).send('Failed to start payment process');
    }
    res.send('Payment process started (Notepad launched)');
  });
});*/

app.get('/start-payment', (req, res) => {
  console.log('Received payment trigger from browser.');
  const cmd = 'notepad.exe'; // or some dummy EXE
  exec(cmd, (err) => {
    if (err) {
      const message = `Error launching ${cmd}: ${err.message}`;
      console.error(message);
      fs.appendFileSync('service-log.txt', `[${new Date()}] ${message}\n`);
      return res.status(500).send('Failed to start payment process');
    }
    fs.appendFileSync('service-log.txt', `[${new Date()}] Launched: ${cmd}\n`);
    res.send('Payment process started');
  });
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Payment agent running at http://localhost:${PORT}`);
  fs.appendFileSync('service-log.txt', `[${new Date()}] Listening on port ${PORT}\n`);
});

// ✅ Global error handlers
process.on('uncaughtException', (err) => {
  const message = `[${new Date()}] Uncaught Exception: ${err.stack || err.message}\n`;
  fs.appendFileSync('service-log.txt', message);
});

process.on('unhandledRejection', (reason, promise) => {
  const message = `[${new Date()}] Unhandled Rejection: ${reason}\n`;
  fs.appendFileSync('service-log.txt', message);
});
