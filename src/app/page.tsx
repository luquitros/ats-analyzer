'use client'

import { useState } from 'react'
import { Loader2, Sparkles, RotateCcw } from 'lucide-react'
import { UploadZone } from '@/components/UploadZone'
import { ScoreCard } from '@/components/ScoreCard'
import { MetricsGrid } from '@/components/MetricsGrid'
import { KeywordsPanel } from '@/components/KeywordsPanel'
import { DiagnosticsPanel } from '@/components/DiagnosticsPanel'
import { LinkedInPanel } from '@/components/LinkedInPanel'
import { JobMatchPanel } from '@/components/JobMatchPanel'
import { RecruiterScanPanel } from '@/components/RecruiterScanPanel'
import { ActionPlanPanel } from '@/components/ActionPlanPanel'
import type { ATSResult, AnalyzeRequest } from '@/types'

type Nivel = AnalyzeRequest['nivel']

const LOADING_MESSAGES = [
  'Verificando palavras-chave ATS...',
  'Analisando formatação e seções...',
  'Calculando compatibilidade LinkedIn...',
  'Gerando recomendações personalizadas...',
]

export default function Home() {
  const [cvText, setCvText] = useState('')
  const [vaga, setVaga] = useState('')
  const [descricaoVaga, setDescricaoVaga] = useState('')
  const [nivel, setNivel] = useState<Nivel>('pleno')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0])
  const [result, setResult] = useState<ATSResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!cvText.trim() || cvText.trim().length < 50) {
      setError('Cole um currículo mais completo para análise.')
      return
    }

    setError(null)
    setIsLoading(true)
    setResult(null)

    let msgIdx = 0
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length
      setLoadingMsg(LOADING_MESSAGES[msgIdx])
    }, 2000)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText, vaga, descricaoVaga, nivel }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || 'Erro ao processar análise.')
        return
      }

      setResult(data.result)
    } catch {
      setError('Erro de conexão. Verifique sua internet e tente novamente.')
    } finally {
      clearInterval(interval)
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    setCvText('')
    setVaga('')
    setDescricaoVaga('')
    setNivel('pleno')
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
            Analisador de CV
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Análise ATS + otimização para LinkedIn com IA
          </p>
        </div>

        {/* Input Form */}
        {!result && !isLoading && (
          <div className="space-y-4">
            <UploadZone onTextExtracted={setCvText} />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-zinc-50 px-3 text-zinc-400">ou cole o texto</span>
              </div>
            </div>

            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder={`Cole aqui o texto do seu currículo...\n\nExemplo:\nJoão Silva | joao@email.com | linkedin.com/in/joaosilva\n\nRESUMO PROFISSIONAL\nDesenvolvedor Full Stack com 3 anos de experiência...`}
              className="w-full min-h-[160px] text-sm font-mono border border-zinc-200 rounded-xl px-3.5 py-3 resize-y text-zinc-800 placeholder:text-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition"
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                  Vaga alvo <span className="font-normal text-zinc-400">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={vaga}
                  onChange={(e) => setVaga(e.target.value)}
                  placeholder="Ex: Dev Backend Python"
                  className="w-full text-sm border border-zinc-200 rounded-lg px-3 py-2 text-zinc-800 placeholder:text-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                  Nível
                </label>
                <select
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value as Nivel)}
                  className="w-full text-sm border border-zinc-200 rounded-lg px-3 py-2 text-zinc-800 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 transition"
                >
                  <option value="junior">Júnior</option>
                  <option value="pleno">Pleno</option>
                  <option value="senior">Sênior</option>
                  <option value="lideranca">Liderança</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 gap-3">
                <label className="block text-xs font-medium text-zinc-500">
                  Descrição completa da vaga{' '}
                  <span className="font-normal text-zinc-400">(opcional)</span>
                </label>
                <span className="text-xs text-zinc-400 tabular-nums">
                  {descricaoVaga.length}/12000
                </span>
              </div>
              <textarea
                value={descricaoVaga}
                maxLength={12000}
                onChange={(e) => setDescricaoVaga(e.target.value)}
                placeholder="Cole aqui os requisitos, responsabilidades e diferenciais da vaga para comparar o CV com mais precisão."
                className="w-full min-h-[120px] text-sm border border-zinc-200 rounded-xl px-3.5 py-3 resize-y text-zinc-800 placeholder:text-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1.5">
                <span>⚠</span> {error}
              </p>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!cvText.trim()}
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-700 disabled:bg-zinc-200 disabled:cursor-not-allowed text-white disabled:text-zinc-400 rounded-xl py-3 text-sm font-medium transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Analisar currículo
            </button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center gap-3 py-16 text-zinc-500">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
            <p className="text-sm">{loadingMsg}</p>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && (
          <div className="space-y-4">
            <ScoreCard result={result} vaga={vaga} />
            <MetricsGrid metricas={result.metricas} />
            <JobMatchPanel match={result.vaga_match} />
            <RecruiterScanPanel scan={result.leitura_recrutador} />
            <ActionPlanPanel items={result.plano_correcao} />
            <KeywordsPanel
              encontradas={result.palavras_chave_encontradas}
              ausentes={result.palavras_chave_ausentes}
            />
            <DiagnosticsPanel
              pontos_fortes={result.pontos_fortes}
              problemas_criticos={result.problemas_criticos}
              secoes_ausentes={result.secoes_ausentes}
              recomendacoes={result.recomendacoes}
            />
            <LinkedInPanel
              headline={result.headline_sugerida}
              about={result.resumo_linkedin_sugerido}
            />

            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 border border-zinc-200 hover:bg-zinc-100 text-zinc-600 rounded-xl py-3 text-sm font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Analisar outro currículo
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
