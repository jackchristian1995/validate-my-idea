import Anthropic from "@anthropic-ai/sdk";

export default defineEventHandler(async (event) => {
  const { feedback, concept: { product, problem, market } } = await readBody(event);
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
            text: `You have already evaluated a startup idea and provided your feedback. Now you must review the updated proposal based on the feedback you already gave. For reference the feedback you gave previous is listed below. If you have already given a score of 5 then no more feedback is required just return the existing feedback.
##  YOUR PREVIOUS FEEDBACK OF THE IDEA DESCRIPTION
Score: ${feedback.product.score}
Strengths: ${feedback.product.strengths}
Weaknesses: ${feedback.product.weaknesses}
##  YOUR PREVIOUS FEEDBACK OF THE PROBLEM IT SOLVES
Score: ${feedback.problem.score}
Strengths: ${feedback.problem.strengths}
Weaknesses: ${feedback.problem.weaknesses}
##  YOUR PREVIOUS FEEDBACK OF THE TARGET MARKET
Score: ${feedback.market.score}
Strengths: ${feedback.market.strengths}
Weaknesses: ${feedback.market.weaknesses}
Each proposal is given to you in three sections: a product description, a description of the problem it solves, a description of the target market. Consider the clarity, feasibility, market differentiation and how easy it will be to monetise the product in your response. Market differentiation and monetisation are the most important things to focus on. Ensure the user knows where to improve in those areas. Do not ask questions about implementation at this stage, focus only on ideation and creating a high-quality concept.
For each section give a score from 1 to 5 based on the clarity, feasibility, market differentiation and how easy it will be to monetise that section. If you give a score of five, that means there are no weaknesses so you should not list any. Describe the strengths of each section and the areas for improvement. Phrase the areas for improvement as a question to prompt the user to think more deeply about their concept. As we are only working on the concept at this point, we do not need to worry about execution problems like whether an AI might hallucinate in an AI product.
Remember, for each section the user has only 500 characters to use so the descriptions may appear brief. Prompt them to be concise but effective with their description to maximise what they can squeeze out of their idea.
If you are happy that the idea is complete, leave the weaknesses empty.
##  IDEA DESCRIPTION
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
            text: 'Include only JSON in your response. Use the supplied JSON example to structure the data in your response.'
          },
          {
            type: 'text',
            text: 'Ensure that the weaknesses you mention do not contradict the strengths. For example, if you say in the strengths section that the target market is clear and well-defined do not also say that the target market is too broad in the weaknesses.'
          }
        ]
      }
    ]
  });

  const { text } = msg.content[0];
  

  return JSON.parse(text);
});