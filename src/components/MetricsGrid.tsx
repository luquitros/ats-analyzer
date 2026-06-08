import { cn, getScoreColor, METRIC_LABELS } from '@/lib/utils'
import type { ATSResult } from '@/types'

interface MetricsGridProps {
  metricas: ATSResult['metricas']
}

export function MetricsGrid({ metricas }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {(Object.entries(metricas) as [keyof ATSResult['metricas'], { score: number; label: string }][]).map(
        ([key, value]) => {
          const colors = getScoreColor(value.score)
          return (
            <div
              key={key}
              className="rounded-lg bg-zinc-50 border border-zinc-100 p-3"
            >
              <p className="text-xs text-zinc-500 mb-1">{METRIC_LABELS[key]}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={cn('text-2xl font-semibold tabular-nums', colors.text)}>
                  {value.score}
                </span>
                <span className="text-xs text-zinc-400">/100</span>
              </div>
              <div className="h-1 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-700', colors.bar)}
                  style={{ width: `${value.score}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-1.5 leading-tight">{value.label}</p>
            </div>
          )
        }
      )}
    </div>
  )
}
