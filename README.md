# ATS Analyzer — CV Optimizer para LinkedIn

Analisa currículos com IA aplicando regras de ATS e gera sugestões de otimização para o LinkedIn.

## Stack

- **Next.js 14** (App Router)
- **TypeScript** — tipos em `src/types/index.ts`
- **Tailwind CSS** — estilização utilitária
- **Anthropic SDK** — análise via Claude (server-side, chave nunca exposta)
- **pdf-parse** — extração de texto de PDFs
- **mammoth** — extração de texto de arquivos DOCX

## Estrutura do projeto

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts       # Chama Anthropic API, retorna ATSResult
│   │   └── parse-file/route.ts    # Parseia PDF, DOCX ou TXT
│   ├── page.tsx                   # Página principal com form e resultados
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── UploadZone.tsx             # Drag-and-drop + upload de arquivo
│   ├── ScoreCard.tsx              # Pontuação geral ATS
│   ├── MetricsGrid.tsx            # 4 métricas (palavras-chave, formatação, exp, linkedin)
│   ├── KeywordsPanel.tsx          # Keywords encontradas vs ausentes
│   ├── DiagnosticsPanel.tsx       # Pontos fortes, problemas, recomendações
│   └── LinkedInPanel.tsx          # Headline e About sugeridos
├── lib/
│   └── utils.ts                   # cn(), getScoreColor(), getScoreLabel()
└── types/
    └── index.ts                   # ATSResult, AnalyzeRequest, etc.
```

## Setup

```bash
# 1. Clone e instale dependências
git clone https://github.com/luquitros/ats-analyzer
cd ats-analyzer
npm install

# 2. Configure a chave da API
cp .env.local.example .env.local
# Edite .env.local e adicione sua ANTHROPIC_API_KEY

# 3. Rode em dev
npm run dev
```

Acesse: http://localhost:3000

## Log do projeto

Veja [`PROJECT_LOG.md`](PROJECT_LOG.md) para acompanhar mudancas feitas, melhorias futuras e ideias de evolucao.

## Deploy (Vercel)

```bash
npx vercel deploy
# Adicione ANTHROPIC_API_KEY nas variáveis de ambiente do projeto no dashboard da Vercel
```

## Como funciona

1. Usuário faz upload do CV (PDF/DOCX/TXT) ou cola o texto
2. `/api/parse-file` extrai o texto do arquivo
3. `/api/analyze` envia o texto para o Claude com um prompt estruturado
4. Claude retorna um JSON tipado com score, métricas, keywords, recomendações e sugestões LinkedIn
5. Os componentes renderizam os resultados de forma organizada
