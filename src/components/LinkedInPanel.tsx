'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface LinkedInPanelProps {
  headline: string
  about: string
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-emerald-600">Copiado!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copiar</span>
        </>
      )}
    </button>
  )
}

export function LinkedInPanel({ headline, about }: LinkedInPanelProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-2">
        <span className="text-base">💼</span>
        <h3 className="text-sm font-medium text-zinc-800">Sugestões para o LinkedIn</h3>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Headline</p>
            <CopyButton text={headline} />
          </div>
          <div className="bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2.5">
            <p className="text-sm text-zinc-800 leading-relaxed">{headline}</p>
            <p className="text-xs text-zinc-400 mt-1">{headline.length}/220 caracteres</p>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-4">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Seção About</p>
            <CopyButton text={about} />
          </div>
          <div className="bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2.5">
            <p className="text-sm text-zinc-800 leading-relaxed whitespace-pre-line">{about}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
