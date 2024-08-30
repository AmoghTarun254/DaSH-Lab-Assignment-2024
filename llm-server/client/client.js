// client.js

const WebSocket = require('ws');
const readline = require('readline');
const fs = require('fs');

// Create a WebSocket connection to the server
const ws = new WebSocket('ws://localhost:3000');

// Set up readline interface for dynamic input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Handle WebSocket open event
ws.on('open', () => {
  console.log('Connected to the server.');

  // Prompt the user for input
  promptUserForInput();
});

// Function to prompt the user for input
function promptUserForInput() {
  rl.question('Enter your prompt: ', (input) => {
    if (input.trim().toLowerCase() === 'exit') {
      console.log('Exiting...');
      rl.close();
      ws.close();
      return;
    }

    // Send user input as prompt to the server
    ws.send(JSON.stringify({ prompt: input }));
  });
}

// Handle incoming messages from the server
ws.on('message', (data) => {
  const response = JSON.parse(data);

  if (response.error) {
    console.error('Error from server:', response.error);
  } else {
    console.log('Response from server:', response); //modified to print only the body of a message
  

    // Save the response to a JSON file with a timestamp
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `response-${timestamp}.json`;

    fs.writeFile(filename, JSON.stringify(response, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log(`Response saved to ${filename}`);
      }
    });
  }

  // Prompt the user again for input after receiving a response
  promptUserForInput();
});

// Handle WebSocket close event
ws.on('close', () => {
  console.log('Disconnected from the server.');
  rl.close();
});

// Handle WebSocket error event
ws.on('error', (error) => {
  console.error('WebSocket error:', error);
  rl.close();
});
