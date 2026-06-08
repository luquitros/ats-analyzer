import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import type { AnalyzeRequest, ATSResult } from '@/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `Você é um especialista sênior em ATS (Applicant Tracking System) e otimização de currículos para o mercado brasileiro, com foco especial em LinkedIn. Analise currículos com precisão técnica e retorne APENAS JSON válido, sem markdown, sem texto adicional.`

function buildPrompt(req: AnalyzeRequest): string {
  return `Analise o currículo abaixo e retorne APENAS um JSON válido com esta estrutura exata:

{
  "score": <0-100>,
  "nivel_detectado": "<string>",
  "resumo_executivo": "<1 frase objetiva>",
  "metricas": {
    "palavras_chave": { "score": <0-100>, "label": "<string curta>" },
    "formatacao":    { "score": <0-100>, "label": "<string curta>" },
    "experiencia":   { "score": <0-100>, "label": "<string curta>" },
    "linkedin_fit":  { "score": <0-100>, "label": "<string curta>" }
  },
  "pontos_fortes": ["<string>", "..."],
  "problemas_criticos": ["<string>", "..."],
  "palavras_chave_encontradas": ["<palavra>", "..."],
  "palavras_chave_ausentes": ["<palavra>", "..."],
  "secoes_ausentes": ["<secao>", "..."],
  "recomendacoes": [
    { "prioridade": "alta|media", "titulo": "<string>", "descricao": "<string>" }
  ],
  "headline_sugerida": "<headline para LinkedIn, máx 220 chars>",
  "resumo_linkedin_sugerido": "<parágrafo About do LinkedIn, 2-3 frases>"
}

Regras de análise ATS:
- Verificar uso de palavras-chave relevantes para a vaga/área
- Checar seções obrigatórias: Resumo, Experiência, Educação, Habilidades, Contato
- Identificar formatação problemática (tabelas, colunas, headers/footers, imagens)
- Avaliar clareza e quantificação de conquistas
- Verificar consistência de datas e gaps de carreira
- Checar adequação ao LinkedIn: foto, headline, about, conexões implícitas

Currículo:
${req.cvText}

Vaga alvo: ${req.vaga || 'Não especificada — analise pela área detectada'}
Nível: ${req.nivel}`
}

export async function POST(req: NextRequest) {
  try {
    const body: AnalyzeRequest = await req.json()

    if (!body.cvText || body.cvText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Currículo muito curto. Cole o texto completo.' },
        { status: 400 }
      )
    }

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildPrompt(body) }],
    })

    const raw = message.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('')

    const clean = raw.replace(/```json|```/g, '').trim()
    const result: ATSResult = JSON.parse(clean)

    return NextResponse.json({ result })
  } catch (err) {
    console.error('[analyze] error:', err)
    return NextResponse.json(
      { error: 'Erro ao processar análise. Tente novamente.' },
      { status: 500 }
    )
  }
}
