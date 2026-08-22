import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from '../DynamicIcon';
import { MenuBadge } from './MenuBadge';
import { MenuProps, resolveLabel } from './shared';
import { getTheme } from '../../lib/themes';

export const FloatingMenu: React.FC<MenuProps> = ({
  items,
  activeId,
  onSelect,
  showLabels,
  themeColor,
  isRtl
}) => {
  const theme = getTheme(themeColor);

  return (
    <div className="w-full px-4 pb-4 select-none" dir={isRtl ? 'rtl' : 'ltr'}>
      <nav
        aria-label="Floating detached navigation"
        className="w-full max-w-md mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-slate-200/90 dark:border-slate-800 rounded-full shadow-[0_12px_30px_-8px_rgba(0,0,0,0.25)] px-3 py-2"
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
                className="relative flex flex-col items-center justify-center min-w-[50px] py-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500"
              >
                {isActive && (
                  <motion.div
                    layoutId="floating-pill-bg"
                    className={`absolute inset-0 rounded-full ${theme.activeBg} opacity-15 dark:opacity-25`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="relative">
                  <DynamicIcon
                    name={item.icon}
                    className={`w-6 h-6 transition-all duration-200 ${
                      isActive
                        ? `${theme.text} scale-110`
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />

                  {item.badge !== undefined && (
                    <MenuBadge
                      badge={item.badge}
                      className={`-top-1.5 -end-2 py-0.5 shadow-xs ${theme.badge}`}
                    />
                  )}
                </div>

                {showLabels && (
                  <span
                    className={`text-[10px] mt-0.5 font-medium transition-colors duration-200 ${
                      isActive
                        ? `${theme.text} font-bold`
                        : 'text-slate-400 dark:text-slate-500'
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
