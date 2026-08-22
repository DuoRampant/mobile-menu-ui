import { MenuItemConfig, ThemeColor } from '../../types/menu';
import type { IconName } from '../DynamicIcon';

export const AVAILABLE_ICONS: IconName[] = [
  'Home',
  'Compass',
  'Search',
  'Plus',
  'Bookmark',
  'User',
  'Heart',
  'Bell',
  'ShoppingBag',
  'Settings',
  'MessageSquare',
  'Layers',
  'Zap',
  'Sparkles'
];

export interface MenuProps {
  items: MenuItemConfig[];
  activeId: string;
  onSelect: (id: string) => void;
  showLabels: boolean;
  themeColor: ThemeColor;
  isRtl?: boolean;
}

export function resolveLabel(item: MenuItemConfig, isRtl?: boolean): string {
  return isRtl && item.labelFa ? item.labelFa : item.label;
}
