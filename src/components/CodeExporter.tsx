import React, { useState } from 'react';
import { Check, Copy, Code, Terminal, Sparkles } from 'lucide-react';
import { MenuStyleId, MenuItemConfig, ThemeColor, STYLE_METAS } from '../types/menu';

interface CodeExporterProps {
  styleId: MenuStyleId;
  items: MenuItemConfig[];
  showLabels: boolean;
  themeColor: ThemeColor;
  isRtl: boolean;
}

// Literal Tailwind classes per theme so both this build and the consumer's
// build pick them up during JIT content scanning.
const EXPORT_THEME_CLASSES: Record<ThemeColor, { activeBg: string; activeText: string }> = {
  indigo: {
    activeBg: 'bg-indigo-500/10',
    activeText: 'text-indigo-600 dark:text-indigo-400'
  },
  emerald: {
    activeBg: 'bg-emerald-500/10',
    activeText: 'text-emerald-600 dark:text-emerald-400'
  },
  rose: {
    activeBg: 'bg-rose-500/10',
    activeText: 'text-rose-600 dark:text-rose-400'
  },
  amber: {
    activeBg: 'bg-amber-500/10',
    activeText: 'text-amber-600 dark:text-amber-400'
  },
  cyan: {
    activeBg: 'bg-cyan-500/10',
    activeText: 'text-cyan-600 dark:text-cyan-400'
  },
  violet: {
    activeBg: 'bg-violet-500/10',
    activeText: 'text-violet-600 dark:text-violet-400'
  },
  obsidian: {
    activeBg: 'bg-slate-900/10 dark:bg-white/10',
    activeText: 'text-slate-900 dark:text-slate-100'
  }
};

const KNOWN_ICONS = [
  'Bell',
  'Bookmark',
  'Compass',
  'Heart',
  'Home',
  'Layers',
  'MessageSquare',
  'Plus',
  'Search',
  'Settings',
  'ShoppingBag',
  'Sparkles',
  'User',
  'Zap'
];

function collectUsedIcons(items: MenuItemConfig[]): string[] {
  const used = items.map((i) => i.icon).filter((icon) => KNOWN_ICONS.includes(icon));
  return Array.from(new Set(used)).sort();
}

