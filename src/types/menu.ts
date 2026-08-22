export interface MenuItemConfig {
  id: string;
  label: string;
  labelFa?: string;
  icon: string;
  badge?: number | string;
  isCenterFab?: boolean;
}

export type MenuStyleId =
  | 'minimal'
  | 'glassmorphic'
  | 'floating'
  | 'neumorphic'
  | 'pill'
  | 'center-fab'
  | 'gradient'
  | 'outline'
  | 'indicator'
  | 'curved'
  | 'dock';

export type ThemeColor =
  | 'indigo'
  | 'emerald'
  | 'rose'
  | 'amber'
  | 'cyan'
  | 'violet'
  | 'obsidian';

export interface MenuPreset {
  id: number;
  title: string;
  description: string;
  style_id: MenuStyleId;
  theme_color: ThemeColor;
  is_dark: boolean;
  is_rtl: boolean;
  show_labels: boolean;
  items: MenuItemConfig[];
  likes_count: number;
  is_official: boolean;
  created_at?: string;
}

export interface StyleMeta {
  id: MenuStyleId;
  number: string;
  title: string;
  titleFa: string;
  subtitle: string;
  subtitleFa: string;
  description: string;
  descriptionFa: string;
  bgGradient: string;
  accentColor: string;
  tag: string;
}

