# Project Log

Registro vivo de mudancas, melhorias futuras e ideias para evoluir o ATS Analyzer.

## Mudancas Ja Feitas

### 2026-06-08

- Transformado em aplicacao web Next.js funcional.
- Criado repositorio Git local dentro da pasta `ats-analyzer`.
- Publicado no GitHub em `https://github.com/luquitros/ats-analyzer.git`.
- Removida dependencia invalida/nao usada `@radix-ui/react-badge`.
- Adicionada configuracao ESLint em `.eslintrc.json`.
- Corrigida rota `src/app/api/parse-file/route.ts` para App Router.
- Trocadas fontes `Geist` por fontes compativeis com Next 14.2.x.
- Atualizado Next.js para `14.2.35`.
- Adicionado `package-lock.json` para builds reproduziveis.
- Adicionado suporte a `ANTHROPIC_MODEL` no `.env.local.example`.
- Adicionada validacao mais forte da resposta da IA.
- Adicionado limite de 30.000 caracteres para analise de CV.
- Adicionado limite de 5 MB para upload de arquivo.
- Melhorada validacao de arquivos PDF, DOCX e TXT.
- Adicionado erro claro quando `ANTHROPIC_API_KEY` nao esta configurada.
- Reforcado prompt para reduzir risco de instrucoes maliciosas dentro do CV ou vaga.

## Melhorias Prioritarias

- Adicionar testes unitarios para validacao de `ATSResult`.
- Adicionar testes de integracao para `/api/parse-file` e `/api/analyze`.
- Criar schema compartilhado de validacao com `zod` ou biblioteca equivalente.
- Melhorar mensagens de erro na interface para diferenciar erro de chave, erro de arquivo e erro da IA.
- Adicionar estado visual de arquivo carregado com tamanho e botao para limpar.
- Adicionar limite visual de caracteres no textarea do curriculo.
- Permitir colar descricao completa da vaga, nao apenas nome da vaga.
- Salvar historico local das ultimas analises no navegador.
- Adicionar exportacao do resultado em PDF ou Markdown.
- Criar pagina de configuracoes para modelo, idioma e nivel de detalhamento.

## Ideias De Produto

- Comparar CV contra uma vaga completa e mostrar match percentual por requisito.
- Gerar versao otimizada do resumo profissional.
- Gerar bullets de experiencia usando formula impacto + acao + metrica.
- Sugerir palavras-chave por area, senioridade e tecnologia.
- Criar modo "LinkedIn" com headline, about, destaque e competencias.
- Criar modo "ATS rapido" com diagnostico em menos secoes.
- Criar modo "recrutador" com leitura critica mais direta.
- Mostrar antes/depois das melhorias sugeridas.
- Adicionar score por secao: contato, resumo, experiencia, educacao, habilidades e projetos.
- Permitir upload de varias versoes do CV para comparar qual performa melhor.

## Melhorias Tecnicas

- Separar validadores em `src/lib/validators.ts`.
- Separar construcao de prompt em `src/lib/prompts.ts`.
- Adicionar rate limiting simples nas rotas de API.
- Adicionar logs estruturados server-side sem expor dados sensiveis do curriculo.
- Adicionar timeout controlado na chamada da Anthropic.
- Truncar ou resumir curriculos muito longos antes de chamar a IA.
- Migrar para streaming ou fila se a analise ficar lenta.
- Criar testes com arquivos fixture PDF, DOCX e TXT.
- Adicionar GitHub Actions para `npm ci`, `npm run lint` e `npm run build`.
- Revisar dependencias Radix atualmente nao usadas e remover o que sobrar.

## Cuidados

- Nunca commitar `.env.local` ou chave real da Anthropic.
- Evitar salvar curriculos enviados sem consentimento explicito.
- Nao logar conteudo completo de CV em producao.
- Validar sempre qualquer JSON retornado pela IA antes de usar na UI.
- Manter uploads com limite de tamanho para evitar consumo excessivo de memoria.
