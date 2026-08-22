import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from '../DynamicIcon';
import { MenuBadge } from './MenuBadge';
import { MenuProps, resolveLabel } from './shared';
import { getTheme } from '../../lib/themes';

export const DockMenu: React.FC<MenuProps> = ({
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
        aria-label="iOS dock navigation"
        className="w-full max-w-md mx-auto bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-3xl shadow-[0_16px_40px_rgba(0,0,0,0.2)] p-2.5"
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
                aria-label={showLabels && isActive ? label : undefined}
                className="relative flex flex-col items-center justify-center rounded-2xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500"
              >
                <motion.div
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-2.5 rounded-2xl transition-colors duration-200 ${
                    isActive
                      ? `${theme.activeBg} text-white shadow-md ${theme.glowSoft}`
                      : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                  }`}
                >
                  <DynamicIcon name={item.icon} className="w-5 h-5" strokeWidth={isActive ? 2.3 : 1.8} />

                  {item.badge !== undefined && (
                    <MenuBadge
                      badge={item.badge}
                      className="-top-1.5 -end-1.5 py-0.5 bg-rose-500 text-white shadow-sm border border-white dark:border-slate-900 text-[9px]"
                    />
                  )}
                </motion.div>

                {isActive && (
                  <motion.div
                    layoutId="dock-dot"
                    className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-white mt-1"
                  />
                )}

                {showLabels && !isActive && (
                  <span className="text-[9px] mt-0.5 text-slate-400 font-medium">
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