export const STYLE_METAS: StyleMeta[] = [
  {
    id: 'minimal',
    number: '01',
    title: 'Minimal Clean',
    titleFa: 'مینیمال و تمیز',
    subtitle: 'Simple • Clean • Focused',
    subtitleFa: 'ساده • شفاف • متمرکز',
    description: 'Crisp layout with subtle top border and delicate active indicator.',
    descriptionFa: 'طراحی بسیار خلوت و مدرن با حاشیه باریک و آیکون‌های متمرکز',
    bgGradient: 'from-slate-100 to-white dark:from-slate-900 dark:to-slate-950',
    accentColor: '#6366f1',
    tag: 'Popular'
  },
  {
    id: 'glassmorphic',
    number: '02',
    title: 'Glassmorphism',
    titleFa: 'شیشه‌ای (گلاسمورفیسم)',
    subtitle: 'Modern • Blurred • Aesthetic',
    subtitleFa: 'مدرن • مات • جذاب',
    description: 'Translucent frosted glass with blurred background and glow highlights.',
    descriptionFa: 'ظاهر شیشه‌ای نیمه‌شفاف با افکت تاری و هاله نور فعال',
    bgGradient: 'from-indigo-900/40 via-purple-900/40 to-slate-900',
    accentColor: '#8b5cf6',
    tag: 'Trending'
  },
  {
    id: 'floating',
    number: '03',
    title: 'Floating (Detached)',
    titleFa: 'شناور و جداشده',
    subtitle: 'Floating • Premium • Elevated',
    subtitleFa: 'شناور • لوکس • برجسته',
    description: 'Elevated pill shape bar hovering gracefully above screen edge.',
    descriptionFa: 'منوی کپسولی شناور با فاصله از پایین صفحه و سایه برجسته',
    bgGradient: 'from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950',
    accentColor: '#3b82f6',
    tag: 'Top Pick'
  },
  {
    id: 'neumorphic',
    number: '04',
    title: 'Neumorphism',
    titleFa: 'نیومورفیسم ۳ بعدی',
    subtitle: 'Soft • Subtle • Smooth',
    subtitleFa: 'نرم • برجسته • لمسی',
    description: 'Soft 3D bevel aesthetics with dual light source and sunken active tabs.',
    descriptionFa: 'طراحی نرم ۳ بعدی با سایه‌های دوگانه و حالت فرورفته کلیک',
    bgGradient: 'from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900',
    accentColor: '#475569',
    tag: '3D Look'
  },
  {
    id: 'pill',
    number: '05',
    title: 'Pill Highlight',
    titleFa: 'هایلایت کپسولی',
    subtitle: 'Clear • Friendly • Usable',
    subtitleFa: 'واضح • کاربرپسند • روان',
    description: 'Active tab expands into an eye-catching pill containing icon and text.',
    descriptionFa: 'زبانه فعال به یک کپسول رنگی با متن و آیکون تبدیل می‌شود',
    bgGradient: 'from-purple-50 to-pink-50 dark:from-slate-900 dark:to-purple-950',
    accentColor: '#ec4899',
    tag: 'Interactive'
  },
  {
    id: 'center-fab',
    number: '06',
    title: 'Center FAB',
    titleFa: 'دکمه شناور مرکزی (FAB)',
    subtitle: 'Action Focused • Bold • Creative',
    subtitleFa: 'عملیاتی • برجسته • خلاقانه',
    description: 'Prominent central floating create action button popping above curved bar.',
    descriptionFa: 'دکمه ایجاد سریع در مرکز با انحنای ویژه و هاله نور متحرک',
    bgGradient: 'from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-emerald-950',
    accentColor: '#10b981',
    tag: 'Action App'
  },
  {
    id: 'gradient',
    number: '07',
    title: 'Gradient Bold',
    titleFa: 'گرادیان پرانرژی',
    subtitle: 'Vibrant • Modern • Eye-catching',
    subtitleFa: 'پرانرژی • مدرن • جذاب',
    description: 'Lush gradient backdrop with glowing neon active items and animation.',
    descriptionFa: 'پس‌زمینه گرادیان رنگی با آیکون‌های درخشان و انیمیشن نقطه فعال',
    bgGradient: 'from-violet-600 via-purple-600 to-pink-600',
    accentColor: '#f43f5e',
    tag: 'Vibrant'
  },
  {
    id: 'outline',
    number: '08',
    title: 'Outline Icons',
    titleFa: 'خطی و آیکون‌های Outlined',
    subtitle: 'Light • Minimal • Elegant',
    subtitleFa: 'سبک • مینیمال • ظریف',
    description: 'Precise line art stroke icons with smooth geometric active ring.',
    descriptionFa: 'آیکون‌های خطی فوق‌العاده ظریف با حلقه فعال هندسی و خلوت',
    bgGradient: 'from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950',
    accentColor: '#18181b',
    tag: 'Clean'
  },
  {
    id: 'indicator',
    number: '09',
    title: 'Tab with Indicator',
    titleFa: 'با نشانگر متحرک (Indicator)',
    subtitle: 'Indicator • Simple • Intuitive',
    subtitleFa: 'شاخص متحرک • ساده • شهودی',
    description: 'Smooth sliding top line that tracks active tab index in real-time.',
    descriptionFa: 'خط شاخص متحرک بالای منو که نرم بین زبانه فعال حرکت می‌کند',
    bgGradient: 'from-amber-50 to-orange-50 dark:from-slate-900 dark:to-amber-950',
    accentColor: '#f59e0b',
    tag: 'Smooth'
  },
  {
    id: 'curved',
    number: '10',
    title: 'Curved Background',
    titleFa: 'پس‌زمینه منحنی و موج‌دار',
    subtitle: 'Soft Curve • Different • Stylish',
    subtitleFa: 'انحنای نرم • متفاوت • شیک',
    description: 'Concave notch shape seamlessly holding the active tab circle.',
    descriptionFa: 'طراحی موج‌دار منحصر به فرد با دایره برجسته فعال در بالای قوس',
    bgGradient: 'from-teal-900/30 via-slate-900 to-cyan-900/40',
    accentColor: '#06b6d4',
    tag: 'Stylish'
  },
  {
    id: 'dock',
    number: '11',
    title: 'Dock Style (iOS Inspired)',
    titleFa: 'استایل داک آیفون (iOS Dock)',
    subtitle: 'iOS Look • Floating Dock • Smooth',
    subtitleFa: 'مشابه مک و آیفون • شناور • نرم',
    description: 'macOS/iOS inspired dock container with spring icon hover physics.',
    descriptionFa: 'الهام گرفته از داک سیستم‌عامل مک و آیفون با فیزیک انیمیشن فوق‌العاده',
    bgGradient: 'from-sky-100 via-indigo-50 to-white dark:from-slate-950 dark:to-slate-900',
    accentColor: '#0284c7',
    tag: 'iOS Style'
  }
];

export const DEFAULT_MENU_ITEMS: MenuItemConfig[] = [
  { id: 'home', label: 'Home', labelFa: 'خانه', icon: 'Home' },
  { id: 'explore', label: 'Explore', labelFa: 'کاوش', icon: 'Compass', badge: 'HOT' },
  { id: 'create', label: 'Create', labelFa: 'افزودن', icon: 'Plus', isCenterFab: true },
  { id: 'inbox', label: 'Saved', labelFa: 'پیام‌ها', icon: 'Bookmark', badge: 3 },
  { id: 'profile', label: 'Profile', labelFa: 'پروفایل', icon: 'User' }
];
