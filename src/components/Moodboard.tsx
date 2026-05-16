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

      <div className="rounded-[32px] backdrop-blur-2xl shadow-sm p-8 md:p-8" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>

        <h2 className="text-2xl md:text-3xl font-semibold mb-6">

          Moodboard Colors

        </h2>

        <p className="leading-relaxed whitespace-pre-wrap text-[var(--text-secondary)]">

          {colors || 'No colors generated.'}

        </p>

      </div>

      {/* Ambient Scene */}

      <div className="rounded-[32px] backdrop-blur-2xl shadow-sm p-8 md:p-8" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4">

          Ambient Scene

        </h2>

        <p className="leading-relaxed whitespace-pre-wrap text-[var(--text-secondary)]">

          {ambient || 'No ambient scene generated.'}

        </p>

      </div>

      {/* Visual Aesthetic */}

      <div className="rounded-[32px] backdrop-blur-2xl shadow-sm p-8 md:p-8" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4">

          Visual Aesthetic

        </h2>

        <p className="leading-relaxed whitespace-pre-wrap text-[var(--text-secondary)]">

          {aesthetic || 'No aesthetic generated.'}

        </p>

      </div>

      {/* Soundtrack */}

      <div className="rounded-[32px] backdrop-blur-2xl shadow-sm p-8 md:p-8" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4">

          Soundtrack Vibe

        </h2>

        <p className="leading-relaxed whitespace-pre-wrap text-[var(--text-secondary)]">

          {soundtrack || 'No soundtrack vibe generated.'}

        </p>

      </div>

    </div>
  )
}
