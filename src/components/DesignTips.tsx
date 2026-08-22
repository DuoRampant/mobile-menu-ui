import React from 'react';
import { Target, Smartphone, Sparkles, CheckCircle2, Zap } from 'lucide-react';

interface DesignTipsProps {
  isRtl: boolean;
}

export const DesignTips: React.FC<DesignTipsProps> = ({ isRtl }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white rounded-2xl p-6 shadow-xl border border-indigo-800/50 space-y-5">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-black">
            {isRtl ? 'اصول و راهنمای طراحی منوی پایینی (UX/UI Best Practices)' : 'Mobile Bottom Bar Design Guidelines'}
          </h3>
          <p className="text-xs text-indigo-200/80">
            {isRtl
              ? 'بر اساس استانداردهای Human Interface Guidelines اپل و Material Design 3 گوگل'
              : 'Based on Apple HIG & Google Material Design 3 guidelines for optimal mobile UX.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-300 font-bold">
            <Target size={16} />
            <span>{isRtl ? 'محدودیت تعداد (۳ تا ۵ آیتم)' : '3 to 5 Items Max'}</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {isRtl
              ? 'هرگز بیش از ۵ آیکون در منوی پایین قرار ندهید تا شلوغی ذهنی کاربر ایجاد نشود.'
              : 'Keep 4-5 core destinations. More items reduce touch accuracy and clutter the view.'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-300 font-bold">
            <Smartphone size={16} />
            <span>{isRtl ? 'اندازه لمس (Min 48x48px)' : 'Min 48x48px Touch Area'}</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {isRtl
              ? 'مساحت کلیک هر زبانه باید حداقل ۴۸ پیکسل باشد تا لمس با شست دست به راحتی انجام شود.'
              : 'Ensure comfortable thumb tapping zone with padding and visible touch feedback.'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <CheckCircle2 size={16} />
            <span>{isRtl ? 'وضوح حالت فعال (Active State)' : 'Clear Active Hierarchy'}</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {isRtl
              ? 'زبانه فعال باید با رنگ، سایه، انیمیشن یا کپسول مجزا مشخص باشد.'
              : 'Use bold fill, color accent, or pill highlights so the user instantly knows their location.'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-pink-300 font-bold">
            <Zap size={16} />
            <span>{isRtl ? 'پویانمایی و شبیه‌سازی لمس' : 'Micro Interactions'}</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {isRtl
              ? 'انیمیشن‌های فیزیکی Framer Motion به اپلیکیشن احساس کیفیت بالا و سرعت پاسخ‌دهی می‌دهند.'
              : 'Smooth spring animations provide delightful tactile feedback on every navigation tap.'}
          </p>
        </div>
      </div>
    </div>
  );
};
