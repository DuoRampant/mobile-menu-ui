import {
  Bell,
  Bookmark,
  CircleHelp,
  Compass,
  Heart,
  Home,
  Layers,
  MessageSquare,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  User,
  Zap,
  type LucideIcon
} from 'lucide-react';
import React from 'react';

const ICONS = {
  Bell,
  Bookmark,
  CircleHelp,
  Compass,
  Heart,
  Home,
  Layers,
  MessageSquare,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  User,
  Zap
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  className = 'w-6 h-6',
  size,
  strokeWidth = 2
}) => {
  const IconComponent = ICONS[name as IconName] ?? CircleHelp;
  return <IconComponent className={className} size={size} strokeWidth={strokeWidth} />;
};
