import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from '../DynamicIcon';
import { MenuBadge } from './MenuBadge';
import { MenuProps, resolveLabel } from './shared';
import { getTheme } from '../../lib/themes';

export const PillMenu: React.FC<MenuProps> = ({
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
      aria-label="Pill highlight navigation"
      className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-3 py-3 select-none"
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
              className="relative flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:focus-visible:ring-indigo-500"
            >
              <div
                className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? `${theme.activeBg} text-white shadow-md ${theme.glowSoft}`
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <DynamicIcon
                  name={item.icon}
                  className="w-5 h-5"
                  strokeWidth={isActive ? 2.2 : 1.8}
                />

                {isActive && showLabels && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-xs font-semibold whitespace-nowrap overflow-hidden pe-0.5"
                  >
                    {label}
                  </motion.span>
                )}

                {item.badge !== undefined && (
                  <MenuBadge
                    badge={item.badge}
                    className={`-top-1 -end-1 py-0.5 text-[9px] ${
                      isActive ? 'bg-white text-slate-900' : theme.badge
                    }`}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
