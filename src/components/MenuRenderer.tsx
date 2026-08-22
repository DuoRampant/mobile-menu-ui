import React from 'react';
import { MenuStyleId, MenuItemConfig, ThemeColor } from '../types/menu';
import { MinimalMenu } from './MenuStyles/MinimalMenu';
import { GlassmorphismMenu } from './MenuStyles/GlassmorphismMenu';
import { FloatingMenu } from './MenuStyles/FloatingMenu';
import { NeumorphismMenu } from './MenuStyles/NeumorphismMenu';
import { PillMenu } from './MenuStyles/PillMenu';
import { CenterFabMenu } from './MenuStyles/CenterFabMenu';
import { GradientMenu } from './MenuStyles/GradientMenu';
import { OutlineMenu } from './MenuStyles/OutlineMenu';
import { IndicatorMenu } from './MenuStyles/IndicatorMenu';
import { CurvedMenu } from './MenuStyles/CurvedMenu';
import { DockMenu } from './MenuStyles/DockMenu';

interface RenderMenuProps {
  styleId: MenuStyleId;
  items: MenuItemConfig[];
  activeId: string;
  onSelect: (id: string) => void;
  showLabels: boolean;
  themeColor: ThemeColor;
  isRtl?: boolean;
}

export const MenuRenderer: React.FC<RenderMenuProps> = (props) => {
  switch (props.styleId) {
    case 'minimal':
      return <MinimalMenu {...props} />;
    case 'glassmorphic':
      return <GlassmorphismMenu {...props} />;
    case 'floating':
      return <FloatingMenu {...props} />;
    case 'neumorphic':
      return <NeumorphismMenu {...props} />;
    case 'pill':
      return <PillMenu {...props} />;
    case 'center-fab':
      return <CenterFabMenu {...props} />;
    case 'gradient':
      return <GradientMenu {...props} />;
    case 'outline':
      return <OutlineMenu {...props} />;
    case 'indicator':
      return <IndicatorMenu {...props} />;
    case 'curved':
      return <CurvedMenu {...props} />;
    case 'dock':
      return <DockMenu {...props} />;
    default:
      return <MinimalMenu {...props} />;
  }
};
