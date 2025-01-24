import Anthropic from "@anthropic-ai/sdk";

export default defineEventHandler(async (event) => {
  const { description, problem, target } = await readBody(event);
  const { claudeApiKey } = useRuntimeConfig();
  
  const anthropic = new Anthropic({ apiKey: claudeApiKey });

  const msg = await anthropic.messages.create({
    model: 'claude-3-5-haiku-latest',
    max_tokens: 1500,
    temperature: 1,
    system: `Act as a harsh critic. Tear apart the idea presented to you and then rebuild it with stronger logic. The proposal is given in three sections: a brief description of the concept, the problem it solves, and the target market. For each of these sections give feedback on what works well and what needs improving. For what works well, write a long string describing everything that works well using an encouraging tone. For what needs improving, create an array of points describing each weakness. Finally, create an array of actionable improvements that can be made to the idea. Give your response in the following JSON format: 
    [{
      "description": {
        "strengths": "",
        "weaknesses": [
          "",
        ],
        "improvements": [
          "",
        ] 
      },
      "problem": {
        "strengths": "",
        "weaknesses": [
          "",
        ],
        "improvements": [
          "",
        ]
      },
      "description": {
        "strengths": "",
        "target": [
          "",
        ],
        "improvements": [
          "",
        ]
      }
    }]
    `,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `My idea for a startup is as follows: ${description}. The idea solves the following problem: ${problem}. The target market for this startup is: ${target}.`
          }
        ]
      }
    ]
  });

  const { text } = msg.content[0];

  return JSON.parse(text);
});