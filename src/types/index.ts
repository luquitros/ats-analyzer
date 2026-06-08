export interface MetricScore {
  score: number
  label: string
}

export interface Recommendation {
  prioridade: 'alta' | 'media'
  titulo: string
  descricao: string
}

export interface ATSResult {
  score: number
  nivel_detectado: string
  resumo_executivo: string
  metricas: {
    palavras_chave: MetricScore
    formatacao: MetricScore
    experiencia: MetricScore
    linkedin_fit: MetricScore
  }
  pontos_fortes: string[]
  problemas_criticos: string[]
  palavras_chave_encontradas: string[]
  palavras_chave_ausentes: string[]
  secoes_ausentes: string[]
  recomendacoes: Recommendation[]
  headline_sugerida: string
  resumo_linkedin_sugerido: string
}

export interface AnalyzeRequest {
  cvText: string
  vaga?: string
  nivel: 'junior' | 'pleno' | 'senior' | 'liderança'
}

export interface AnalyzeResponse {
  result?: ATSResult
  error?: string
}
