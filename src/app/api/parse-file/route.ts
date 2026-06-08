import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const SUPPORTED_EXTENSIONS = ['.pdf', '.docx', '.txt']

function getExtension(fileName: string): string {
  const lowerName = fileName.toLowerCase()
  return SUPPORTED_EXTENSIONS.find((extension) => lowerName.endsWith(extension)) || ''
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Envie um PDF, DOCX ou TXT de ate 5 MB.' },
        { status: 413 }
      )
    }

    const extension = getExtension(file.name)

    if (!extension) {
      return NextResponse.json(
        { error: 'Formato nao suportado. Use PDF, DOCX ou TXT.' },
        { status: 415 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const mime = file.type
    let text = ''

    if (mime === 'application/pdf' || extension === '.pdf') {
      const pdfParse = (await import('pdf-parse')).default
      const data = await pdfParse(buffer)
      text = data.text
    } else if (
      mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      extension === '.docx'
    ) {
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else if (mime === 'text/plain' || extension === '.txt') {
      text = buffer.toString('utf-8')
    }

    const cleanText = text.trim()

    if (cleanText.length < 50) {
      return NextResponse.json(
        { error: 'Nao foi possivel extrair texto do arquivo. Tente colar o conteudo manualmente.' },
        { status: 422 }
      )
    }

    return NextResponse.json({ text: cleanText })
  } catch (err) {
    console.error('[parse-file] error:', err)
    return NextResponse.json({ error: 'Erro ao processar arquivo.' }, { status: 500 })
  }
}
