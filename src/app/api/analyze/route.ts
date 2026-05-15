import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const completion = await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [

        {
          role: "system",

          content: `

You are an emotionally intelligent AI journal assistant.

Analyze the user's journal deeply.

Always provide:

1. Main Mood
2. Emotional Summary
3. Stress Level (1-100)
4. Positivity Score (1-100)
5. Key Emotional Themes
6. Cinematic Reflection
7. Moodboard Colors
8. Ambient Scene
9. Visual Aesthetic
10. Soundtrack Vibe

Your tone must feel:
- cinematic
- calm
- introspective
- emotionally intelligent
- artistic
- immersive

Format clearly and beautifully.

For Moodboard Colors:
give 3 aesthetic colors.

For Ambient Scene:
describe the emotional environment visually.

For Visual Aesthetic:
describe the artistic vibe.

For Soundtrack Vibe:
describe the music energy.

`,
        },

        {
          role: "user",
          content: body.text,
        },
      ],

      temperature: 0.8,

      max_completion_tokens: 500,
    })

    return Response.json({
      result: completion.choices[0]?.message?.content,
    })

  } catch (error) {

    console.log(error)

    return Response.json({
      error: "AI analysis failed",
    })
  }
}