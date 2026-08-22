import React from 'react';
import { Plus, Trash2, Sliders, RotateCcw } from 'lucide-react';
import { MenuItemConfig, MenuStyleId, ThemeColor, STYLE_METAS, DEFAULT_MENU_ITEMS } from '../types/menu';
import { AVAILABLE_ICONS } from './MenuStyles/shared';
import { COLOR_THEMES } from '../lib/themes';

interface MenuCustomizerProps {
  styleId: MenuStyleId;
  setStyleId: (id: MenuStyleId) => void;
  items: MenuItemConfig[];
  setItems: React.Dispatch<React.SetStateAction<MenuItemConfig[]>>;
  showLabels: boolean;
  setShowLabels: (show: boolean) => void;
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  isRtl: boolean;
  setIsRtl: (rtl: boolean) => void;
}

type EditableField = 'icon' | 'label' | 'labelFa' | 'badge';

export const MenuCustomizer: React.FC<MenuCustomizerProps> = ({
  styleId,
  setStyleId,
  items,
  setItems,
  showLabels,
  setShowLabels,
  themeColor,
  setThemeColor,
  isRtl,
  setIsRtl
}) => {
  const handleItemChange = (index: number, field: EditableField, value: string | undefined) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 3) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    if (items.length >= 6) return;
    const newId = `item-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      { id: newId, label: 'New Tab', labelFa: 'زبانه جدید', icon: 'Sparkles', badge: undefined }
    ]);
  };

  const handleReset = () => {
    setItems(DEFAULT_MENU_ITEMS);
    setStyleId('minimal');
    setThemeColor('indigo');
    setShowLabels(true);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-lg space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {isRtl ? 'سفارشی‌سازی منو و تنظیمات' : 'Menu Customizer & Settings'}
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          title={isRtl ? 'بازنشانی به پیش‌فرض' : 'Reset to defaults'}
        >
          <RotateCcw size={13} />
          <span>{isRtl ? 'بازنشانی' : 'Reset'}</span>
        </button>
      </div>

      {/* Style Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          {isRtl ? 'انتخاب استایل منو (۱۱ مدل):' : 'Select menu style (11 styles):'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {STYLE_METAS.map((style) => {
            const isSelected = style.id === styleId;
            return (
              <button
                key={style.id}
                onClick={() => setStyleId(style.id)}
                aria-pressed={isSelected}
                className={`flex flex-col items-start p-2.5 rounded-xl border text-start transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 shadow-xs font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full text-[10px] text-slate-400 font-mono">
                  <span>{style.number}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                </div>
                <span className="text-xs mt-0.5 truncate w-full font-semibold">
                  {isRtl ? style.titleFa : style.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Theme Color Picker */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          {isRtl ? 'رنگ اصلی و هایلایت:' : 'Accent color theme:'}
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          {(Object.keys(COLOR_THEMES) as ThemeColor[]).map((col) => {
            const themeInfo = COLOR_THEMES[col];
            const isSelected = themeColor === col;
            return (
              <button
                key={col}
                onClick={() => setThemeColor(col)}
                aria-pressed={isSelected}
                aria-label={`Theme color: ${col}`}
                style={{ backgroundColor: themeInfo.hex }}
                className={`w-8 h-8 rounded-full transition-transform flex items-center justify-center text-white font-bold shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 ${
                  isSelected ? 'ring-4 ring-indigo-300 dark:ring-indigo-700 scale-110' : 'opacity-80 hover:opacity-100'
                }`}
                title={col}
              >
                {isSelected && '✓'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
            {isRtl ? 'نمایش عنوان‌ها (Labels)' : 'Show labels'}
          </span>
          <input
            type="checkbox"
            checked={showLabels}
            onChange={(e) => setShowLabels(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
          />
        </label>

        <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
            {isRtl ? 'جهت راست‌چین (RTL)' : 'RTL layout'}
          </span>
          <input
            type="checkbox"
            checked={isRtl}
            onChange={(e) => setIsRtl(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
          />
        </label>
      </div>

      {/* Menu Items Editor */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {isRtl ? 'مدیریت زبانه‌ها و آیکون‌ها:' : 'Manage tabs & badges:'}
          </label>
          <span className="text-[11px] text-slate-400">
            {items.length}/6 {isRtl ? 'آیتم' : 'tabs'}
          </span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pe-1">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50"
            >
              <select
                value={item.icon}
                onChange={(e) => handleItemChange(idx, 'icon', e.target.value)}
                aria-label={`Icon for tab ${idx + 1}`}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs p-1.5 font-mono text-slate-800 dark:text-slate-200"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder={isRtl ? 'عنوان فارسی' : 'Label'}
                aria-label={`Label for tab ${idx + 1}`}
                value={isRtl ? item.labelFa || item.label : item.label}
                onChange={(e) =>
                  handleItemChange(idx, isRtl ? 'labelFa' : 'label', e.target.value)
                }
                className="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs p-1.5 text-slate-800 dark:text-slate-200"
              />

              <input
                type="text"
                placeholder={isRtl ? 'نشان' : 'Badge'}
                aria-label={`Badge for tab ${idx + 1}`}
                value={item.badge !== undefined ? String(item.badge) : ''}
                onChange={(e) =>
                  handleItemChange(idx, 'badge', e.target.value || undefined)
                }
                className="w-16 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs p-1.5 text-center text-slate-800 dark:text-slate-200"
              />

              <button
                onClick={() => handleRemoveItem(idx)}
                disabled={items.length <= 3}
                aria-label={`Remove tab ${idx + 1}`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 disabled:opacity-30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                title="Remove tab"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        {items.length < 6 && (
          <button
            onClick={handleAddItem}
            className="w-full py-2 border border-dashed border-indigo-300 dark:border-indigo-800 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <Plus size={15} />
            <span>{isRtl ? 'افزودن زبانه جدید' : 'Add new tab'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
