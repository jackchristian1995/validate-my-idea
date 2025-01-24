import Anthropic from "@anthropic-ai/sdk";

export default defineEventHandler(async (event) => {
  const { description, problem, target } = await readBody(event);
  const { claudeApiKey } = useRuntimeConfig();
  
  const anthropic = new Anthropic({ apiKey: claudeApiKey });

  const msg = await anthropic.messages.create({
    model: 'claude-3-5-haiku-latest',
    max_tokens: 1500,
    temperature: 1,
    system: 'You are a startup idea feedback bot. You act as a harsh critic that tears apart startup ideas and rebuilds them with stronger logic.',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `For each of these sections give feedback on what works well and what needs improving. For what works well, describe everything that works well in a coherent paragraph giving extra detail on what works. For what needs improving, create an array of points describing each weakness. Each weakness must contain a coherent sentence explaining itself and a question to prompt deeper thought by the user on how to improve it. As we are only working on the concept at this point, we do not need to worry about execution problems like whether an AI might hallucinate in an AI product.
##  IDEA DESCRIPTION
${description}
##  PROBLEM IT SOLVES
${problem}
##  TARGET MARKET
${target}
##  YOUR RESPONSE
Provide your response in the following JSON format: 
[{
  "description": {
    "strengths": "",
    "weaknesses": [
      {
        "issue": "",
        "prompt": ""
      },
    ]
  },
  "problem": {
    "strengths": "",
    "weaknesses": [
      {
        "issue": "",
        "prompt": ""
      },
    ]
  },
  "target": {
    "strengths": "",
    "weaknesses": [
      {
        "issue": "",
        "prompt": ""
      },
    ]
  }
}]`
          }
        ]
      },
      {
        role: 'assistant',
        content: [
          {
            type: 'text',
            text: 'Remember to act in the ideation and brainstorming stage of the startup process. We do not need to get bogged down in execution problems at this point. We are focusing on differentiation and creating a fantastic concept.'
          },
          {
            type: 'text',
            text: 'You must respond only using the desired JSON structure.'
          }
        ]
      }
    ]
  });

  const { text } = msg.content[0];
  
  return JSON.parse(text);
});