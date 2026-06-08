'use client'

import { useCallback, useRef, useState } from 'react'
import { Upload, FileText, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadZoneProps {
  onTextExtracted: (text: string) => void
}

export function UploadZone({ onTextExtracted }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(
    async (file: File) => {
      setError(null)
      setIsLoading(true)
      setFileName(file.name)

      try {
        const form = new FormData()
        form.append('file', file)

        const res = await fetch('/api/parse-file', { method: 'POST', body: form })
        const data = await res.json()

        if (!res.ok || data.error) {
          setError(data.error || 'Erro ao processar arquivo.')
          setFileName(null)
          return
        }

        onTextExtracted(data.text)
      } catch {
        setError('Erro de rede. Tente novamente.')
        setFileName(null)
      } finally {
        setIsLoading(false)
      }
    },
    [onTextExtracted]
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  return (
    <div>
      <div
        className={cn(
          'relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200',
          isDragging
            ? 'border-zinc-500 bg-zinc-50'
            : 'border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50/50',
          isLoading && 'pointer-events-none opacity-60'
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) processFile(file)
          }}
        />

        {isLoading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
            <p className="text-sm text-zinc-500">Extraindo texto do arquivo...</p>
          </div>
        ) : fileName ? (
          <div className="flex flex-col items-center gap-2">
            <FileText className="w-8 h-8 text-emerald-500" />
            <p className="text-sm font-medium text-zinc-700">{fileName}</p>
            <p className="text-xs text-zinc-400">Clique para trocar o arquivo</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-zinc-300" />
            <p className="text-sm text-zinc-500">
              Arraste seu currículo aqui ou{' '}
              <span className="text-zinc-700 font-medium underline underline-offset-2">clique para selecionar</span>
            </p>
            <p className="text-xs text-zinc-400">PDF, DOCX ou TXT</p>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}
