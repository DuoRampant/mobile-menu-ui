import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from '../DynamicIcon';
import { MenuBadge } from './MenuBadge';
import { MenuProps, resolveLabel } from './shared';
import { getTheme } from '../../lib/themes';

export const CurvedMenu: React.FC<MenuProps> = ({
  items,
  activeId,
  onSelect,
  showLabels,
  themeColor,
  isRtl
}) => {
  const theme = getTheme(themeColor);

  return (
    <div className="relative w-full pt-4 select-none" dir={isRtl ? 'rtl' : 'ltr'}>
      <nav
        aria-label="Curved background navigation"
        className="w-full bg-slate-900 dark:bg-slate-950 text-white rounded-t-3xl px-3 py-3 shadow-2xl border-t border-slate-800"
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {items.map((item) => {
            const isActive = item.id === activeId;
            const label = resolveLabel(item, isRtl);

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={isActive ? label : undefined}
                className="relative flex flex-col items-center justify-center min-w-[54px] rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {isActive && (
                  <motion.div
                    layoutId="curved-floating-circle"
                    className={`absolute -top-7 w-12 h-12 rounded-full ${theme.activeBg} text-white flex items-center justify-center shadow-lg ${theme.glow} border-4 border-slate-900 dark:border-slate-950`}
                    transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  >
                    <DynamicIcon name={item.icon} className="w-6 h-6" strokeWidth={2.3} />
                  </motion.div>
                )}

                <div className={`relative transition-all duration-200 ${isActive ? 'opacity-0 scale-50' : 'opacity-100'}`}>
                  <DynamicIcon
                    name={item.icon}
                    className="w-6 h-6 text-slate-400 hover:text-white"
                    strokeWidth={1.8}
                  />

                  {!isActive && item.badge !== undefined && (
                    <MenuBadge
                      badge={item.badge}
                      className={`-top-2 -end-2 py-0.5 ${theme.badge}`}
                    />
                  )}
                </div>

                {showLabels && (
                  <span
                    className={`text-[10px] font-medium transition-colors duration-200 ${
                      isActive ? 'text-white font-bold pt-4' : 'text-slate-400'
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
