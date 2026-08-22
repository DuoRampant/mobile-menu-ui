import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from '../DynamicIcon';
import { MenuBadge } from './MenuBadge';
import { MenuProps, resolveLabel } from './shared';
import { getTheme } from '../../lib/themes';

export const MinimalMenu: React.FC<MenuProps> = ({
  items,
  activeId,
  onSelect,
  showLabels,
  themeColor,
  isRtl
}) => {
  const theme = getTheme(themeColor);

  return (
    <nav
      aria-label="Minimal bottom navigation"
      className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-3 py-2 select-none"
      dir={isRtl ? 'rtl' : 'ltr'}
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
              className="relative flex flex-col items-center justify-center min-w-[56px] py-1 rounded-xl transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500"
            >
              {isActive && (
                <motion.div
                  layoutId="minimal-active-indicator"
                  className={`absolute -top-2 w-8 h-[3px] rounded-full ${theme.activeBg}`}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative">
                <DynamicIcon
                  name={item.icon}
                  className={`w-6 h-6 transition-all duration-200 ${
                    isActive
                      ? `${theme.text} scale-110`
                      : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
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
                  className={`text-[11px] mt-1 font-medium transition-colors duration-200 ${
                    isActive
                      ? `${theme.text} font-semibold`
                      : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
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
  );
};
