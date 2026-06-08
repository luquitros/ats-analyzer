export interface MetricScore {
  score: number
  label: string
}

export interface Recommendation {
  prioridade: 'alta' | 'media'
  titulo: string
  descricao: string
}

export interface JobMatch {
  score: number
  requisitos_atendidos: string[]
  requisitos_fracos: string[]
  requisitos_ausentes: string[]
}

export interface RecruiterScan {
  impressao_6s: string
  sinais_fortes: string[]
  duvidas_do_recrutador: string[]
  risco_rejeicao: string
}

export interface ActionPlanItem {
  prioridade: 'agora' | 'alto_impacto' | 'ajuste_fino'
  acao: string
  motivo: string
  exemplo?: string
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
  vaga_match: JobMatch
  leitura_recrutador: RecruiterScan
  plano_correcao: ActionPlanItem[]
  headline_sugerida: string
  resumo_linkedin_sugerido: string
}

export interface AnalyzeRequest {
  cvText: string
  vaga?: string
  descricaoVaga?: string
  nivel: 'junior' | 'pleno' | 'senior' | 'lideranca'
}

export interface AnalyzeResponse {
  result?: ATSResult
  error?: string
}
