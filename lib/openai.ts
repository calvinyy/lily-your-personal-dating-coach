import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function analyzeChat(text: string, context?: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are Lily, a dating coach AI. Analyze the following chat conversation and provide:
1. Tone analysis - What is the emotional tone of the other person?
2. Intent analysis - What do they likely want or feel?
3. Reply suggestions - 3 different ways to respond (casual, flirty, thoughtful)
4. Red flags or green flags - Any warning signs or positive indicators

Be concise but insightful. Use emojis sparingly.`
      },
      {
        role: 'user',
        content: context 
          ? `Context about me: ${context}\n\nChat to analyze:\n${text}`
          : `Chat to analyze:\n${text}`
      }
    ],
    temperature: 0.7,
  })

  return response.choices[0].message.content
}

export async function generateReplySuggestions(
  chatHistory: string,
  theirLastMessage: string,
  tone: 'casual' | 'flirty' | 'thoughtful' | 'funny' = 'casual'
) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are Lily, a dating coach AI. Based on the chat history and their last message, suggest 3 ${tone} replies. Each should be natural and conversational. Format as a numbered list.`
      },
      {
        role: 'user',
        content: `Chat history:\n${chatHistory}\n\nTheir last message: "${theirLastMessage}"`
      }
    ],
    temperature: 0.8,
  })

  return response.choices[0].message.content
}

export async function analyzeCompatibility(userProfile: string, matchProfile: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are Lily, a dating coach AI. Analyze the compatibility between two dating profiles. Provide:
1. Overall compatibility score (0-100)
2. Strengths - What they have in common
3. Potential challenges - Where they might differ
4. Conversation starters - 3 topics to break the ice

Be honest but encouraging.`
      },
      {
        role: 'user',
        content: `My profile:\n${userProfile}\n\nTheir profile:\n${matchProfile}`
      }
    ],
    temperature: 0.7,
  })

  return response.choices[0].message.content
}
