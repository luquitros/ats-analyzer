import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const mime = file.type
    let text = ''

    if (mime === 'application/pdf' || file.name.endsWith('.pdf')) {
      // dynamic import to avoid edge runtime issues
      const pdfParse = (await import('pdf-parse')).default
      const data = await pdfParse(buffer)
      text = data.text
    } else if (
      mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.docx')
    ) {
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else if (mime === 'text/plain' || file.name.endsWith('.txt')) {
      text = buffer.toString('utf-8')
    } else {
      return NextResponse.json(
        { error: 'Formato não suportado. Use PDF, DOCX ou TXT.' },
        { status: 415 }
      )
    }

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: 'Não foi possível extrair texto do arquivo. Tente colar o conteúdo manualmente.' },
        { status: 422 }
      )
    }

    return NextResponse.json({ text: text.trim() })
  } catch (err) {
    console.error('[parse-file] error:', err)
    return NextResponse.json({ error: 'Erro ao processar arquivo.' }, { status: 500 })
  }
}
