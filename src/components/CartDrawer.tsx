import React, { useState } from 'react';
import { CartItem } from '../types';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  CheckCircle, 
  Tag, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  CreditCard, 
  Banknote, 
  CheckCircle2
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (suitId: string, size: string, delta: number) => void;
  onRemoveItem: (suitId: string, size: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  
  // Checkout flow state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'tamara'>('cod');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.suit.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'ELEGANCE10' || cleanCode === 'ANQA10') {
      setDiscountPercent(10);
      setCouponSuccess('تم تفعيل كود الخصم (10%) بنجاح!');
    } else if (cleanCode === 'ROYAL15') {
      setDiscountPercent(15);
      setCouponSuccess('تم تفعيل كود الخصم الملكي (15%)!');
    } else {
      setCouponError('رمز القسيمة غير صالح، جرب رمز: ELEGANCE10');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) return;

    const ref = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setOrderComplete(true);
    onClearCart();
  };

  const generateWhatsAppOrderText = () => {
    const lines = items.map(
      (item) => `• ${item.suit.name} - مقاس: ${item.selectedSize} - كمية: ${item.quantity} - السعر: ${item.suit.price * item.quantity} ر.س`
    );
    const text = `مرحباً دار الأناقة، أود تأكيد طلبي التالي:\n${lines.join('\n')}\nالمجموع: ${total} ر.س\nالاسم: ${customerName || 'عميل المتجر'}\nرقم المرجع: ${orderRef || 'طلب فوري'}`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="absolute inset-y-0 left-0 max-w-full flex pl-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-[#12151e] border-r border-[#242a3a] text-neutral-200 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#212636] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#c5a059]/15 text-[#e5c07b]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">سلة المشتريات</h3>
                <span className="text-xs text-neutral-400">
                  {items.reduce((sum, item) => sum + item.quantity, 0)} قطعة مختارة
                </span>
              </div>
            </div>
            <button
              id="close-cart-drawer"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {orderComplete ? (
              /* Order Confirmation Success */
              <div className="py-8 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#c5a059] bg-[#c5a059]/15 px-3 py-1 rounded-full">
                    رقم الطلب: {orderRef}
                  </span>
                  <h4 className="text-xl font-bold text-white pt-2">تم تأكيد طلبك بنجاح!</h4>
                  <p className="text-xs text-neutral-300 max-w-xs mx-auto">
                    شكراً لاختيارك دار الأناقة. سيتم تجهيز بدلتك وشحنها في صندوق الحفظ الفاخر، وتزويدك برقم التتبع هاتفياً.
                  </p>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/966501234567?text=${generateWhatsAppOrderText()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>متابعة الطلب عبر واتساب</span>
                  </a>
                  <button
                    onClick={() => {
                      setOrderComplete(false);
                      setIsCheckingOut(false);
                      onClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#1a1f2b] text-neutral-300 hover:text-white text-xs font-semibold"
                  >
                    العودة للتسوق
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form onSubmit={handlePlaceOrder} className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-[#212636]">
                  <h4 className="text-sm font-bold text-white">بيانات التوصيل والدفع</h4>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-[#c5a059] hover:underline"
                  >
                    تعديل السلة
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1 font-semibold">الاسم الكريم</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: عبد الله بن حمد"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#171b26] border border-[#262c3e] focus:border-[#c5a059] text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-semibold">رقم الجوال للتوصيل</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#171b26] border border-[#262c3e] focus:border-[#c5a059] text-white focus:outline-none"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-semibold">عنوان التوصيل (المدينة والحي والشارع)</label>
                    <textarea
                      required
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="الرياض، حي النرجس، شارع..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#171b26] border border-[#262c3e] focus:border-[#c5a059] text-white focus:outline-none"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-2">
                    <label className="block text-neutral-400 mb-2 font-semibold">طريقة الدفع المفضلة:</label>
                    <div className="space-y-2">
                      <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        paymentMethod === 'cod' ? 'border-[#c5a059] bg-[#c5a059]/10' : 'border-[#232839] bg-[#161a25]'
                      }`}>
                        <div className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === 'cod'} 
                            onChange={() => setPaymentMethod('cod')}
                            className="accent-[#c5a059]"
                          />
                          <span className="font-semibold text-white">الدفع عند الاستلام (COD)</span>
                        </div>
                        <Banknote className="w-4 h-4 text-[#c5a059]" />
                      </label>

                      <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        paymentMethod === 'card' ? 'border-[#c5a059] bg-[#c5a059]/10' : 'border-[#232839] bg-[#161a25]'
                      }`}>
                        <div className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === 'card'} 
                            onChange={() => setPaymentMethod('card')}
                            className="accent-[#c5a059]"
                          />
                          <span className="font-semibold text-white">بطاقة مدى / فيزا / ماستركارد</span>
                        </div>
                        <CreditCard className="w-4 h-4 text-[#c5a059]" />
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#a37f37] hover:from-[#d4af65] hover:to-[#b89042] text-[#0d0f14] font-bold text-sm shadow-lg"
                >
                  تأكيد الطلب بمبلغ {total.toLocaleString('ar-SA')} ر.س
                </button>
              </form>
            ) : items.length > 0 ? (
              /* Items list */
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.suit.id}-${item.selectedSize}`}
                    className="flex gap-3 p-3 rounded-xl bg-[#161a25] border border-[#232938]"
                  >
                    <img
                      src={item.suit.image}
                      alt={item.suit.name}
                      className="w-18 h-24 object-cover object-top rounded-lg bg-[#1e2433] shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-white line-clamp-1">
                            {item.suit.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.suit.id, item.selectedSize)}
                            className="text-neutral-500 hover:text-rose-400 p-1"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          المقاس: <strong className="text-[#e5c07b]">{item.selectedSize}</strong>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-[#272f42] rounded-lg bg-[#12151e] text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.suit.id, item.selectedSize, -1)}
                            className="px-2 py-1 text-neutral-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 text-white font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.suit.id, item.selectedSize, 1)}
                            className="px-2 py-1 text-neutral-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#e5c07b]">
                          {(item.suit.price * item.quantity).toLocaleString('ar-SA')} ر.س
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Free shipping bar */}
                <div className="p-3 rounded-xl bg-[#161a25] border border-[#252c3e] flex items-center gap-2 text-xs text-[#e5c07b]">
                  <Truck className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>أنت مؤهل لخدمة الشحن السريع المجاني في علبة الحفظ الملكية!</span>
                </div>

                {/* Coupon Code section */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="رمز القسيمة (جرب ELEGANCE10)"
                      className="flex-1 px-3 py-2 bg-[#171b26] border border-[#262c3e] focus:border-[#c5a059] rounded-xl text-xs text-neutral-200 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1f2533] hover:bg-[#283144] text-neutral-200 text-xs font-semibold rounded-xl border border-[#2c354a] transition-colors"
                    >
                      تطبيق
                    </button>
                  </div>
                  {couponSuccess && (
                    <p className="text-[11px] text-emerald-400 mt-1 font-medium">{couponSuccess}</p>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-rose-400 mt-1 font-medium">{couponError}</p>
                  )}
                </form>
              </div>
            ) : (
              /* Empty cart */
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#181d29] flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-8 h-8 text-[#c5a059]" />
                </div>
                <h4 className="text-base font-bold text-white">سلة المشتريات فارغة</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  تصفح تشكيلتنا من البدلات الرجالية واختر مقاسك لإضافتها إلى السلة.
                </p>
              </div>
            )}
          </div>

          {/* Footer calculation & checkout button */}
          {items.length > 0 && !orderComplete && !isCheckingOut && (
            <div className="p-4 sm:p-5 border-t border-[#212636] bg-[#10131b] space-y-3 text-xs">
              <div className="space-y-1.5 text-neutral-300">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{subtotal.toLocaleString('ar-SA')} ر.س</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>خصم القسيمة ({discountPercent}%):</span>
                    <span>- {discountAmount.toLocaleString('ar-SA')} ر.س</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>الشحن والتوصيل السريع:</span>
                  <span className="text-emerald-400 font-bold">مجاني</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-[#212636]">
                  <span>الإجمالي شامل ضريبة القيمة المضافة:</span>
                  <span className="text-base text-[#e5c07b]">{total.toLocaleString('ar-SA')} ر.س</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  id="cart-proceed-checkout"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#a37f37] hover:from-[#d4af65] hover:to-[#b89042] text-[#0d0f14] font-bold text-sm shadow-lg shadow-[#c5a059]/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>متابعة إتمام الطلب</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/966501234567?text=${generateWhatsAppOrderText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>إرسال السلة وطلب فوري عبر واتساب</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
