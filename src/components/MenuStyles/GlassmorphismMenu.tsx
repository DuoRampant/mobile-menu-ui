import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from '../DynamicIcon';
import { MenuBadge } from './MenuBadge';
import { MenuProps, resolveLabel } from './shared';
import { getTheme } from '../../lib/themes';

export const GlassmorphismMenu: React.FC<MenuProps> = ({
  items,
  activeId,
  onSelect,
  showLabels,
  themeColor,
  isRtl
}) => {
  const theme = getTheme(themeColor);

  return (
    <div className="w-full px-3 pb-3 pt-1 select-none" dir={isRtl ? 'rtl' : 'ltr'}>
      <nav
        aria-label="Glassmorphism bottom navigation"
        className="w-full max-w-lg mx-auto bg-white/30 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] px-2 py-2.5"
      >
        <div className="flex items-center justify-around">
          {items.map((item) => {
            const isActive = item.id === activeId;
            const label = resolveLabel(item, isRtl);

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex flex-col items-center justify-center min-w-[56px] py-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {isActive && (
                  <motion.div
                    layoutId="glass-glow"
                    className="absolute inset-0 rounded-xl bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/20 shadow-sm"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                <div className="relative z-10">
                  <DynamicIcon
                    name={item.icon}
                    className={`w-6 h-6 transition-all duration-200 ${
                      isActive
                        ? `${theme.text} scale-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]`
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />

                  {item.badge !== undefined && (
                    <MenuBadge
                      badge={item.badge}
                      className={`-top-2 -end-2 py-0.5 shadow-md ${theme.badge}`}
                    />
                  )}
                </div>

                {showLabels && (
                  <span
                    className={`relative z-10 text-[11px] mt-1 font-medium transition-colors duration-200 ${
                      isActive
                        ? `${theme.text} font-bold`
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
