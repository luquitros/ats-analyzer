import { Eye, HelpCircle, ShieldAlert, ThumbsUp } from 'lucide-react'
import type { ATSResult } from '@/types'

interface RecruiterScanPanelProps {
  scan: ATSResult['leitura_recrutador']
}

export function RecruiterScanPanel({ scan }: RecruiterScanPanelProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-2">
        <Eye className="w-4 h-4 text-zinc-500" />
        <h3 className="text-sm font-medium text-zinc-800">Leitura do recrutador em 6 segundos</h3>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2.5">
          <p className="text-sm text-zinc-800 leading-relaxed">{scan.impressao_6s}</p>
        </div>

        <div className="grid gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                Sinais fortes
              </p>
            </div>
            <ul className="space-y-1.5">
              {scan.sinais_fortes.map((item, index) => (
                <li key={index} className="text-sm text-zinc-700 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                Duvidas antes da entrevista
              </p>
            </div>
            <ul className="space-y-1.5">
              {scan.duvidas_do_recrutador.map((item, index) => (
                <li key={index} className="text-sm text-zinc-700 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-4 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-700 leading-relaxed">{scan.risco_rejeicao}</p>
        </div>
      </div>
    </div>
  )
}
