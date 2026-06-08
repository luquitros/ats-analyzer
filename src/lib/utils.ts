import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getScoreColor(score: number): {
  bg: string
  text: string
  bar: string
  border: string
} {
  if (score >= 75) {
    return {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      bar: 'bg-emerald-500',
      border: 'border-emerald-200',
    }
  }
  if (score >= 50) {
    return {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      bar: 'bg-amber-500',
      border: 'border-amber-200',
    }
  }
  return {
    bg: 'bg-red-50',
    text: 'text-red-700',
    bar: 'bg-red-500',
    border: 'border-red-200',
  }
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excelente compatibilidade ATS'
  if (score >= 65) return 'Boa compatibilidade — ajustes pontuais'
  if (score >= 45) return 'Compatibilidade moderada — melhorias necessárias'
  return 'Baixa compatibilidade — revisão completa recomendada'
}

export const METRIC_LABELS: Record<string, string> = {
  palavras_chave: 'Palavras-chave',
  formatacao: 'Formatação',
  experiencia: 'Experiência',
  linkedin_fit: 'LinkedIn Fit',
}
