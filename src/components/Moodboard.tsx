interface MoodboardProps {

  result: string
}

export default function Moodboard({

  result,

}: MoodboardProps) {

  const extractSection = (title: string) => {

    const regex = new RegExp(

      `${title}[\\s\\S]*?:([\\s\\S]*?)(?=\\n\\d+\\.|$)`,

      'i'
    )

    return result.match(regex)?.[1]?.trim()
  }

  const colors =
    extractSection('Moodboard Colors')

  const ambient =
    extractSection('Ambient Scene')

  const aesthetic =
    extractSection('Visual Aesthetic')

  const soundtrack =
    extractSection('Soundtrack Vibe')

  return (

    <div className="mt-12 space-y-8">

      {/* Colors */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

        <h2 className="text-2xl font-semibold mb-6">

          Moodboard Colors

        </h2>

        <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">

          {colors || 'No colors generated.'}

        </p>

      </div>

      {/* Ambient Scene */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

        <h2 className="text-2xl font-semibold mb-4">

          Ambient Scene

        </h2>

        <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">

          {ambient || 'No ambient scene generated.'}

        </p>

      </div>

      {/* Visual Aesthetic */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

        <h2 className="text-2xl font-semibold mb-4">

          Visual Aesthetic

        </h2>

        <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">

          {aesthetic || 'No aesthetic generated.'}

        </p>

      </div>

      {/* Soundtrack */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

        <h2 className="text-2xl font-semibold mb-4">

          Soundtrack Vibe

        </h2>

        <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">

          {soundtrack || 'No soundtrack vibe generated.'}

        </p>

      </div>

    </div>
  )
}