const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Ensure log file is in a writable real path (outside pkg VFS)
const logFilePath = path.join(process.cwd(), 'service-log.txt');

app.get('/ping', (req, res) => {
  res.send('Agent is running');
});

app.get('/start-payment', (req, res) => {
  console.log('Payment API hit');

  const exePath = 'C:\\Windows\\System32\\notepad.exe'; // Or your actual exe
  const cmd = `cmd.exe /c start "" "${exePath}"`;

  exec(cmd, (err) => {
    if (err) {
      const message = `Error launching ${exePath}: ${err.message}`;
      console.error(message);
      fs.appendFileSync(logFilePath, `[${new Date()}] ${message}\n`);
      return res.status(500).send('Failed to start payment process');
    }

    fs.appendFileSync(logFilePath, `[${new Date()}] Launched: ${exePath}\n`);
    res.send('Payment process started');
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Payment API running on port ${PORT}`);
});
