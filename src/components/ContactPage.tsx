import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  MessageCircle,
  Sparkles,
  Scissors
} from 'lucide-react';
import { BOUTIQUE_BRANCHES, FAQ_ITEMS } from '../data/suits';
import { AppointmentBooking } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentBooking>({
    fullName: '',
    phone: '',
    email: '',
    city: 'الرياض',
    serviceType: 'حجز موعد أخذ مقاسات في البوتيك',
    preferredDate: '',
    preferredTime: 'مسائي (04:00 م - 07:00 م)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `SAR-${new Date().getFullYear()}-${randomNum}`;
    setBookingRef(ref);
    setSubmitted(true);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const whatsappInquiryUrl = `https://wa.me/966501234567?text=${encodeURIComponent(
    'مرحباً دار الأناقة، أود الاستفسار عن تفصيل بدلة رجالية ومواعيد البوتيك.'
  )}`;

  return (
    <div className="space-y-16 pb-20 animate-fadeIn">
      {/* Editorial Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12151e] via-[#161a26] to-[#0f1117] border border-[#232a3d] p-8 sm:p-14 lg:p-16 shadow-2xl">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-xs font-semibold text-[#e5c07b]">
            <MessageSquare className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>نحن هنا لخدمتك والرد على كافة استفساراتك</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            احجز استشارتك الخاصة، <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#f5dfa8] via-[#c5a059] to-[#997327]">
              أو تواصل مع خبراء الخياطة
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            سواء كنت ترغب بحجز موعد لقياس بدلة زفافك، أو طلب زيارة الخياط المتنقل، أو الاستفسار عن مقاسات البدلات الجاهزة، يسعد فريق مستشارينا ومصممينا الترحيب بك.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              id="contact-header-whatsapp"
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>محادثة واتساب فورية</span>
            </a>
            <a
              id="contact-header-call"
              href="tel:+966114567890"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1c2230] hover:bg-[#262e40] border border-[#2b354b] text-neutral-200 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Phone className="w-4 h-4 text-[#c5a059]" />
              <span dir="ltr">+966 11 456 7890</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Grid: Appointment Form & Quick Contact Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Interactive Booking Form */}
        <div className="lg:col-span-7 bg-[#12151f] border border-[#23293a] rounded-3xl p-6 sm:p-10 shadow-xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[#e5c07b] text-xs font-bold mb-1">
                  <Scissors className="w-4 h-4 text-[#c5a059]" />
                  <span>نموذج الحجز والاستشارة</span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  احجز موعد تفصيل أو قياس
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  املأ البيانات وسيتواصل معك مستشار الأناقة لتأكيد الموعد وتجهيز تشكيلة الأقمشة المطلوبة.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    الاسم الكامل <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="مثال: تركي بن فهد"
                    className="w-full px-4 py-2.5 bg-[#171b26] border border-[#272e40] focus:border-[#c5a059] rounded-xl text-sm text-neutral-200 focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    رقم الجوال / الواتساب <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XXXXXXXX"
                    className="w-full px-4 py-2.5 bg-[#171b26] border border-[#272e40] focus:border-[#c5a059] rounded-xl text-sm text-neutral-200 focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@mail.com"
                    className="w-full px-4 py-2.5 bg-[#171b26] border border-[#272e40] focus:border-[#c5a059] rounded-xl text-sm text-neutral-200 focus:outline-none"
                    dir="ltr"
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    المدينة / الفرع الأقرب إليك
                  </label>
                  <select
                    id="booking-city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#171b26] border border-[#272e40] focus:border-[#c5a059] rounded-xl text-sm text-neutral-200 focus:outline-none cursor-pointer"
                  >
                    <option value="الرياض">الرياض - بوتيك شارع التحلية</option>
                    <option value="جدة">جدة - بوتيك طريق الملك عبد العزيز</option>
                    <option value="دبي">دبي - بوتيك الداون تاون بوليفارد</option>
                    <option value="الدمام / الخبر">المنطقة الشرقية (الدمام والخبر)</option>
                    <option value="أخرى">مدينة أخرى (خدمة شحن وتنسيق أونلاين)</option>
                  </select>
                </div>
              </div>

              {/* Service Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  نوع الخدمة المطلوبة
                </label>
                <select
                  id="booking-service"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#171b26] border border-[#272e40] focus:border-[#c5a059] rounded-xl text-sm text-neutral-200 focus:outline-none cursor-pointer"
                >
                  <option value="حجز موعد أخذ مقاسات في البوتيك">حجز موعد أخذ مقاسات وبروفة في البوتيك</option>
                  <option value="استشارة تفصيل بدلة زفاف وتوكسيدو">استشارة تفصيل بدلة زفاف وتوكسيدو ملكي</option>
                  <option value="طلب خدمة الخياط المتنقل (للمنزل أو المكتب)">طلب خدمة الخياط المتنقل VIP (للمنزل أو المكتب)</option>
                  <option value="تعديل مقاس بدلة جاهزة">تعديل مقاس بدلة جرى شراؤها مسبقاً</option>
                  <option value="استفسار عام أو طلب بالجملة للشركات">استفسار عام أو توريد بدلات للشركات</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    التاريخ المفضل
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#171b26] border border-[#272e40] focus:border-[#c5a059] rounded-xl text-sm text-neutral-200 focus:outline-none"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    الفترة المفضلة
                  </label>
                  <select
                    id="booking-time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#171b26] border border-[#272e40] focus:border-[#c5a059] rounded-xl text-sm text-neutral-200 focus:outline-none cursor-pointer"
                  >
                    <option value="صباحي (10:00 ص - 01:00 م)">الفترة الصباحية (10:00 ص - 01:00 م)</option>
                    <option value="مسائي (04:00 م - 07:00 م)">الفترة المسائية (04:00 م - 07:00 م)</option>
                    <option value="سهرة (07:00 م - 11:00 م)">فترة السهرة (07:00 م - 11:00 م)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  ملاحظات إضافية أو نوع القماش المفضل
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="أي تفاصيل ترغب بمشاركتها معنا (مثال: موعد الحفل، اللون المفضل، استفسار خاص)..."
                  className="w-full px-4 py-2.5 bg-[#171b26] border border-[#272e40] focus:border-[#c5a059] rounded-xl text-sm text-neutral-200 focus:outline-none"
                />
              </div>

              {/* Submit button */}
              <button
                id="submit-booking-form"
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#a37f37] hover:from-[#d4af65] hover:to-[#b89042] text-[#0d0f14] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/20 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>إرسال طلب الحجز والاستشارة</span>
              </button>
            </form>
          ) : (
            /* Booking Confirmation Card */
            <div className="py-8 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#c5a059] bg-[#c5a059]/15 px-3 py-1 rounded-full">
                  رقم طلب الحجز: {bookingRef}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  شكراً لك يا سيد {formData.fullName}!
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto">
                  تم استلام طلبك بنجاح. سيقوم مستشار الأناقة بالتواصل معك هاتفياً أو عبر الواتساب على الرقم ({formData.phone}) لتأكيد موعدك وتفاصيل زيارتك.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#171a25] border border-[#262c3e] text-right text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between text-neutral-400">
                  <span>الخدمة:</span>
                  <span className="text-white font-medium">{formData.serviceType}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>المدينة:</span>
                  <span className="text-white font-medium">{formData.city}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>الفترة:</span>
                  <span className="text-white font-medium">{formData.preferredTime}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/966501234567?text=${encodeURIComponent(
                    `مرحباً دار الأناقة، لقد قمت للتو بطلب حجز برقم المرجع (${bookingRef}) باسم ${formData.fullName} لخدمة ${formData.serviceType}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تأكيد فوري عبر واتساب</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#1d2230] text-neutral-300 text-xs hover:text-white"
                >
                  تقديم طلب جديد
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Direct Channels & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#12151f] border border-[#23293a] space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#c5a059]" />
              <span>قنوات الاتصال المباشرة</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#161a25] border border-[#232938]">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-400 block mb-0.5">الرقم الموحد والاتصال المباشر</span>
                  <a href="tel:+966114567890" className="text-white font-bold hover:text-[#e5c07b] text-sm" dir="ltr">
                    +966 11 456 7890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#161a25] border border-[#232938]">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-400 block mb-0.5">الكونسيرج والمحادثة الفورية</span>
                  <a 
                    href={whatsappInquiryUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white font-bold hover:text-emerald-400 text-sm" 
                    dir="ltr"
                  >
                    +966 50 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#161a25] border border-[#232938]">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-400 block mb-0.5">البريد الإلكتروني الرسمي</span>
                  <a href="mailto:concierge@dar-alanaqa.com" className="text-white font-bold hover:text-[#e5c07b] text-sm" dir="ltr">
                    concierge@dar-alanaqa.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#161a25] border border-[#232938]">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-400 block mb-0.5">أوقات العمل واستقبال البوتيك</span>
                  <p className="text-white font-medium">السبت - الخميس: 10:00 ص - 11:00 م</p>
                  <p className="text-neutral-400">الجمعة: 04:00 م - 11:00 م</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Assurance */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1b1f2b] to-[#12151e] border border-[#2b3346] space-y-3">
            <span className="text-xs font-bold text-[#e5c07b] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span>وعد دار الأناقة</span>
            </span>
            <h4 className="text-base font-bold text-white">
              بروفة مجانية وتعديل فوري بلا قيود
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              نضمن لك إطلالة متناسقة تخلو من أي تجعد أو عيب. في حال رغبت بأي تعديل على طول الكم أو خصر البنطال، ينجزه خياطنا المختص في نفس اليوم.
            </p>
          </div>
        </div>
      </section>

      {/* Boutique Showrooms Section */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">
            فروعنا وصالات العرض
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            شرفنا بزيارتك في أحد بوتيكاتنا الفاخرة
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BOUTIQUE_BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="rounded-2xl bg-[#12151f] border border-[#222839] overflow-hidden flex flex-col justify-between shadow-lg hover:border-[#c5a059]/40 transition-colors"
            >
              <div className="aspect-video relative overflow-hidden bg-[#181d29]">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-[#e5c07b] text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                  {branch.city}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white">{branch.name}</h3>
                  <p className="text-xs text-neutral-300 flex items-start gap-1.5 leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>
                  <p className="text-xs text-neutral-400 flex items-start gap-1.5">
                    <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{branch.workingHours}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-[#202535] flex items-center justify-between gap-2">
                  <a
                    href={`tel:${branch.phone}`}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#181d29] hover:bg-[#23293a] text-neutral-200 text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>اتصال</span>
                  </a>
                  <a
                    href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `مرحباً ${branch.name}، أود الاستفسار عن تفصيل بدلة ومواعيد الزيارة.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="rounded-3xl bg-[#12151e] border border-[#232a3d] p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">
            الأسئلة الشائعة
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            كل ما تود معرفته عن بدلاتنا وخدماتنا
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen 
                    ? 'bg-[#181d2a] border-[#c5a059]/40 shadow-lg' 
                    : 'bg-[#151924] border-[#222736] hover:border-[#2d3448]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-right p-4 sm:p-5 flex items-center justify-between gap-4"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg transition-transform ${isOpen ? 'bg-[#c5a059] text-[#0d0f14]' : 'bg-[#1d2230] text-neutral-400'}`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-[#262c3e] pt-3 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
