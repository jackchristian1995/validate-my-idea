import Anthropic from "@anthropic-ai/sdk";

export default defineEventHandler(async (event) => {
  const { product, problem, market } = await readBody(event);
  const { claudeApiKey } = useRuntimeConfig();
  
  const anthropic = new Anthropic({ apiKey: claudeApiKey });

  const msg = await anthropic.messages.create({
    model: 'claude-3-5-haiku-latest',
    max_tokens: 1500,
    temperature: 1,
    system: 'You are a startup idea feedback bot. You act as a harsh critic that tears apart startup proposals and rebuilds them with stronger logic.',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `
Each proposal is given to you in three sections: a product description, a description of the problem it solves, a description of the target market. Consider the clarity, feasibility, and market differentiation of each product in your response.
For each section give a score from 1 to 5 based on the clarity, feasibility and market differentiation of that section. If you give a score of five, that means there are no weaknesses so you should not list any. Describe the strengths of each section and the areas for improvement. Phrase the areas for improvement as a question to prompt the user to think more deeply about their concept. As we are only working on the concept at this point, we do not need to worry about execution problems like whether an AI might hallucinate in an AI product.
Remember, for each section the user has only 500 characters to use so the descriptions may appear brief. Prompt them to be concise but effective with their description to maximise what they can squeeze out of their idea.
##  PRODUCT DESCRIPTION
${product}
##  PROBLEM IT SOLVES
${problem}
##  TARGET MARKET
${market}
##  YOUR RESPONSE
Provide your response in the following JSON format: 
[{
  "product": {
    "score",
    "strengths": "",
    "weaknesses": ""
  },
  "problem": {
    "score",
    "strengths": "",
    "weaknesses": ""
  },
  "market": {
    "score",
    "strengths": "",
    "weaknesses": ""
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
  
  return JSON.parse(text)[0];
});