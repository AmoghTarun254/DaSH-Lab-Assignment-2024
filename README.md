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
- [output.json](llm-api-call/output.json) : A .json file containing answers to each of the 12 prompts in [input.txt](llm-api-call/input.txt), with each answer being a JSON object, complete with properties like `TimeSent` (Time at which prompt was sent) and  `TimeRecvd` (Time at which answer was received)

## llm-server
This directory contains two folders:
### client
- [client.js](llm-server/client.js)
