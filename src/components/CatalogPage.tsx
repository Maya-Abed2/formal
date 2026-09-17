import React, { useState, useMemo } from 'react';
import { Suit } from '../types';
import { SUITS_DATA } from '../data/suits';
import { 
  Search, 
  SlidersHorizontal, 
  Ruler, 
  Star, 
  Eye, 
  ShoppingBag, 
  Heart, 
  RotateCcw,
  Sparkles,
  Scissors,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

interface CatalogPageProps {
  onSelectSuit: (suit: Suit) => void;
  onAddToCart: (suit: Suit, size: string, quantity: number) => void;
  favorites: string[];
  onToggleFavorite: (suitId: string) => void;
  onOpenSizeGuide: () => void;
  onNavigateToContact: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onSelectSuit,
  onAddToCart,
  favorites,
  onToggleFavorite,
  onOpenSizeGuide,
  onNavigateToContact
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFit, setSelectedFit] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Categories config
  const categories = [
    { id: 'all', label: 'جميع التشكيلات' },
    { id: 'formal', label: 'رسمية وأعمال' },
    { id: 'tuxedo', label: 'زفاف وسهرات (توكسيدو)' },
    { id: 'three-piece', label: 'ثلاث قطع (مع صدرية)' },
    { id: 'summer', label: 'صيفية وكتان' },
  ];

  // Colors config
  const colors = [
    { id: 'all', label: 'كافة الألوان', hex: '#666' },
    { id: 'navy', label: 'كحلي داكن', hex: '#1b2a4a' },
    { id: 'black', label: 'أسود ملكي', hex: '#111317' },
    { id: 'grey', label: 'رمادي', hex: '#4a525d' },
    { id: 'beige', label: 'بيج رملي', hex: '#d8cbb6' },
    { id: 'green', label: 'زمردي', hex: '#143327' },
  ];

  // Filtered & Sorted suits
  const filteredSuits = useMemo(() => {
    return SUITS_DATA.filter((suit) => {
      // Category match
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'tuxedo' && suit.category !== 'tuxedo' && suit.category !== 'wedding') {
          return false;
        } else if (selectedCategory !== 'tuxedo' && suit.category !== selectedCategory) {
          return false;
        }
      }

      // Fit match
      if (selectedFit !== 'all' && suit.fit !== selectedFit) {
        return false;
      }

      // Color match
      if (selectedColor !== 'all' && suit.color !== selectedColor) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = suit.name.toLowerCase().includes(q);
        const matchesSubtitle = suit.subtitle.toLowerCase().includes(q);
        const matchesFabric = suit.fabric.toLowerCase().includes(q);
        const matchesDesc = suit.description.toLowerCase().includes(q);
        const matchesColor = suit.colorName.toLowerCase().includes(q);
        if (!matchesName && !matchesSubtitle && !matchesFabric && !matchesDesc && !matchesColor) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured order
    });
  }, [selectedCategory, selectedFit, selectedColor, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFit('all');
    setSelectedColor('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="space-y-10 pb-16 animate-fadeIn">
      {/* Editorial Luxury Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#11131a] via-[#161a25] to-[#12141c] border border-[#232a3d] p-6 sm:p-10 lg:p-14 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#2a3754]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-xs font-semibold text-[#e5c07b]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>المجموعة الملكية لخريف وشتاء 2026/2027</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            أناقة تليق بهيبتك، <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#f5dfa8] via-[#c5a059] to-[#997327]">
              تفصيل إيطالي متقن بالميليمتر
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl font-light">
            استكشف تشكيلتنا الحصرية من بدلات الصوف الإيطالي والإنجليزي الفاخر، وبدلات التوكسيدو للزفاف والسهرات. نوفر تفصيلاً جاهزاً بمقاسات أوروبية دقيقة مع ضمان تعديل المقاس مجاناً.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              id="hero-open-size-guide"
              onClick={onOpenSizeGuide}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1c2230] hover:bg-[#252c3e] border border-[#2c354c] text-neutral-200 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Ruler className="w-4 h-4 text-[#c5a059]" />
              <span>دليل أخذ المقاسات</span>
            </button>

            <button
              id="hero-book-tailor"
              onClick={onNavigateToContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d4af65] text-[#0d0f14] text-xs sm:text-sm font-bold transition-colors shadow-md shadow-[#c5a059]/20"
            >
              <Scissors className="w-4 h-4" />
              <span>حجز استشارة تفصيل خاص</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search & Filter Controls Bar */}
      <section className="space-y-4">
        {/* Search input and Quick Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <input
              id="suits-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن بدلة، نوع القماش (صوف، كشمير، كتان)، اللون، أو القصة..."
              className="w-full pl-4 pr-11 py-3 bg-[#13161f] border border-[#262c3e] focus:border-[#c5a059] rounded-xl text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none transition-colors"
            />
            <Search className="w-5 h-5 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                مسح
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                id="suits-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#13161f] border border-[#262c3e] hover:border-[#373f57] rounded-xl px-4 py-3 pr-4 pl-9 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="featured">الترتيب: المقترحة والمميزة</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييماً من العملاء</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              id="toggle-mobile-filters"
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="sm:hidden p-3 rounded-xl bg-[#13161f] border border-[#262c3e] text-neutral-300"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#c5a059] text-[#0d0f14] shadow-md shadow-[#c5a059]/20'
                    : 'bg-[#13161f] text-neutral-300 border border-[#232839] hover:border-[#38415c] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Extended Filters (Fit & Color) */}
        <div className={`p-4 rounded-2xl bg-[#12151d] border border-[#222736] space-y-4 ${
          showFiltersMobile ? 'block' : 'hidden sm:block'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Fit Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-neutral-400">القصة الهندسية:</span>
              {[
                { id: 'all', label: 'الكل' },
                { id: 'slim', label: 'سليم فت (Slim Fit)' },
                { id: 'modern', label: 'مودرن تايلورد (Modern)' },
                { id: 'classic', label: 'كلاسيكية مريحة (Classic)' },
              ].map((fit) => (
                <button
                  key={fit.id}
                  onClick={() => setSelectedFit(fit.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedFit === fit.id
                      ? 'bg-[#2a3245] text-[#e5c07b] font-bold border border-[#c5a059]/40'
                      : 'bg-[#181d28] text-neutral-400 hover:text-white border border-[#232938]'
                  }`}
                >
                  {fit.label}
                </button>
              ))}
            </div>

            {/* Color Swatches */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-neutral-400">اللون:</span>
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all ${
                    selectedColor === c.id
                      ? 'bg-[#2a3245] text-white font-bold ring-1 ring-[#c5a059]'
                      : 'bg-[#181d28] text-neutral-400 hover:text-white border border-[#232938]'
                  }`}
                >
                  {c.id !== 'all' && (
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-white/20" 
                      style={{ backgroundColor: c.hex }}
                    />
                  )}
                  <span>{c.label}</span>
                </button>
              ))}
            </div>

            {/* Active filters counter & Reset button */}
            {(selectedCategory !== 'all' || selectedFit !== 'all' || selectedColor !== 'all' || searchQuery) && (
              <button
                id="reset-filters-btn"
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط الفلاتر</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Search count info */}
      <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
        <span>
          عرض <strong className="text-white font-bold">{filteredSuits.length}</strong> بدلة رجالية فاخرة
        </span>
        <span className="text-neutral-500">
          جميع البدلات تشمل التوصيل السريع وضمان القياس
        </span>
      </div>

      {/* Suits Grid */}
      {filteredSuits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSuits.map((suit) => {
            const isFav = favorites.includes(suit.id);
            return (
              <div
                key={suit.id}
                id={`suit-card-${suit.id}`}
                className="group relative flex flex-col rounded-2xl bg-[#13161f] border border-[#242b3c] hover:border-[#c5a059]/60 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#c5a059]/5"
              >
                {/* Image Container */}
                <div 
                  className="relative aspect-[3/4] w-full overflow-hidden bg-[#181d28] cursor-pointer"
                  onClick={() => onSelectSuit(suit)}
                >
                  <img
                    src={suit.image}
                    alt={suit.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badge */}
                  {suit.badge && (
                    <span className="absolute top-3 right-3 bg-[#c5a059] text-[#0d0f14] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md">
                      {suit.badge}
                    </span>
                  )}

                  {/* Favorite Button */}
                  <button
                    id={`fav-btn-${suit.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(suit.id);
                    }}
                    className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                      isFav 
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                        : 'bg-black/50 text-white hover:text-rose-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick View Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      id={`quick-view-${suit.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSuit(suit);
                      }}
                      className="px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-[#0d0f14] text-xs font-bold shadow-lg flex items-center gap-1.5 transition-transform group-hover:translate-y-0 translate-y-2"
                    >
                      <Eye className="w-4 h-4 text-[#c5a059]" />
                      <span>معاينة التفاصيل الكاملة</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-[#c5a059] font-medium">
                        {suit.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1 text-neutral-300">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold">{suit.rating}</span>
                      </div>
                    </div>

                    {/* Name */}
                    <h3 
                      onClick={() => onSelectSuit(suit)}
                      className="text-base font-bold text-white hover:text-[#e5c07b] transition-colors cursor-pointer line-clamp-1"
                    >
                      {suit.name}
                    </h3>

                    {/* Subtitle / Fabric info */}
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                      {suit.subtitle}
                    </p>

                    {/* Sizes chips preview */}
                    <div className="flex items-center gap-1 mt-2.5 flex-wrap">
                      <span className="text-[10px] text-neutral-500 ml-1">المقاسات:</span>
                      {suit.sizes.slice(0, 4).map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-[#1c2230] text-neutral-300 border border-[#273042]">
                          {s}
                        </span>
                      ))}
                      {suit.sizes.length > 4 && (
                        <span className="text-[10px] text-neutral-500">+{suit.sizes.length - 4}</span>
                      )}
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="pt-3 border-t border-[#202636] flex items-center justify-between">
                    <div>
                      <div className="text-lg font-extrabold text-[#e5c07b]">
                        {suit.price.toLocaleString('ar-SA')} <span className="text-xs font-normal text-neutral-400">ر.س</span>
                      </div>
                      {suit.originalPrice && (
                        <div className="text-[11px] text-neutral-500 line-through">
                          {suit.originalPrice.toLocaleString('ar-SA')} ر.س
                        </div>
                      )}
                    </div>

                    <button
                      id={`card-select-btn-${suit.id}`}
                      onClick={() => onSelectSuit(suit)}
                      className="px-3.5 py-2 rounded-lg bg-[#1a202d] hover:bg-[#c5a059] text-neutral-200 hover:text-[#0d0f14] border border-[#2c354a] hover:border-[#c5a059] text-xs font-bold transition-all duration-200 flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>اختيار ومقاس</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl bg-[#12151d] border border-[#242b3c] space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#1e2433] flex items-center justify-center text-neutral-500">
            <Search className="w-8 h-8 text-[#c5a059]" />
          </div>
          <h3 className="text-lg font-bold text-white">لم نجد بدلات تطابق اختياراتك الحالية</h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            جرب تعديل كلمات البحث، أو اختر فئة مختلفة، أو قم بإعادة ضبط الفلاتر لتصفح كامل المجموعة.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#c5a059] text-[#0d0f14] text-xs font-bold hover:bg-[#d4af65] transition-colors"
          >
            إعادة تعيين جميع الفلاتر
          </button>
        </div>
      )}

      {/* Tailoring & Custom Atelier VIP Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-[#191d29] to-[#12151d] border border-[#293247] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#e5c07b]">
            <Scissors className="w-4 h-4 text-[#c5a059]" />
            <span>خدمة أتيليه التفصيل الخاص (Bespoke Sartoriale)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            هل تبحث عن بدلة بتفصيل خاص ومقاسات مجهرية؟
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
            يمكنك حجز موعد مع كبير خياطينا في البوتيك أو طلب زيارة الخياط المتنقل لمنزلك أو مكتبك، لاختيار الأقمشة وتصميم بدلتك من الصفر.
          </p>
        </div>

        <button
          id="banner-book-appointment"
          onClick={onNavigateToContact}
          className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#a37f37] hover:from-[#d4af65] hover:to-[#b89042] text-[#0d0f14] text-xs sm:text-sm font-bold shadow-lg transition-all"
        >
          احجز موعد التفصيل الخاص الآن
        </button>
      </section>
    </div>
  );
};
