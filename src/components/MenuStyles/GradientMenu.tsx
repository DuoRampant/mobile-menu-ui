import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from '../DynamicIcon';
import { MenuBadge } from './MenuBadge';
import { MenuProps, resolveLabel } from './shared';

export const GradientMenu: React.FC<MenuProps> = ({
  items,
  activeId,
  onSelect,
  showLabels,
  isRtl
}) => {
  return (
    <nav
      aria-label="Gradient bold navigation"
      className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 px-3 py-2.5 text-white shadow-lg select-none"
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
              className="relative flex flex-col items-center justify-center min-w-[56px] py-1 rounded-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {isActive && (
                <motion.div
                  layoutId="gradient-active-bg"
                  className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10">
                <DynamicIcon
                  name={item.icon}
                  className={`w-6 h-6 transition-all duration-200 ${
                    isActive
                      ? 'text-white scale-110 drop-shadow-md'
                      : 'text-white/70 group-hover:text-white'
                  }`}
                  strokeWidth={isActive ? 2.3 : 1.8}
                />

                {item.badge !== undefined && (
                  <MenuBadge
                    badge={item.badge}
                    className="-top-2 -end-2 py-0.5 bg-white text-purple-700 shadow-md"
                  />
                )}
              </div>

              {showLabels && (
                <span
                  className={`relative z-10 text-[10px] mt-1 font-medium transition-colors duration-200 ${
                    isActive ? 'text-white font-bold' : 'text-white/70 group-hover:text-white'
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
