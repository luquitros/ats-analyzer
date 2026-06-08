import { CheckCircle2, AlertCircle, AlertTriangle, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ATSResult } from '@/types'

interface DiagnosticsPanelProps {
  pontos_fortes: string[]
  problemas_criticos: string[]
  secoes_ausentes: string[]
  recomendacoes: ATSResult['recomendacoes']
}

export function DiagnosticsPanel({
  pontos_fortes,
  problemas_criticos,
  secoes_ausentes,
  recomendacoes,
}: DiagnosticsPanelProps) {
  return (
    <div className="space-y-3">
      {/* Pontos fortes */}
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-medium text-zinc-800">Pontos fortes</h3>
        </div>
        <ul className="divide-y divide-zinc-50">
          {pontos_fortes.map((item, i) => (
            <li key={i} className="px-4 py-2.5 flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
              <span className="text-sm text-zinc-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Problemas críticos */}
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <h3 className="text-sm font-medium text-zinc-800">Problemas críticos para ATS</h3>
        </div>
        <ul className="divide-y divide-zinc-50">
          {problemas_criticos.map((item, i) => (
            <li key={i} className="px-4 py-2.5 flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
              <span className="text-sm text-zinc-700 leading-relaxed">{item}</span>
            </li>
          ))}
          {secoes_ausentes.map((sec, i) => (
            <li key={`sec-${i}`} className="px-4 py-2.5 flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
              <span className="text-sm text-zinc-700 leading-relaxed">
                Seção ausente:{' '}
                <span className="font-medium">{sec}</span>
              </span>
            </li>
          ))}
          {problemas_criticos.length === 0 && secoes_ausentes.length === 0 && (
            <li className="px-4 py-2.5">
              <span className="text-sm text-zinc-400">Nenhum problema crítico encontrado 🎉</span>
            </li>
          )}
        </ul>
      </div>

      {/* Recomendações */}
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-medium text-zinc-800">Recomendações de melhoria</h3>
        </div>
        <ul className="divide-y divide-zinc-50">
          {recomendacoes.map((rec, i) => (
            <li key={i} className="px-4 py-3 flex items-start gap-3">
              {rec.prioridade === 'alta' ? (
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              ) : (
                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-medium text-zinc-800">{rec.titulo}</p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{rec.descricao}</p>
              </div>
              <span
                className={cn(
                  'ml-auto flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium',
                  rec.prioridade === 'alta'
                    ? 'bg-red-50 text-red-600'
                    : 'bg-amber-50 text-amber-600'
                )}
              >
                {rec.prioridade}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
