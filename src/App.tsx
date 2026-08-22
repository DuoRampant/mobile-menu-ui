import { useState, useEffect } from 'react';
import { Smartphone, Code, Layers, Sparkles, Moon, Sun, Globe, Save, Check, AlertCircle } from 'lucide-react';
import { MenuStyleId, MenuItemConfig, ThemeColor, DEFAULT_MENU_ITEMS, MenuPreset } from './types/menu';
import { PhoneSimulator } from './components/PhoneSimulator';
import { MenuCustomizer } from './components/MenuCustomizer';
import { CodeExporter } from './components/CodeExporter';
import { StyleShowcase } from './components/StyleShowcase';
import { PresetLibrary } from './components/PresetLibrary';
import { DesignTips } from './components/DesignTips';

type SaveStatus = 'saving' | 'saved' | 'error';

export function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'grid' | 'presets' | 'code'>('editor');
  const [styleId, setStyleId] = useState<MenuStyleId>('minimal');
  const [items, setItems] = useState<MenuItemConfig[]>(DEFAULT_MENU_ITEMS);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [themeColor, setThemeColor] = useState<ThemeColor>('indigo');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isRtl, setIsRtl] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus | null>(null);

  // Sync HTML dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSaveToDb = async () => {
    if (!items.length) return;

    try {
      setSaveStatus('saving');
      const res = await fetch('/api/menu-presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Custom ${styleId.toUpperCase()} Menu`,
          description: `User configured mobile navigation with ${items.length} tabs.`,
          style_id: styleId,
          theme_color: themeColor,
          is_dark: isDarkMode,
          is_rtl: isRtl,
          show_labels: showLabels,
          items,
          is_official: false
        })
      });

      if (res.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(null), 2500);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      console.error('Save error:', err);
      setSaveStatus('error');
    }
  };

  const handleLoadPreset = (preset: MenuPreset) => {
    setStyleId(preset.style_id);
    setThemeColor(preset.theme_color || 'indigo');
    setIsDarkMode(preset.is_dark);
    setIsRtl(preset.is_rtl);
    setShowLabels(preset.show_labels);
    if (Array.isArray(preset.items) && preset.items.length > 0) {
      setItems(preset.items);
    }
    setActiveTab('editor');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 antialiased" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-500/20">
              M
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-black tracking-tight leading-none text-slate-900 dark:text-white truncate">
                {isRtl ? 'سیستم جامع طراحی منوهای پایینی موبایل' : 'Mobile Bottom Menu UI System'}
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                {isRtl
                  ? '۱۱ استایل منوی کامل آمادۀ کپی و استفاده مستقیم در پروژه‌ها'
                  : '11 production-ready React & Tailwind bottom bars for your projects'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Language RTL Toggle */}
            <button
              onClick={() => setIsRtl(!isRtl)}
              aria-label={isRtl ? 'تغییر به چپ‌چین' : 'Switch to RTL layout'}
              title={isRtl ? 'Toggle RTL / LTR' : 'Toggle LTR / RTL'}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <Globe size={16} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? 'فعال‌سازی حالت روشن' : 'Enable dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Save Config to DB */}
            <button
              onClick={handleSaveToDb}
              disabled={saveStatus === 'saving'}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {saveStatus === 'saved' ? (
                <>
                  <Check size={15} />
                  <span>{isRtl ? 'ذخیره شد!' : 'Saved!'}</span>
                </>
              ) : (
                <>
                  <Save size={15} />
                  <span>{isRtl ? 'ذخیره در دیتابیس' : 'Save config'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Save Error Banner */}
        {saveStatus === 'error' && (
          <div role="alert" className="max-w-7xl mx-auto mt-2 flex items-center gap-2 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-bold px-3 py-2">
            <AlertCircle size={15} />
            <span>
              {isRtl
                ? 'ذخیره‌سازی ناموفق بود. اتصال خود را بررسی کرده و دوباره تلاش کنید.'
                : 'Saving failed. Check your connection and try again.'}
            </span>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
          {(
            [
              { id: 'editor', icon: Smartphone, label: isRtl ? 'شبیه‌ساز و سفارشی‌سازی' : 'Studio & simulator' },
              { id: 'grid', icon: Layers, label: isRtl ? 'مشاهده تمام ۱۱ استایل' : 'All 11 styles' },
              { id: 'code', icon: Code, label: isRtl ? 'دریافت کد' : 'Code exporter' },
              { id: 'presets', icon: Sparkles, label: isRtl ? 'کتابخانه پیش‌فرض‌ها' : 'Preset library' }
            ] as const
          ).map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? 'page' : undefined}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                activeTab === id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Editor & Phone Simulator */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-6">
              <MenuCustomizer
                styleId={styleId}
                setStyleId={setStyleId}
                items={items}
                setItems={setItems}
                showLabels={showLabels}
                setShowLabels={setShowLabels}
                themeColor={themeColor}
                setThemeColor={setThemeColor}
                isRtl={isRtl}
                setIsRtl={setIsRtl}
              />
            </div>

            <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg min-h-[760px]">
              <PhoneSimulator
                styleId={styleId}
                items={items}
                showLabels={showLabels}
                themeColor={themeColor}
                isRtl={isRtl}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Grid Showcase */}
        {activeTab === 'grid' && (
          <StyleShowcase
            items={items}
            showLabels={showLabels}
            themeColor={themeColor}
            isRtl={isRtl}
            activeStyleId={styleId}
            onSelectStyle={(id) => {
              setStyleId(id);
              setActiveTab('editor');
            }}
          />
        )}

        {/* Tab 3: Code Exporter */}
        {activeTab === 'code' && (
          <CodeExporter
            styleId={styleId}
            items={items}
            showLabels={showLabels}
            themeColor={themeColor}
            isRtl={isRtl}
          />
        )}

        {/* Tab 4: Database Presets */}
        {activeTab === 'presets' && (
          <PresetLibrary onLoadPreset={handleLoadPreset} isRtl={isRtl} />
        )}

        {/* Design Tips Section */}
        <DesignTips isRtl={isRtl} />
      </main>
    </div>
  );
}

export default App;
