import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Battery, Signal, Sparkles, Heart, ShieldCheck, Smartphone } from 'lucide-react';
import { MenuStyleId, MenuItemConfig, ThemeColor, STYLE_METAS } from '../types/menu';
import { MenuRenderer } from './MenuRenderer';

interface PhoneSimulatorProps {
  styleId: MenuStyleId;
  items: MenuItemConfig[];
  showLabels: boolean;
  themeColor: ThemeColor;
  isRtl: boolean;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  styleId,
  items,
  showLabels,
  themeColor,
  isRtl
}) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [wallpaper, setWallpaper] = useState<'gradient' | 'minimal' | 'dark' | 'glass'>('gradient');

  const styleMeta = STYLE_METAS.find((s) => s.id === styleId) || STYLE_METAS[0];

  const getWallpaperClass = () => {
    switch (wallpaper) {
      case 'gradient':
        return 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900';
      case 'glass':
        return 'bg-gradient-to-tr from-cyan-500 via-teal-600 to-blue-700 dark:from-slate-900 dark:via-slate-950 dark:to-teal-950';
      case 'minimal':
        return 'bg-slate-50 dark:bg-slate-900';
      case 'dark':
        return 'bg-slate-950';
      default:
        return 'bg-slate-50 dark:bg-slate-900';
    }
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Wallpapers Control */}
      <div className="flex items-center gap-2 mb-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm text-xs">
        <span className="text-slate-500 dark:text-slate-400 px-2 font-medium">
          {isRtl ? 'پس‌زمینه:' : 'Wallpaper:'}
        </span>
        <button
          onClick={() => setWallpaper('gradient')}
          className={`px-2.5 py-1 rounded-full transition-all ${
            wallpaper === 'gradient'
              ? 'bg-indigo-600 text-white font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          {isRtl ? 'رنگی' : 'Gradient'}
        </button>
        <button
          onClick={() => setWallpaper('glass')}
          className={`px-2.5 py-1 rounded-full transition-all ${
            wallpaper === 'glass'
              ? 'bg-indigo-600 text-white font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          {isRtl ? 'ماتی' : 'Ocean'}
        </button>
        <button
          onClick={() => setWallpaper('minimal')}
          className={`px-2.5 py-1 rounded-full transition-all ${
            wallpaper === 'minimal'
              ? 'bg-indigo-600 text-white font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          {isRtl ? 'خلوت' : 'Light'}
        </button>
        <button
          onClick={() => setWallpaper('dark')}
          className={`px-2.5 py-1 rounded-full transition-all ${
            wallpaper === 'dark'
              ? 'bg-indigo-600 text-white font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          {isRtl ? 'تاریک' : 'OLED'}
        </button>
      </div>

      {/* Phone Frame */}
      <div className="relative w-[360px] h-[720px] rounded-[48px] bg-slate-900 border-[10px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between transition-all duration-300">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-center z-50 pointer-events-none">
          <div className="w-28 h-5 bg-black rounded-b-2xl flex items-center justify-between px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            <div className="w-2 h-2 rounded-full bg-blue-900/60" />
          </div>
        </div>

        {/* Status Bar */}
        <div className="pt-3 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-800 dark:text-white z-40">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={13} className="rotate-90" />
          </div>
        </div>

        {/* Dynamic Screen Content */}
        <div className={`relative flex-1 ${getWallpaperClass()} overflow-y-auto px-5 pt-4 pb-20 text-slate-900 dark:text-white transition-all duration-300`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Screen Top Header */}
              <div className="flex items-center justify-between bg-white/20 dark:bg-black/30 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                    {styleMeta.number} • {styleMeta.title}
                  </span>
                  <h2 className="text-lg font-black capitalize leading-tight">
                    {activeTab === 'home' && (isRtl ? 'صفحه اصلی' : 'Dashboard Feed')}
                    {activeTab === 'explore' && (isRtl ? 'جستجو و کاوش' : 'Discover Trends')}
                    {activeTab === 'create' && (isRtl ? 'ساخت پست جدید' : 'New Creation')}
                    {activeTab === 'inbox' && (isRtl ? 'نشان‌شده‌ها و پیام‌ها' : 'Saved Collection')}
                    {activeTab === 'profile' && (isRtl ? 'حساب کاربری' : 'Member Profile')}
                  </h2>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/30 dark:bg-white/10 flex items-center justify-center font-bold text-xs shadow-inner">
                  <Smartphone size={16} />
                </div>
              </div>

              {/* Card 1 */}
              <div className="p-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl border border-white/40 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <Sparkles size={15} />
                  <span>{isRtl ? 'ویژگی استایل انتخابی' : 'Active Navigation Style'}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isRtl ? styleMeta.descriptionFa : styleMeta.description}
                </p>
                <div className="flex items-center gap-2 pt-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                    {styleMeta.tag}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">
                    {items.length} {isRtl ? 'آیتم منو' : 'Menu Tabs'}
                  </span>
                </div>
              </div>

              {/* Sample Feed Items */}
              <div className="space-y-2.5">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="p-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/30 dark:border-slate-700/50 flex items-center gap-3 shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm">
                      #{i}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="h-3 w-28 bg-slate-300 dark:bg-slate-600 rounded-full mb-1.5" />
                      <div className="h-2 w-40 bg-slate-200 dark:bg-slate-700 rounded-full" />
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/40 dark:bg-slate-700/40 text-slate-500">
                      <Heart size={14} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Tip Box */}
              <div className="p-3 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 rounded-xl text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-amber-500" />
                <span>
                  {isRtl
                    ? 'تمام این ۱۱ منو دارای انیمیشن‌های نرم Framer Motion، واکنش‌گرا و قابل کپی مستقیم در پروژه‌های شما هستند.'
                    : 'All 11 bottom bar components are animated with Framer Motion, fully accessible & ready to drop into your apps.'}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Menu Placement */}
        <div className="absolute bottom-4 inset-x-0 z-30">
          <MenuRenderer
            styleId={styleId}
            items={items}
            activeId={activeTab}
            onSelect={(id) => setActiveTab(id)}
            showLabels={showLabels}
            themeColor={themeColor}
            isRtl={isRtl}
          />

          {/* iOS Home Indicator Bar */}
          <div className="w-32 h-1 bg-slate-900/40 dark:bg-white/40 rounded-full mx-auto mt-1" />
        </div>
      </div>
    </div>
  );
};
