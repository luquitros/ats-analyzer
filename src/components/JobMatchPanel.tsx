import { CheckCircle2, CircleDashed, XCircle } from 'lucide-react'
import type { ATSResult } from '@/types'
import { cn, getScoreColor } from '@/lib/utils'

interface JobMatchPanelProps {
  match: ATSResult['vaga_match']
}

function MatchList({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: 'good' | 'weak' | 'missing'
}) {
  const Icon = tone === 'good' ? CheckCircle2 : tone === 'weak' ? CircleDashed : XCircle
  const color =
    tone === 'good'
      ? 'text-emerald-600'
      : tone === 'weak'
        ? 'text-amber-600'
        : 'text-red-600'

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn('w-4 h-4', color)} />
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{title}</p>
      </div>
      {items.length > 0 ? (
        <ul className="space-y-1.5">
          {items.slice(0, 6).map((item, index) => (
            <li key={index} className="text-sm text-zinc-700 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-400">Nenhum item identificado.</p>
      )}
    </div>
  )
}

export function JobMatchPanel({ match }: JobMatchPanelProps) {
  const colors = getScoreColor(match.score)

  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-zinc-800">CV x vaga completa</h3>
        <span className={cn('text-sm font-semibold tabular-nums', colors.text)}>
          {match.score}/100
        </span>
      </div>
      <div className="p-4 space-y-4">
        <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-700', colors.bar)}
            style={{ width: `${match.score}%` }}
          />
        </div>
        <div className="grid gap-4">
          <MatchList
            title="Bem evidenciados"
            items={match.requisitos_atendidos}
            tone="good"
          />
          <MatchList
            title="Citados de forma fraca"
            items={match.requisitos_fracos}
            tone="weak"
          />
          <MatchList
            title="Ausentes ou pouco claros"
            items={match.requisitos_ausentes}
            tone="missing"
          />
        </div>
      </div>
    </div>
  )
}
