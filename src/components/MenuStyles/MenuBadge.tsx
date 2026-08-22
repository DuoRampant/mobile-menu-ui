import React from 'react';

interface MenuBadgeProps {
  badge: number | string;
  className: string;
}

export const MenuBadge: React.FC<MenuBadgeProps> = ({ badge, className }) => (
  <span className={`pointer-events-none absolute px-1.5 text-[10px] rounded-full font-bold ${className}`}>
    {badge}
  </span>
);
