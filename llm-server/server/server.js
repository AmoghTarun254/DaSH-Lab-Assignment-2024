// server.js

const express = require('express');
const { Configuration, OpenAI } = require('openai');
const { WebSocketServer } = require('ws');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Set up OpenAI API configuration
const openai = new OpenAI({
  apiKey: 'sk-proj-***', 
});

//const openai = new OpenAIApi(configuration);

// Set up Express app
const app = express();
app.use(bodyParser.json());

// Create a WebSocket server
const wss = new WebSocketServer({ noServer: true });
const clients = new Map(); // Store connected clients

// Function to generate response using OpenAI's API
async function generateResponse(prompt) {
  const promptTimestamp = new Date().toISOString();

  try {
    // Send the prompt to OpenAI's API
      const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125', 
      messages: [
        {"role": "system", "content": "You are a helpful assistant that can accurately answer user queries."},
        { role: 'user', content: prompt }
    ],
      max_tokens: 100,
      temperature: 0.7,
    });

     // Log the entire response for debugging
     //console.log('OpenAI API response:', response);

    /*if( !response || !response.data){
      throw new Error('No response from OpenAI API. Check your network connection and API key')
    }*/

   /* if (response.data && response.data.choices && response.data.choices.length > 0) {*/
        const responseTimestamp = new Date().toISOString();
        const responseText = response.choices[0].message.content.trim();
  
        return {
          prompt,
          promptTimestamp,
          response: responseText,
          responseTimestamp
        };   
    /*} else {
        throw new Error('Invalid response structure from OpenAI API');
  }*/

  } catch (error) {
    console.error('Error generating response from OpenAI:', error.message || error);
    throw error;
  }
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
  const clientId = uuidv4();
  clients.set(clientId, ws);

  console.log('Client '+ clientId +' has joined the chat'); //Display a message on the console when a new client joins the server

  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    if (data.prompt) {
      try {
        const response = await generateResponse(data.prompt);
        const responseData = { clientId, ...response, source: 'gpt-3.5-turbo' };

        // Send response to all connected clients
        clients.forEach((clientWs, id) => {
          const isOriginalSender = id === clientId;
          const clientResponseData = {
            ...responseData,
            source: isOriginalSender? 'gpt-3.5-turbo':'user',
          };

          clientWs.send(JSON.stringify(clientResponseData));
        });
      } catch (error) {
        ws.send(JSON.stringify({ error: 'Failed to generate response' }));
      }
    }
  });

  ws.on('close', () => {
    clients.delete(clientId);
    console.log('Client '+ clientId +' has left the chat');//Display a message on the console when a client leaves the chat
  });
});

// Start the HTTP server and integrate WebSocket server
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
