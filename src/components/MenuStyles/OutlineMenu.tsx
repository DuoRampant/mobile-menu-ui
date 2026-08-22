import React from 'react';
import { DynamicIcon } from '../DynamicIcon';
import { MenuBadge } from './MenuBadge';
import { MenuProps, resolveLabel } from './shared';
import { getTheme } from '../../lib/themes';

export const OutlineMenu: React.FC<MenuProps> = ({
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
      aria-label="Outline icons navigation"
      className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-3 py-2.5 select-none"
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
              className="relative flex flex-col items-center justify-center min-w-[54px] py-1.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500"
            >
              <div
                className={`relative p-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? `border-2 ${theme.border} bg-slate-50 dark:bg-slate-800/80`
                    : 'border-2 border-transparent'
                }`}
              >
                <DynamicIcon
                  name={item.icon}
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive ? theme.text : 'text-slate-400 dark:text-slate-500'
                  }`}
                  strokeWidth={isActive ? 2.4 : 1.5}
                />

                {item.badge !== undefined && (
                  <MenuBadge
                    badge={item.badge}
                    className={`-top-1 -end-1 py-0.5 text-[9px] ${theme.badge}`}
                  />
                )}
              </div>

              {showLabels && (
                <span
                  className={`text-[10px] mt-0.5 font-medium transition-colors duration-200 ${
                    isActive ? `${theme.text} font-bold` : 'text-slate-400 dark:text-slate-500'
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
