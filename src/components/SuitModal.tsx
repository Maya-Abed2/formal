import React, { useState } from 'react';
import { Suit } from '../types';
import { 
  X, 
  Star, 
  Check, 
  ShoppingBag, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  MessageCircle,
  Sparkles,
  Heart
} from 'lucide-react';

interface SuitModalProps {
  suit: Suit | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (suit: Suit, size: string, quantity: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (suitId: string) => void;
  onOpenSizeGuide: () => void;
}

export const SuitModal: React.FC<SuitModalProps> = ({
  suit,
  isOpen,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  onOpenSizeGuide
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!isOpen || !suit) return null;

  const images = suit.secondaryImage ? [suit.image, suit.secondaryImage] : [suit.image];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    onAddToCart(suit, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1200);
  };

  const whatsappMessage = encodeURIComponent(
    `مرحباً دار الأناقة، أرغب بالاستفسار عن طلب البدلة:\nالاسم: ${suit.name}\nالكود: ${suit.id}\nالسعر: ${suit.price} ر.س\nالمقاس المطلوب: ${selectedSize || 'غير محدد بعد'}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#12151d] border border-[#272e3f] rounded-2xl shadow-2xl text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close & Favorite top bar */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <button
            id="modal-toggle-favorite"
            onClick={() => onToggleFavorite(suit.id)}
            className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
              isFavorite 
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                : 'bg-black/50 text-white hover:text-rose-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-8">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#1a1f2c] border border-[#252c3d] group">
              <img 
                src={images[activeImageIndex]} 
                alt={suit.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {suit.badge && (
                <span className="absolute top-4 right-4 bg-[#c5a059] text-[#0d0f14] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {suit.badge}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx 
                        ? 'border-[#c5a059] scale-105' 
                        : 'border-[#252c3d] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees bar */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-neutral-400">
              <div className="p-2 rounded-lg bg-[#161a24] border border-[#232938]">
                <Truck className="w-4 h-4 text-[#c5a059] mx-auto mb-1" />
                <span>شحن سريع مبرد</span>
              </div>
              <div className="p-2 rounded-lg bg-[#161a24] border border-[#232938]">
                <RefreshCw className="w-4 h-4 text-[#c5a059] mx-auto mb-1" />
                <span>تعديل مقاس مجاني</span>
              </div>
              <div className="p-2 rounded-lg bg-[#161a24] border border-[#232938]">
                <ShieldCheck className="w-4 h-4 text-[#c5a059] mx-auto mb-1" />
                <span>صوف طبيعي 100%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Suit Specs & Purchasing Controls */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#c5a059] bg-[#c5a059]/15 px-2.5 py-1 rounded-md border border-[#c5a059]/30">
                  {suit.categoryLabel} • {suit.piecesLabel}
                </span>
                <div className="flex items-center gap-1 text-xs text-neutral-300">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{suit.rating}</span>
                  <span className="text-neutral-500">({suit.reviewsCount} تقييم)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl font-bold text-white mt-2 mb-1">
                {suit.name}
              </h2>
              <p className="text-sm text-neutral-400 font-light">
                {suit.subtitle}
              </p>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 my-4">
                <span className="text-3xl font-extrabold text-[#e5c07b]">
                  {suit.price.toLocaleString('ar-SA')} <span className="text-lg font-medium text-neutral-400">ر.س</span>
                </span>
                {suit.originalPrice && (
                  <span className="text-base text-neutral-500 line-through">
                    {suit.originalPrice.toLocaleString('ar-SA')} ر.س
                  </span>
                )}
                {suit.originalPrice && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    وفر {((suit.originalPrice - suit.price)).toLocaleString('ar-SA')} ر.س
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-300 leading-relaxed border-t border-b border-[#232938] py-3.5">
                {suit.description}
              </p>

              {/* Fabric & Fit badges */}
              <div className="grid grid-cols-2 gap-3 my-4 text-xs">
                <div className="p-2.5 rounded-lg bg-[#181d29] border border-[#272f43]">
                  <span className="text-neutral-400 block mb-0.5">القماش والنسيج</span>
                  <span className="font-semibold text-neutral-200">{suit.fabric}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#181d29] border border-[#272f43]">
                  <span className="text-neutral-400 block mb-0.5">القصة الهندسية</span>
                  <span className="font-semibold text-neutral-200">{suit.fitLabel}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>اختر المقاس الأوروبي (EU):</span>
                    {selectedSize && (
                      <span className="text-xs font-normal text-[#c5a059] bg-[#c5a059]/15 px-2 py-0.5 rounded">
                        المقاس المحدد: {selectedSize}
                      </span>
                    )}
                  </label>
                  <button
                    id="modal-open-size-guide"
                    onClick={onOpenSizeGuide}
                    className="text-xs text-[#c5a059] hover:text-[#e5c07b] flex items-center gap-1 underline underline-offset-4"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>جدول المقاسات</span>
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {suit.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        id={`suit-size-btn-${size}`}
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        className={`py-2 rounded-lg text-sm font-bold border transition-all ${
                          isSelected
                            ? 'bg-[#c5a059] text-[#0d0f14] border-[#c5a059] shadow-md shadow-[#c5a059]/20 scale-105'
                            : 'bg-[#181d29] text-neutral-300 border-[#2b3347] hover:border-[#c5a059]/60 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {sizeError && (
                  <p className="text-xs text-rose-400 font-medium animate-pulse">
                    يرجى اختيار المقاس المناسب قبل إضافة البدلة إلى السلة.
                  </p>
                )}
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-4 mt-5">
                <span className="text-xs font-semibold text-neutral-400">الكمية:</span>
                <div className="flex items-center border border-[#2b3347] rounded-lg bg-[#181d29] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-bold text-white min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Key Features checklist */}
              <div className="mt-5 space-y-1.5">
                <span className="text-xs font-bold text-neutral-300 block mb-1">مميزات الخياطة اليدوية:</span>
                {suit.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
                    <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: Add to cart & Direct WhatsApp order */}
            <div className="pt-4 border-t border-[#232938] space-y-2.5">
              <button
                id="modal-add-to-cart"
                onClick={handleAddToCart}
                disabled={addedAnimation}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-[#c5a059] to-[#a37f37] hover:from-[#d4af65] hover:to-[#b89042] text-[#0d0f14] shadow-[#c5a059]/20'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>تمت الإضافة إلى سلتك بنجاح!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>إضافة إلى سلة المشتريات</span>
                  </>
                )}
              </button>

              <a
                id="modal-whatsapp-order"
                href={`https://wa.me/966501234567?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>طلب سريع أو استفسار فوري عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
