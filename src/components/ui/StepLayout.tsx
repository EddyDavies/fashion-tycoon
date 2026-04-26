type Props = {
  title: string
  subtitle?: string
  step: number
  totalSteps?: number
  children: React.ReactNode
  preview: React.ReactNode
  onNext?: () => void
  onBack?: () => void
  nextLabel?: string
  nextDisabled?: boolean
}

export default function StepLayout({ title, subtitle, step, totalSteps = 5, children, preview, onNext, onBack, nextLabel = 'Next', nextDisabled = false }: Props) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Progress bar */}
      <div className="h-0.5 bg-zinc-800">
        <div className="h-full bg-white transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }} />
      </div>

      <div className="flex flex-1 overflow-hidden flex-col sm:flex-row">
        {/* Left: choices */}
        <div className="w-full sm:w-1/2 flex flex-col p-6 sm:p-8 overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Step {step} of {totalSteps}</p>
            <h1 className="text-2xl font-light text-white tracking-wide">{title}</h1>
            {subtitle && <p className="text-zinc-400 text-sm mt-1">{subtitle}</p>}
          </div>
          <div className="flex-1">{children}</div>
          <div className="flex gap-3 mt-8 pt-6 border-t border-zinc-800">
            {onBack && (
              <button onClick={onBack} className="px-6 py-2.5 text-sm text-zinc-400 border border-zinc-700 rounded hover:border-zinc-500 hover:text-white transition-colors">
                Back
              </button>
            )}
            {onNext && (
              <button onClick={onNext} disabled={nextDisabled} className="flex-1 px-6 py-2.5 text-sm bg-white text-black rounded hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-medium">
                {nextLabel}
              </button>
            )}
          </div>
        </div>

        {/* Right: preview */}
        <div className="w-full sm:w-1/2 bg-zinc-900 flex items-center justify-center p-8 border-t sm:border-t-0 sm:border-l border-zinc-800 min-h-64">
          <div className="w-56 h-72 flex items-center justify-center">
            {preview}
          </div>
        </div>
      </div>
    </div>
  )
}
