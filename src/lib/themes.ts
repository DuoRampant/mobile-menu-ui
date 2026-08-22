import { ThemeColor } from '../types/menu';

export interface ThemeTokens {
  activeBg: string;
  text: string;
  border: string;
  glow: string;
  glowSoft: string;
  badge: string;
  hex: string;
}

export const COLOR_THEMES: Record<ThemeColor, ThemeTokens> = {
  indigo: {
    activeBg: 'bg-indigo-600',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-500',
    glow: 'shadow-indigo-500/40',
    glowSoft: 'shadow-indigo-500/20',
    badge: 'bg-indigo-500 text-white',
    hex: '#6366f1'
  },
  emerald: {
    activeBg: 'bg-emerald-600',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500',
    glow: 'shadow-emerald-500/40',
    glowSoft: 'shadow-emerald-500/20',
    badge: 'bg-emerald-500 text-white',
    hex: '#10b981'
  },
  rose: {
    activeBg: 'bg-rose-600',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-500',
    glow: 'shadow-rose-500/40',
    glowSoft: 'shadow-rose-500/20',
    badge: 'bg-rose-500 text-white',
    hex: '#f43f5e'
  },
  amber: {
    activeBg: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500',
    glow: 'shadow-amber-500/40',
    glowSoft: 'shadow-amber-500/20',
    badge: 'bg-amber-500 text-slate-950 font-bold',
    hex: '#f59e0b'
  },
  cyan: {
    activeBg: 'bg-cyan-500',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-500',
    glow: 'shadow-cyan-500/40',
    glowSoft: 'shadow-cyan-500/20',
    badge: 'bg-cyan-500 text-slate-950 font-bold',
    hex: '#06b6d4'
  },
  violet: {
    activeBg: 'bg-violet-600',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-500',
    glow: 'shadow-violet-500/40',
    glowSoft: 'shadow-violet-500/20',
    badge: 'bg-violet-500 text-white',
    hex: '#8b5cf6'
  },
  obsidian: {
    activeBg: 'bg-slate-900 dark:bg-white dark:text-slate-950',
    text: 'text-slate-900 dark:text-slate-100',
    border: 'border-slate-800 dark:border-slate-200',
    glow: 'shadow-slate-900/30 dark:shadow-white/20',
    glowSoft: 'shadow-slate-900/15 dark:shadow-white/10',
    badge: 'bg-rose-500 text-white',
    hex: '#0f172a'
  }
};

export function getTheme(color: ThemeColor | undefined): ThemeTokens {
  return (color && COLOR_THEMES[color]) || COLOR_THEMES.indigo;
}
