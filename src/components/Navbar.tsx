import React, { useState } from 'react';
import { PageType } from '../types';
import { 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  PhoneCall, 
  Scissors, 
  Sparkles, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageType; label: string; description: string }[] = [
    { id: 'catalog', label: 'عرض البدلات', description: 'تشكيلة البدلات الإيطالية والرسمية والتوكسيدو' },
    { id: 'about', label: 'عن الدار', description: 'تاريخنا، أسرار الخياطة، وجودة الأقمشة' },
    { id: 'contact', label: 'تواصل معنا', description: 'حجز مواعيد القياس وفروعنا والأسئلة الشائعة' },
  ];

  const handleNavClick = (page: PageType) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0f14]/95 backdrop-blur-md border-b border-[#232734]">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-[#171a22] via-[#202533] to-[#171a22] text-[#c5a059] border-b border-[#2a3042] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-neutral-300">
            <span className="flex items-center gap-1.5 text-[#e5c07b]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تعديل مقاس مجاني 100% في جميع فروعنا</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>أقمشة صوف إيطالية معتمدة</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>خدمة العملاء: 10:00 ص - 11:00 م</span>
            </span>
            <a 
              href="tel:+966114567890" 
              className="flex items-center gap-1 text-neutral-300 hover:text-[#e5c07b] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#c5a059]" />
              <span dir="ltr">+966 11 456 7890</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity / Logo */}
          <button
            id="nav-brand-logo"
            onClick={() => handleNavClick('catalog')}
            className="flex items-center gap-3.5 text-right group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#c5a059] via-[#a37f37] to-[#75571e] p-0.5 shadow-lg shadow-[#c5a059]/10 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0d0f14] rounded-[7px] flex items-center justify-center">
                <Scissors className="w-5 h-5 text-[#e5c07b] transform -rotate-45" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#e5c07b] transition-colors">
                  دار الأناقة
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#c5a059]/20 text-[#e5c07b] border border-[#c5a059]/30">
                  Sartoria
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-light">
                للبدلات الرجالية والخياطة الفاخرة
              </p>
            </div>
          </button>

          {/* Center Navigation Links - The 3 pages requested */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[#e5c07b] bg-[#c5a059]/15 shadow-inner'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#c5a059] to-[#e5c07b] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Booking CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-lg text-neutral-300 hover:text-[#e5c07b] hover:bg-white/5 transition-colors"
              title="المفضلة"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c5a059] text-[#0d0f14] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-[#181c25] hover:bg-[#202533] border border-[#2a3042] text-neutral-200 hover:text-white transition-all shadow-sm group"
              title="سلة المشتريات"
            >
              <ShoppingBag className="w-5 h-5 text-[#e5c07b] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium hidden sm:inline">السلة</span>
              {cartCount > 0 ? (
                <span className="w-5 h-5 bg-[#c5a059] text-[#0d0f14] text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              ) : (
                <span className="text-xs text-neutral-400">0</span>
              )}
            </button>

            {/* Quick Consultation CTA */}
            <button
              id="nav-book-consultation"
              onClick={() => handleNavClick('contact')}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#a37f37] hover:from-[#d4af65] hover:to-[#b89042] text-[#0d0f14] text-xs font-bold tracking-wide transition-all shadow-md shadow-[#c5a059]/20"
            >
              <span>احجز قياس مخصص</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12151d] border-b border-[#232734] px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-right p-3 rounded-lg flex flex-col transition-all ${
                  isActive
                    ? 'bg-[#c5a059]/20 text-[#e5c07b] border-r-4 border-[#c5a059]'
                    : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                <span className="font-semibold text-base">{link.label}</span>
                <span className="text-xs text-neutral-400 mt-0.5">{link.description}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#232734] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 rounded-lg bg-[#c5a059] text-[#0d0f14] font-bold text-center text-sm shadow-md"
            >
              احجز موعد تفصيل خاص
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
