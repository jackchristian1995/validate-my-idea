import Anthropic from "@anthropic-ai/sdk";

export default defineEventHandler(async (event) => {
  const { idea, problem, target } = await readBody(event);
  const { claudeApiKey } = useRuntimeConfig();
  
  const anthropic = new Anthropic({ apiKey: claudeApiKey });

  const msg = await anthropic.messages.create({
    model: 'claude-3-5-haiku-latest',
    max_tokens: 1000,
    temperature: 1,
    system: 'Act as a harsh critic. Tear apart the idea presented to you and then rebuild it with stronger logic. In your response, explain what is good about the idea and what needs improving. Provide your response in JSON format using the keys: "what_works_well" and "what_needs_improvement".',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `My idea for a startup is as follows: ${idea}. The idea solves the following problem: ${problem}. The target market for this startup is: ${target}.`
          }
        ]
      }
    ]
  });

  const { text } = msg.content[0];

  return JSON.parse(text);
});