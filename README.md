# DaSH-Lab-Assignment-2024

This repository was created during the course of DaSH Lab Inductions 2024. 

Three development questions involving LLM API calls, client-server architecture and Docker implementation are elaborated on here.

# Contents of the repository
There are two main directories in this repository:
- [llm-api-call](#llm-api-call)
- [llm-server](#llm-server)

## llm-api-call
- [llm-py](llm-api-call/llm-py) : A python script that realays questions to gpt-3.5-turbo via an API call. Note that `openai.api_key` requires a valid API key, which can be procured from [here](https://openai.com/index/openai-api/).
- [input.txt](llm-api-call/input.txt) : A .txt file containing 12 questions ( i.e,. prompts ) to be answered by GPT-3.5-turbo via API call.
- [output.json](llm-api-call/output.json) : A .json file containing answers to each of the 12 prompts in [input.txt](llm-api-call/input.txt), with each answer being a JSON object, complete with properties like `TimeSent` (Time at which prompt was sent) and  `TimeRecvd` (Time at which answer was received).

## llm-server
This directory contains two folders (**client** and **server**) and a [docker-compose.yml](llm-server/docker-compose.yml) file.
### client
- [client.js](llm-server/client/client.js) : A Node.js file which connects a client (having a unique clientID) to a server hosted at port `3000` and allows the client to prompt the server. Additionally, this file also stores the server's response as a JSON file with properties such as `promptTimestamp` (Time at which prompt was sent) and `responseTimestamp` (Time at which answer was received) and `clientID`.
- [Dockerfile](llm-server/client/Dockerfile) : A Dockerfile which exposes the client at port `3001` on creating a Docker image.
- [package.json](llm-server/client/package.json) : Contains dependencies for running client.js

In addition, there are also two JSON files titled **response-2024-08-30T13-46-24.127Z.json** and **response-2024-08-30T13-54-43.245Z.json** which contain the server's responses to separate clients.

### server
- [server.js](llm-server/server/server.js) : A Node.js file which hosts a server at port `3000` and queries GPT-3.5-Turbo via an API call. The server also sends each client a response to their query as a JSON object. Note that `apiKey` requires a valid API key, which can be procured from [here](https://openai.com/index/openai-api/).
- [Dockerfile](llm-server/server/Dockerfile) : A Dockerfile which exposes the server at port `3000` on creating a Docker image.
- [package.json](llm-server/server/package.json) : Contains dependencies for running server.js

 ### docker-compose.yml
 This is a Docker Compose file for creating images of both the client and server Dockerfiles and creates two instances of the client to query the server.
  

