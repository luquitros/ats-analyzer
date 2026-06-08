import { cn, getScoreColor, getScoreLabel } from '@/lib/utils'
import type { ATSResult } from '@/types'

interface ScoreCardProps {
  result: ATSResult
  vaga?: string
}

export function ScoreCard({ result, vaga }: ScoreCardProps) {
  const colors = getScoreColor(result.score)

  return (
    <div
      className={cn(
        'rounded-xl border p-5 flex items-center gap-5',
        colors.border,
        colors.bg
      )}
    >
      <div
        className={cn(
          'w-20 h-20 rounded-full flex flex-col items-center justify-center flex-shrink-0 border-2',
          colors.border
        )}
      >
        <span className={cn('text-3xl font-semibold tabular-nums', colors.text)}>
          {result.score}
        </span>
        <span className={cn('text-xs font-medium', colors.text)}>/100</span>
      </div>

      <div className="flex-1 min-w-0">
        <h2 className={cn('font-medium text-base', colors.text)}>
          {getScoreLabel(result.score)}
        </h2>
        <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
          {result.resumo_executivo}
        </p>
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {vaga && (
            <span className="text-xs text-zinc-500">
              Vaga:{' '}
              <span className="font-medium text-zinc-700">{vaga}</span>
            </span>
          )}
          <span className="text-xs text-zinc-500">
            Nível detectado:{' '}
            <span className="font-medium text-zinc-700">{result.nivel_detectado}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
