interface KeywordsPanelProps {
  encontradas: string[]
  ausentes: string[]
}

export function KeywordsPanel({ encontradas, ausentes }: KeywordsPanelProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-2">
        <span className="text-base">🏷️</span>
        <h3 className="text-sm font-medium text-zinc-800">Palavras-chave ATS</h3>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2">
            Encontradas no CV
          </p>
          {encontradas.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {encontradas.slice(0, 12).map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100"
                >
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-400">Nenhuma palavra-chave relevante detectada</p>
          )}
        </div>

        <div className="border-t border-zinc-100 pt-4">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2">
            Ausentes — adicionar ao CV
          </p>
          {ausentes.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {ausentes.map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100"
                >
                  + {kw}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-400">Nenhuma palavra-chave crítica ausente</p>
          )}
        </div>
      </div>
    </div>
  )
}
