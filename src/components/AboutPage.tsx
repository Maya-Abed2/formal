import React from 'react';
import { 
  Scissors, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Ruler, 
  Clock, 
  Users, 
  CheckCircle, 
  Star,
  Quote,
  ArrowLeft
} from 'lucide-react';
import { TESTIMONIALS } from '../data/suits';

interface AboutPageProps {
  onNavigateToCatalog: () => void;
  onNavigateToContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToCatalog,
  onNavigateToContact,
}) => {
  const pillars = [
    {
      icon: Award,
      title: 'أقمشة إيطالية وإنجليزية معتمدة',
      desc: 'ننتقي أقمشتنا حصرياً من أرقى دور النسيج في بييلا ويوركشاير، ونعتمد صوف فيرجن النقي من لورو بيانا وفيتالي باربيريس وزن 240 - 320 جم.'
    },
    {
      icon: Ruler,
      title: 'هندسة القياس التشريحي',
      desc: 'لا نكتفي بالمقاسات السطحية، بل نأخذ بالاعتبار ميل الكتف، انحناء الظهر، ونمط الوقوف الطبيعي لضمان راحة وانسيابية مطلقة أثناء الجلوس والمشي.'
    },
    {
      icon: Scissors,
      title: 'خياطة يدوية دقيقة بأيدي محترفين',
      desc: 'تشطيب يدوي على الياقات والجيوب بنظام Pick Stitching، مع عروات أكمام حقيقية قابلة للفتح وأزرار منحوتة من قرن الثور الطبيعي.'
    },
    {
      icon: ShieldCheck,
      title: 'ضمان القياس والتعديل الدائم',
      desc: 'رضاك الكامل عن مقاس البدلة هو أولويتنا القصوى؛ نقدم خدمة تعديل مجانية بالكامل في كافة فروعنا حتى تطابق البدلة تطلعاتك 100%.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'اختيار القماش والقصة',
      desc: 'جلسة استشارية مع مستشار الأناقة لاختيار نوع الصوف، درجة اللون، تصميم الياقة، ونمط الصدر (مفرد أو مزدوج).'
    },
    {
      num: '02',
      title: 'أخذ 28 قياساً تشريحياً',
      desc: 'قياس دقيق لكافة أبعاد الجسم باستخدام شريط القياس الخاص وتحديد مواصفات طول الكم والسترة وبنطال البدلة.'
    },
    {
      num: '03',
      title: 'القص اليدوي والبروفة الأولى',
      desc: 'تفصيل الباترون الخاص بك بواسطة كبير الخياطين، تليها جلسة قياس حية لضبط أي تفصيل دقيق قبل الفينش.'
    },
    {
      num: '04',
      title: 'التسليم والتغليف الملكي',
      desc: 'تسليم البدلة مكوية بالبخار المعلق داخل حقيبة قماشية مسامية فاخرة مع شماعة خشبية ومنديل جيب من الحرير.'
    }
  ];

  const stats = [
    { value: '+15,000', label: 'بدلة رجالية جرى تفصيلها وتسليمها' },
    { value: '25 عاماً', label: 'من الخبرة العريقة في فنون الخياطة' },
    { value: '98.9%', label: 'معدل رضا وولاء العملاء الدائمين' },
    { value: '100%', label: 'صوف طبيعي إيطالي وإنجليزي معتمد' }
  ];

  return (
    <div className="space-y-16 pb-20 animate-fadeIn">
      {/* Editorial Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12151e] via-[#161a26] to-[#0f1117] border border-[#232a3d] p-8 sm:p-14 lg:p-20 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-xs font-semibold text-[#e5c07b]">
            <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>عن دار الأناقة للخياطة والبدلات الرجالية</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            نصنع الهيبة والوقار، <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#f5dfa8] via-[#c5a059] to-[#997327]">
              غرزة تلو الأخرى منذ 1999
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            تأسست «دار الأناقة» في الرياض برؤية واضحة: إحياء التراث العريق لأعرق شوارع الخياطة العالمية كسافيل رو الإنجليزي وميلانو الإيطالية، وتقديم بدلات رجالية تعكس حضور الرجل العربي العصري بأعلى معايير الحرفية والنزاهة النسيجية.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              id="about-explore-collection"
              onClick={onNavigateToCatalog}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c5a059] hover:bg-[#d4af65] text-[#0d0f14] text-xs sm:text-sm font-bold shadow-md shadow-[#c5a059]/20 transition-all"
            >
              <span>تصفح تشكيلة البدلات الحالية</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              id="about-contact-btn"
              onClick={onNavigateToContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1c2230] hover:bg-[#252c3e] border border-[#2b344a] text-neutral-200 text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>زيارة أحد فروعنا أو حجز موعد</span>
            </button>
          </div>
        </div>
      </section>

      {/* Story & Philosophy Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">
              فلسفة الحرفة
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              لماذا تختلف بدلة «دار الأناقة» عن أي بدلة عادية؟
            </h2>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed">
            البدلة الحقيقية ليست مجرد قطعتين من القماش تمت حياكتهما بالآلة، بل هي درع يعزز ثقة الرجل في أهم لحظات حياته؛ من منصات التوقيع واجتماعات مجالس الإدارة إلى بهجة ليلة العمر.
          </p>

          <p className="text-sm text-neutral-300 leading-relaxed">
            نحن نستخدم هياكل صدر نصف كانفاس وكامل كانفاس (Full Canvas & Half Canvas) المصنوعة من شعر الخيل الطبيعي والكتان، والتي تتشكل تدريجياً مع حرارة جسمك لتصبح كأنها طبقة ثانية صُممت لأجلك وحدك، بعيداً عن حشوات البوليستر اللاصقة الرخيصة.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#141722] border border-[#242b3c] space-y-1">
              <span className="text-xl font-bold text-[#e5c07b]">100% صوف نقي</span>
              <p className="text-xs text-neutral-400">تنفس طبيعي ومقاومة فائقة للتجعد والروائح</p>
            </div>
            <div className="p-4 rounded-xl bg-[#141722] border border-[#242b3c] space-y-1">
              <span className="text-xl font-bold text-[#e5c07b]">خياطة يدوية</span>
              <p className="text-xs text-neutral-400">أكثر من 40 ساعة عمل متواصلة لكل بدلة تفصيل</p>
            </div>
          </div>
        </div>

        {/* Tailor Visual Art */}
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#1a1f2c] border border-[#272e42] shadow-2xl group">
          <img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80"
            alt="حرفة الخياطة اليدوية"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-[#0f121a]/85 backdrop-blur-md border border-white/10 text-right">
            <span className="text-xs font-bold text-[#e5c07b] block mb-0.5">أتيليه دار الأناقة المركزي</span>
            <p className="text-xs text-neutral-300">
              حيث يلتقي خياطو الصوف الإيطالي مع أحدث تقنيات الليزر والقص اليدوي الدقيق.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">
            معايير الجودة الصارمة
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ركائز التميز في كل بدلة ننتجها
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#12151f] border border-[#222736] hover:border-[#c5a059]/50 transition-all duration-300 space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c5a059]/15 flex items-center justify-center text-[#e5c07b]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {p.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Step-by-Step Bespoke Journey */}
      <section className="rounded-3xl bg-[#12151e] border border-[#232a3d] p-8 sm:p-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">
            رحلة التفصيل المخصص
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            كيف تولد بدلتك من خيط الصوف إلى منصة التتويج؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="relative p-6 rounded-2xl bg-[#171a25] border border-[#272e40] space-y-3"
            >
              <div className="text-3xl font-black text-[#c5a059]/40 font-mono">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-white">
                {step.title}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx}
            className="p-6 rounded-2xl bg-[#131620] border border-[#222838] text-center space-y-1"
          >
            <div className="text-3xl sm:text-4xl font-black text-[#e5c07b]">
              {stat.value}
            </div>
            <p className="text-xs text-neutral-400 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Customer Testimonials */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">
            شهادات نعتز بها
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ماذا يقول عملاء دار الأناقة؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-[#131620] border border-[#232938] flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#c5a059]/40" />
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#202535]">
                <h4 className="text-sm font-bold text-white">{t.name}</h4>
                <p className="text-xs text-[#c5a059]">{t.role} - {t.city}</p>
                <span className="text-[11px] text-neutral-500 block mt-1">البدلة: {t.suitName}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIP Home Tailoring Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-[#171a24] via-[#1c2232] to-[#171a24] border border-[#2d364c] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <span className="text-xs font-bold text-[#e5c07b] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span>خدمة كبار الشخصيات المتنقلة (VIP Tailoring)</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            الخياط الشخصي في منزلك أو مكتبك
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
            إذا كان جدول أعمالك مزدحماً، يسعدنا إرسال كبير الخياطين ومعه عينات الصوف الإيطالي والإنجليزي لأخذ مقاساتك في المكان والوقت الذي يناسبك.
          </p>
        </div>

        <button
          id="about-book-home-tailor"
          onClick={onNavigateToContact}
          className="shrink-0 px-6 py-3 rounded-xl bg-[#c5a059] hover:bg-[#d4af65] text-[#0d0f14] font-bold text-sm shadow-lg transition-colors"
        >
          طلب خدمة الخياط المتنقل
        </button>
      </section>
    </div>
  );
};
