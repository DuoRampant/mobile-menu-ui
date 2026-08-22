import React from 'react';
import { DynamicIcon } from '../DynamicIcon';
import { MenuBadge } from './MenuBadge';
import { MenuProps, resolveLabel } from './shared';
import { getTheme } from '../../lib/themes';

export const NeumorphismMenu: React.FC<MenuProps> = ({
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
        aria-label="Neumorphism bottom navigation"
        className="w-full max-w-lg mx-auto bg-slate-100 dark:bg-slate-900 rounded-2xl p-2 border border-slate-200/50 dark:border-slate-800 shadow-[8px_8px_16px_#cbd5e1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#070a13,-8px_-8px_16px_#1e293b]"
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
                className={`relative flex flex-col items-center justify-center min-w-[54px] py-2 px-3 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500 ${
                  isActive
                    ? 'shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#070a13,inset_-3px_-3px_6px_#1e293b] bg-slate-100 dark:bg-slate-900'
                    : 'hover:shadow-[3px_3px_6px_#cbd5e1,-3px_-3px_6px_#ffffff] dark:hover:shadow-[3px_3px_6px_#070a13,-3px_-3px_6px_#1e293b]'
                }`}
              >
                <div className="relative">
                  <DynamicIcon
                    name={item.icon}
                    className={`w-6 h-6 transition-all duration-200 ${
                      isActive
                        ? `${theme.text} scale-105`
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />

                  {item.badge !== undefined && (
                    <MenuBadge
                      badge={item.badge}
                      className={`-top-2 -end-2 py-0.5 shadow-xs ${theme.badge}`}
                    />
                  )}
                </div>

                {showLabels && (
                  <span
                    className={`text-[10px] mt-1 font-medium transition-colors duration-200 ${
                      isActive
                        ? `${theme.text} font-bold`
                        : 'text-slate-500 dark:text-slate-400'
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
