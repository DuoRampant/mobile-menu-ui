import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from '../DynamicIcon';
import { MenuBadge } from './MenuBadge';
import { MenuProps, resolveLabel } from './shared';
import { getTheme } from '../../lib/themes';

export const CenterFabMenu: React.FC<MenuProps> = ({
  items,
  activeId,
  onSelect,
  showLabels,
  themeColor,
  isRtl
}) => {
  const theme = getTheme(themeColor);

  return (
    <div className="relative w-full select-none" dir={isRtl ? 'rtl' : 'ltr'}>
      <nav
        aria-label="Center FAB navigation"
        className="w-full bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 px-3 py-2 pt-3"
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {items.map((item) => {
            const isActive = item.id === activeId;
            const label = resolveLabel(item, isRtl);

            if (item.isCenterFab) {
              return (
                <div key={item.id} className="relative flex justify-center -mt-8">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onSelect(item.id)}
                    aria-label={label}
                    className={`relative z-20 flex items-center justify-center w-14 h-14 rounded-full ${theme.activeBg} text-white shadow-xl ${theme.glow} border-4 border-slate-50 dark:border-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-950`}
                  >
                    <DynamicIcon name={item.icon || 'Plus'} className="w-7 h-7" strokeWidth={2.5} />
                  </motion.button>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex flex-col items-center justify-center min-w-[50px] py-1 rounded-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500"
              >
                <div className="relative">
                  <DynamicIcon
                    name={item.icon}
                    className={`w-6 h-6 transition-all duration-200 ${
                      isActive
                        ? `${theme.text} scale-110`
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
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
                    className={`text-[10px] mt-1 font-medium transition-colors duration-200 ${
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