export const CodeExporter: React.FC<CodeExporterProps> = ({
  styleId,
  items,
  showLabels,
  themeColor,
  isRtl
}) => {
  const [copyState, setCopyState] = useState<'copied' | 'error' | null>(null);
  const [codeType, setCodeType] = useState<'react' | 'tailwind'>('react');

  const styleMeta = STYLE_METAS.find((s) => s.id === styleId) || STYLE_METAS[0];
  const themeClasses = EXPORT_THEME_CLASSES[themeColor];

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
    setTimeout(() => setCopyState(null), 2200);
  };

  const getReactCode = () => {
    const itemsJson = JSON.stringify(items, null, 2);
    const usedIcons = collectUsedIcons(items);
    const iconImports = [...usedIcons, 'CircleHelp'].join(', ');
    const iconRecord = [...usedIcons, 'CircleHelp'].join(', ');

    return `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ${iconImports}, type LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  labelFa?: string;
  icon: string;
  badge?: number | string;
  isCenterFab?: boolean;
}

const navItems: MenuItem[] = ${itemsJson};

const ICONS: Record<string, LucideIcon> = { ${iconRecord} };

export const MobileBottomBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('${items[0]?.id || 'home'}');

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 select-none pb-2" dir="${isRtl ? 'rtl' : 'ltr'}">
      <div className="max-w-md mx-auto px-3">
        <div className="flex items-center justify-around bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2">
          {navItems.map((item) => {
            const isActive = item.id === activeTab;
            const IconComponent = ICONS[item.icon] ?? CircleHelp;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex flex-col items-center justify-center p-2 min-w-[50px] rounded-xl transition-all"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 ${themeClasses.activeBg} rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="relative">
                  <IconComponent
                    className={\`w-6 h-6 \${isActive ? '${themeClasses.activeText} scale-110' : 'text-slate-400'}\`}
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />

                  {item.badge !== undefined && (
                    <span className="pointer-events-none absolute -top-1.5 -end-2 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </div>

                ${
                  showLabels
                    ? `<span className={\`text-[10px] mt-1 font-medium \${isActive ? '${themeClasses.activeText} font-bold' : 'text-slate-400'}\`}>\n                  {item.label}\n                </span>`
                    : ''
                }
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomBar;`;
  };

  const getTailwindCode = () => {
    const firstItem = items[0];
    const secondItem = items.find((i) => i.id !== firstItem?.id);

    return `<!-- Tailwind CSS markup for ${styleMeta.title} -->
<div class="fixed bottom-0 inset-x-0 z-50 p-3" dir="${isRtl ? 'rtl' : 'ltr'}">
  <nav class="max-w-md mx-auto flex items-center justify-around bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2">
    <!-- Active item -->
    <button class="relative flex flex-col items-center justify-center min-w-[56px] py-1 rounded-xl ${themeClasses.activeText}"${
      firstItem ? ` aria-current="page"` : ''
    }>
      <svg class="w-6 h-6 stroke-[2.3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
      ${showLabels && firstItem ? `<span class="text-[10px] font-bold mt-1">${isRtl && firstItem.labelFa ? firstItem.labelFa : firstItem.label}</span>` : ''}
    </button>

    <!-- Inactive item -->
    <button class="relative flex flex-col items-center justify-center min-w-[56px] py-1 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
      <svg class="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      ${showLabels && secondItem ? `<span class="text-[10px] font-medium mt-1">${isRtl && secondItem.labelFa ? secondItem.labelFa : secondItem.label}</span>` : ''}
    </button>
  </nav>
</div>`;
  };

  const currentCode = codeType === 'react' ? getReactCode() : getTailwindCode();

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 ms-2">
            MobileBottomBar.tsx • Style #{styleMeta.number} ({styleMeta.title})
          </span>
        </div>

        <button
          onClick={() => handleCopy(currentCode)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          {copyState === 'copied' ? (
            <>
              <Check size={14} />
              <span>{isRtl ? 'کپی شد!' : 'Copied!'}</span>
            </>
          ) : copyState === 'error' ? (
            <span>{isRtl ? 'کپی ناموفق بود' : 'Copy failed'}</span>
          ) : (
            <>
              <Copy size={14} />
              <span>{isRtl ? 'کپی کد کامل' : 'Copy code'}</span>
            </>
          )}
        </button>
      </div>

      {/* Code Type Switcher */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800/80 text-xs">
        <button
          onClick={() => setCodeType('react')}
          aria-pressed={codeType === 'react'}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
            codeType === 'react'
              ? 'bg-slate-800 text-indigo-400 font-bold border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Code size={13} />
          <span>React + TS + Framer Motion</span>
        </button>

        <button
          onClick={() => setCodeType('tailwind')}
          aria-pressed={codeType === 'tailwind'}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
            codeType === 'tailwind'
              ? 'bg-slate-800 text-indigo-400 font-bold border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Terminal size={13} />
          <span>Tailwind HTML</span>
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 font-mono text-xs overflow-x-auto max-h-[380px] bg-slate-950 text-indigo-100/90 leading-relaxed select-text">
        <pre>{currentCode}</pre>
      </div>

      {/* Code Footer */}
      <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5">
          <Sparkles size={13} className="text-indigo-400 shrink-0" />
          {isRtl
            ? 'سازگار با React 18/19، Next.js، Vite و Tailwind CSS نسخه ۳.۳ به بالا'
            : 'Compatible with React 18/19, Next.js, Vite & Tailwind CSS v3.3+'}
        </span>
        <span className="font-mono text-slate-500 shrink-0">{items.length} tabs</span>
      </div>
    </div>
  );
};
