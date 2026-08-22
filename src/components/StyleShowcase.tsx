import React from 'react';
import { MenuItemConfig, MenuStyleId, ThemeColor, STYLE_METAS } from '../types/menu';
import { MenuRenderer } from './MenuRenderer';
import { Eye, Sparkles } from 'lucide-react';

interface StyleShowcaseProps {
  items: MenuItemConfig[];
  showLabels: boolean;
  themeColor: ThemeColor;
  isRtl: boolean;
  activeStyleId: MenuStyleId;
  onSelectStyle: (styleId: MenuStyleId) => void;
}

export const StyleShowcase: React.FC<StyleShowcaseProps> = ({
  items,
  showLabels,
  themeColor,
  isRtl,
  activeStyleId,
  onSelectStyle
}) => {
  const handleKeyDown = (event: React.KeyboardEvent, styleId: MenuStyleId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectStyle(styleId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>{isRtl ? 'نمایش همزمان تمام ۱۱ مدل منو' : 'All 11 menu styles'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {isRtl
              ? 'روی هر کدام کلیک کنید تا در شبیه‌ساز گوشی و بخش استخراج کد قرار گیرد'
              : 'Click any style card to test it in the phone simulator & inspect its code.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {STYLE_METAS.map((style) => {
          const isSelected = style.id === activeStyleId;

          return (
            <div
              key={style.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`${isRtl ? 'انتخاب استایل' : 'Select style'}: ${isRtl ? style.titleFa : style.title}`}
              onClick={() => onSelectStyle(style.id)}
              onKeyDown={(e) => handleKeyDown(e, style.id)}
              className={`group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-500/30 bg-indigo-50/30 dark:bg-indigo-950/30 shadow-lg scale-[1.02]'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 hover:shadow-md'
              }`}
            >
              {/* Header Badge */}
              <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {style.number}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {isRtl ? style.titleFa : style.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {isRtl ? style.subtitleFa : style.subtitle}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {style.tag}
                </span>
              </div>

              {/* Menu Visual Container */}
              <div className="p-4 py-6 bg-slate-100/80 dark:bg-slate-950/80 flex items-center justify-center min-h-[110px]">
                <div className="w-full max-w-sm pointer-events-none">
                  <MenuRenderer
                    styleId={style.id}
                    items={items}
                    activeId="home"
                    onSelect={() => {}}
                    showLabels={showLabels}
                    themeColor={themeColor}
                    isRtl={isRtl}
                  />
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3 bg-white dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] truncate max-w-[200px]">
                  {isRtl ? style.descriptionFa : style.description}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold group-hover:underline flex items-center gap-1 shrink-0">
                  <Eye size={13} />
                  <span>{isRtl ? 'انتخاب' : 'Select'}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
