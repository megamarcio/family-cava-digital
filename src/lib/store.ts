// Estado leve do funil persistido em localStorage (sem backend).
import type { Goal } from '../data/peptides'

const KEY = 'pep_funnel_v1'

export interface FunnelState {
  goal?: Goal
  goals?: Goal[]
  email?: string
  nome?: string
  whatsapp?: string
  bump?: boolean
  upsell?: boolean
  paid?: boolean
  paidSomnia?: boolean
  product?: 'peptides' | 'somnia' | 'nidra' | 'lumen' | 'bundle' | 'club'
  unlocked?: Record<string, boolean>
}

export function loadFunnel(): FunnelState {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

export function saveFunnel(patch: Partial<FunnelState>) {
  const next = { ...loadFunnel(), ...patch }
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

// Checklist do admin
const TASKS_KEY = 'pep_tasks_v1'
export function loadDoneTasks(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(TASKS_KEY) || '{}')
  } catch {
    return {}
  }
}
export function toggleTask(id: string): Record<string, boolean> {
  const cur = loadDoneTasks()
  cur[id] = !cur[id]
  localStorage.setItem(TASKS_KEY, JSON.stringify(cur))
  return cur
}

// Config de pagamento/vídeo do admin
const CONFIG_KEY = 'pep_config_v1'
export interface Supplier {
  nome: string
  pais: 'BR' | 'US'
  contato: string
  obs?: string
}

export interface AdminConfig {
  globalpayKey?: string
  noxpayKey?: string
  vslUrl?: string
  quizVideoUrl?: string
  oniraVideoUrl?: string
  manipulacaoVideoUrl?: string
  pixKey?: string
  whatsapp?: string
  suppliers?: Supplier[]
}
export function loadConfig(): AdminConfig {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}')
  } catch {
    return {}
  }
}
export function saveConfig(patch: Partial<AdminConfig>): AdminConfig {
  const next = { ...loadConfig(), ...patch }
  localStorage.setItem(CONFIG_KEY, JSON.stringify(next))
  return next
}
