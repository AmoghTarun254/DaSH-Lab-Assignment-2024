import openai
import json
from datetime import datetime

#Set up API key
openai.api_key = 'sk-proj-9k9LzNDse5aJINClC6BRT3BlbkFJjmnbkUGmLFLTBH2fwguS'

#prompts = []
def read_prompts(input_file):
    with open(input_file,'r') as file:
        prompts = file.readlines()
    return [prompt.strip() for prompt in prompts]

def generate_response(prompts):
    responses = []
    for prompt in prompts:
        #Record the timestamp of the prompt being sent
        TimeSent = datetime.now().isoformat()

        #Generates a response using the GPT-3.5-turbo API
        response  = openai.chat.completions.create(
            model = 'gpt-3.5-turbo',
            messages=[
                {"role": "system", "content": "You are a helpful assistant that can accurately answer user queries."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100,
            temperature=0.7
        )

        #Record the timestamp of the response being received
        TimeRcvd = datetime.now().isoformat()

        #Extract the text from the response
        response_text = response.choices[0].message.content

        responses.append({
            'prompt': prompt,
            'response': response_text,
            'TimeSent': TimeSent,
            'TimeRecvd': TimeRcvd,
            'Source': 'gpt-3.5-turbo'
        })
    return responses

def write_response_to_json(responses, output_file):
    with open(output_file, 'w') as file:
        json.dump(responses, file, indent=4)
    print(f'Responses stored in {output_file}')


input_file = 'input.txt'
output_file = 'output.txt'

prompts = read_prompts(input_file)
responses = generate_response(prompts)
write_response_to_json(responses, output_file)
