import React from 'react';
import { PageType } from '../types';
import { 
  Scissors, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Sparkles,
  Send,
  MessageCircle
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizeGuide }) => {
  return (
    <footer className="bg-[#0b0d12] text-neutral-300 border-t border-[#1e2330] pt-14 pb-8">
      {/* Guarantees Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#1c212d]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#11141c] border border-[#1e2433]">
            <div className="p-3 rounded-lg bg-[#c5a059]/15 text-[#e5c07b] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">صوف إيطالي معتمد 100%</h4>
              <p className="text-[11px] text-neutral-400">من دور لورو بيانا وفيتالي باربيريس</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#11141c] border border-[#1e2433]">
            <div className="p-3 rounded-lg bg-[#c5a059]/15 text-[#e5c07b] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">تعديل مقاس مجاني</h4>
              <p className="text-[11px] text-neutral-400">في جميع فروعنا خلال 14 يوماً</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#11141c] border border-[#1e2433]">
            <div className="p-3 rounded-lg bg-[#c5a059]/15 text-[#e5c07b] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">شحن وتوصيل ملكي سريع</h4>
              <p className="text-[11px] text-neutral-400">تغليف في حقيبة قماشية وشماعة خشبية</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#11141c] border border-[#1e2433]">
            <div className="p-3 rounded-lg bg-[#c5a059]/15 text-[#e5c07b] shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">خدمة الخياط المتنقل VIP</h4>
              <p className="text-[11px] text-neutral-400">أخذ المقاسات في منزلك أو مكتبك</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Presentation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#c5a059] flex items-center justify-center text-[#0d0f14]">
                <Scissors className="w-5 h-5 transform -rotate-45" />
              </div>
              <span className="text-xl font-bold text-white">دار الأناقة للبدلات الرجالية</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              دار رائدة في خياطة وتصميم أرقى البدلات الرجالية الإيطالية والكلاسيكية وبدلات التوكسيدو للزفاف والمناسبات الخاصة في الخليج العربي منذ عام 1999.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/966501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#181d28] hover:bg-[#c5a059] hover:text-[#0d0f14] text-neutral-300 transition-colors"
                title="واتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="tel:+966114567890"
                className="p-2 rounded-lg bg-[#181d28] hover:bg-[#c5a059] hover:text-[#0d0f14] text-neutral-300 transition-colors"
                title="اتصال هاتفي"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:concierge@dar-alanaqa.com"
                className="p-2 rounded-lg bg-[#181d28] hover:bg-[#c5a059] hover:text-[#0d0f14] text-neutral-300 transition-colors"
                title="البريد الإلكتروني"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">صفحات الموقع</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  id="footer-link-catalog"
                  onClick={() => {
                    onNavigate('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  عرض وتشكيلة البدلات
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  عن دار الأناقة وقصة الحرفة
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  تواصل معنا وحجز موعد
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  دليل المقاسات الأوروبية
                </button>
              </li>
            </ul>
          </div>

          {/* Suit Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">تشكيلاتنا</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  بدلات الأعمال الدبلوماسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  توكسيدو العرسان والسهرات
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  بدلات ثلاث قطع مع صدرية
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  بدلات الكتان والصيف الخفيفة
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Club */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">نادي الأناقة الحصري</h4>
            <p className="text-xs text-neutral-400">
              انضم لقائمتنا البريدية لتصلك أحدث أقمشة الموسم وعروض التفصيل الخاصة قبل الجميع.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('شكراً لانضمامك إلى نادي دار الأناقة!'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="بريدك الإلكتروني..."
                  className="w-full pl-8 pr-3 py-2 bg-[#161a25] border border-[#252b3c] rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#c5a059]"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-[#c5a059] hover:text-[#e5c07b]"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#171b25] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p>
          جميع الحقوق محفوظة © {new Date().getFullYear()} دار الأناقة للبدلات الرجالية الفاخرة.
        </p>

        {/* Accepted Payment badges */}
        <div className="flex items-center gap-2 text-[10px] text-neutral-400 flex-wrap">
          <span className="px-2 py-1 rounded bg-[#131620] border border-[#222736]">مدى mada</span>
          <span className="px-2 py-1 rounded bg-[#131620] border border-[#222736]">Visa</span>
          <span className="px-2 py-1 rounded bg-[#131620] border border-[#222736]">MasterCard</span>
          <span className="px-2 py-1 rounded bg-[#131620] border border-[#222736]">Apple Pay</span>
          <span className="px-2 py-1 rounded bg-[#131620] border border-[#222736]">تابي Tamara</span>
          <span className="px-2 py-1 rounded bg-[#131620] border border-[#222736]">الدفع عند الاستلام</span>
        </div>
      </div>
    </footer>
  );
};
