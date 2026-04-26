type Props = {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
  icon?: string
}

export default function OptionCard({ label, description, selected, onClick, icon }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded border transition-all mb-2 ${
        selected ? 'border-white bg-white/10 text-white' : 'border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-lg flex-shrink-0">{icon}</span>}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium">{label}</div>
          {description && <div className="text-xs text-zinc-500 mt-0.5">{description}</div>}
        </div>
        {selected && <span className="text-white text-xs ml-auto flex-shrink-0">✓</span>}
      </div>
    </button>
  )
}
