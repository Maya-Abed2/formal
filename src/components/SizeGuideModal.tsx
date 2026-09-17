import React from 'react';
import { X, Ruler, CheckCircle2, HelpCircle } from 'lucide-react';
import { SIZE_GUIDE } from '../data/suits';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#13161f] border border-[#2d3345] rounded-2xl shadow-2xl p-6 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#242938]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#c5a059]/15 text-[#e5c07b]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">دليل المقاسات الأوروبية للبدلات الرجالية</h3>
              <p className="text-xs text-neutral-400">تأكد من اختيار المقاس الأنسب لقياسات جسمك بالسنتيمتر</p>
            </div>
          </div>
          <button
            id="close-size-guide"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Size Chart Table */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#1c212e] text-[#e5c07b] font-semibold border-b border-[#2d3345]">
                <th className="py-3 px-3 rounded-r-lg">المقاس الأوروبي</th>
                <th className="py-3 px-3">محيط الصدر</th>
                <th className="py-3 px-3">محيط الخصر</th>
                <th className="py-3 px-3">عرض الكتف</th>
                <th className="py-3 px-3">طول الجاكيت</th>
                <th className="py-3 px-3 rounded-l-lg">الطول التقريبي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202535]">
              {SIZE_GUIDE.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-bold text-white bg-[#161a25]">{row.size}</td>
                  <td className="py-3 px-3 text-neutral-300">{row.chest}</td>
                  <td className="py-3 px-3 text-neutral-300">{row.waist}</td>
                  <td className="py-3 px-3 text-neutral-300">{row.shoulder}</td>
                  <td className="py-3 px-3 text-neutral-300">{row.length}</td>
                  <td className="py-3 px-3 text-[#c5a059]">{row.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement Instructions */}
        <div className="mt-6 p-4 rounded-xl bg-[#181d29] border border-[#282f42] space-y-3">
          <h4 className="text-sm font-bold text-[#e5c07b] flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>كيف تأخذ قياساتك بالمنزل بدقة؟</span>
          </h4>
          <ul className="space-y-2 text-xs text-neutral-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <span><strong>محيط الصدر:</strong> مرّر شريط القياس حول أعرض نقطة في الصدر تحت الإبطين مع الوقوف بوضعية طبيعية مريحة.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <span><strong>محيط الخصر:</strong> قم بالقياس حول خط الخصر الطبيعي (فوق عظم الحوض بقليل) حيث يرتكز البنطال.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <span><strong>عرض الكتف:</strong> قم بالقياس من أعلى نقطة في الكتف الأيمن إلى أعلى نقطة في الكتف الأيسر عبر الظهر.</span>
            </li>
          </ul>
        </div>

        {/* Guarantee Note */}
        <div className="mt-4 p-3 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-between text-xs">
          <span className="text-[#e5c07b]">
            هل المقاس غير دقيق؟ لا تقلق! نتيح لك <strong>تعديل المقاس مجاناً</strong> في أي من فروعنا خلال 14 يوماً.
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-[#c5a059] text-[#0d0f14] font-bold shrink-0 hover:bg-[#d4af65] transition-colors"
          >
            فهمت ذلك
          </button>
        </div>
      </div>
    </div>
  );
};
