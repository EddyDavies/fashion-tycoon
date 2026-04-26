const PRESETS = [
  '#0a0a0a', '#1a1a2e', '#16213e', '#0f3460',
  '#533483', '#e94560', '#f5a623', '#7ed321',
  '#4a90d9', '#f5f5f5', '#2c2c2c', '#8b4513',
  '#c0392b', '#27ae60', '#2980b9', '#8e44ad',
]

type Props = { label: string; value: string; onChange: (hex: string) => void }

export default function ColourSwatch({ label, value, onChange }: Props) {
  return (
    <div className="mb-5">
      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">{label}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {PRESETS.map(c => (
          <button
            key={c}
            onClick={() => onChange(c)}
            title={c}
            className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${value.toLowerCase() === c ? 'border-white scale-110' : 'border-transparent'}`}
            style={{ backgroundColor: c }}
          />
        ))}
        <label className="w-7 h-7 rounded-full border-2 border-zinc-600 flex items-center justify-center cursor-pointer hover:border-zinc-400 relative overflow-hidden" title="Custom colour">
          <span className="text-zinc-400 text-xs pointer-events-none">+</span>
          <input type="color" value={value} onChange={e => onChange(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
        </label>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-sm border border-zinc-600 flex-shrink-0" style={{ backgroundColor: value }} />
        <span className="text-xs text-zinc-500 font-mono">{value.toUpperCase()}</span>
      </div>
    </div>
  )
}
