import { AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import type { ATSResult } from '@/types'
import { cn } from '@/lib/utils'

interface ActionPlanPanelProps {
  items: ATSResult['plano_correcao']
}

const PRIORITY_META = {
  agora: {
    label: 'Agora',
    icon: AlertTriangle,
    classes: 'bg-red-50 text-red-700 border-red-100',
    iconClasses: 'text-red-500',
  },
  alto_impacto: {
    label: 'Alto impacto',
    icon: ArrowUpRight,
    classes: 'bg-amber-50 text-amber-700 border-amber-100',
    iconClasses: 'text-amber-500',
  },
  ajuste_fino: {
    label: 'Ajuste fino',
    icon: CheckCircle2,
    classes: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    iconClasses: 'text-emerald-500',
  },
} as const

export function ActionPlanPanel({ items }: ActionPlanPanelProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-100">
        <h3 className="text-sm font-medium text-zinc-800">Plano de correcao priorizado</h3>
      </div>

      <ul className="divide-y divide-zinc-50">
        {items.map((item, index) => {
          const meta = PRIORITY_META[item.prioridade]
          const Icon = meta.icon

          return (
            <li key={index} className="px-4 py-3 flex items-start gap-3">
              <Icon className={cn('w-4 h-4 flex-shrink-0 mt-0.5', meta.iconClasses)} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-zinc-800">{item.acao}</p>
                  <span
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full border font-medium',
                      meta.classes
                    )}
                  >
                    {meta.label}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{item.motivo}</p>
                {item.exemplo && (
                  <div className="mt-2 bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2">
                    <p className="text-xs text-zinc-600 leading-relaxed">{item.exemplo}</p>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
