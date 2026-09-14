import React, { useState } from 'react';
import { 
  X, Plus, Sparkles, DollarSign, TrendingUp, Eye, UserCheck, 
  CheckSquare, ShieldCheck, FileText, Scale, FileQuestion, 
  Shuffle, Receipt, Tag, UtensilsCrossed, Timer, BookOpen, 
  Dices, Backpack, CalendarDays, PieChart, MessageCircle, 
  QrCode, Hourglass, Clock, ShoppingCart, Droplets, PenLine, 
  Briefcase, BarChart3, GraduationCap, ClipboardCheck, MessageSquare,
  Bot, Heart, LayoutGrid
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ToolItem } from '../../types';

const AVAILABLE_ICONS = [
  { name: 'Sparkles', icon: Sparkles, label: 'AI' },
  { name: 'Briefcase', icon: Briefcase, label: 'Công việc' },
  { name: 'DollarSign', icon: DollarSign, label: 'Tài chính' },
  { name: 'TrendingUp', icon: TrendingUp, label: 'Lợi nhuận' },
  { name: 'BarChart3', icon: BarChart3, label: 'Báo cáo' },
  { name: 'FileText', icon: FileText, label: 'Tài liệu' },
  { name: 'ClipboardCheck', icon: ClipboardCheck, label: 'Quy trình' },
  { name: 'GraduationCap', icon: GraduationCap, label: 'Đào tạo' },
  { name: 'ShieldCheck', icon: ShieldCheck, label: 'Kiểm duyệt' },
  { name: 'CheckSquare', icon: CheckSquare, label: 'Nhiệm vụ' },
  { name: 'Clock', icon: Clock, label: 'Thời gian' },
  { name: 'Timer', icon: Timer, label: 'Bấm giờ' },
  { name: 'Hourglass', icon: Hourglass, label: 'Đếm ngược' },
  { name: 'Droplets', icon: Droplets, label: 'Sức khỏe' },
  { name: 'Heart', icon: Heart, label: 'Đời sống' },
  { name: 'UtensilsCrossed', icon: UtensilsCrossed, label: 'Ẩm thực' },
  { name: 'Receipt', icon: Receipt, label: 'Hóa đơn' },
  { name: 'ShoppingCart', icon: ShoppingCart, label: 'Mua sắm' },
  { name: 'BookOpen', icon: BookOpen, label: 'Học tập' },
  { name: 'QrCode', icon: QrCode, label: 'Mã QR' },
  { name: 'MessageSquare', icon: MessageSquare, label: 'Tin nhắn' },
  { name: 'Bot', icon: Bot, label: 'Robot AI' }
];

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddToolModal: React.FC<AddToolModalProps> = ({ isOpen, onClose }) => {
  const { state, addTool } = useApp();

  const [ten, setTen] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [tab, setTab] = useState('tab-cong-viec');
  const [icon, setIcon] = useState('Sparkles');
  const [link, setLink] = useState('');
  const [co, setCo] = useState<'nho' | 'vua' | 'lon'>('nho');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ten.trim()) {
      alert('Vui lòng nhập tên công cụ!');
      return;
    }

    const newTool: Omit<ToolItem, 'id'> = {
      ten: ten.trim(),
      ghiChu: ghiChu.trim() || 'Công cụ hỗ trợ công việc',
      tab,
      icon,
      link: link.trim() || 'cong-cu/sat-chiet-khau.html',
      co,
      thuTu: state.congCu.length + 1,
      ghim: false
    };

    addTool(newTool);
    alert(`Đã thêm thành công công cụ "${ten.trim()}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="glass-card w-full max-w-lg rounded-3xl p-6 relative border border-sky-500/30 shadow-2xl overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-sky-500/20 to-indigo-500/0 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Thêm Công Cụ Mới</h3>
              <p className="text-xs text-sky-400/80">Tự động tích hợp vào Ngôi Nhà Số</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="py-4 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Tên công cụ */}
          <div>
            <label className="text-xs font-semibold text-slate-300">Tên công cụ <span className="text-rose-400">*</span></label>
            <input
              type="text"
              required
              value={ten}
              onChange={(e) => setTen(e.target.value)}
              placeholder="Ví dụ: Tính định mức men, Kiểm tra KCS, Viết bài AI..."
              className="w-full mt-1 bg-slate-900/90 border border-slate-700 rounded-xl p-3 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            />
          </div>

          {/* Phân loại Tab */}
          <div>
            <label className="text-xs font-semibold text-slate-300">Phân loại danh mục (Tab)</label>
            <select
              value={tab}
              onChange={(e) => setTab(e.target.value)}
              className="w-full mt-1 bg-slate-900/90 border border-slate-700 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-sky-400"
            >
              <option value="tab-hom-nay">🏠 Hôm nay & Tiêu điểm</option>
              <option value="tab-cong-viec">💼 Công việc & Kinh doanh</option>
              <option value="tab-doi-song">🤍 Đời sống & Gia đình</option>
              <option value="tab-nhan-su-ai">👥 Đội ngũ Nhân sự AI</option>
            </select>
          </div>

          {/* Ghi chú mô tả */}
          <div>
            <label className="text-xs font-semibold text-slate-300">Mô tả tóm tắt (Ghi chú)</label>
            <input
              type="text"
              value={ghiChu}
              onChange={(e) => setGhiChu(e.target.value)}
              placeholder="Ví dụ: Tính toán nhanh định mức nguyên liệu và chi phí..."
              className="w-full mt-1 bg-slate-900/90 border border-slate-700 rounded-xl p-3 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>

          {/* Chọn Icon */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Chọn biểu tượng đại diện</label>
            <div className="grid grid-cols-6 gap-2 p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl max-h-36 overflow-y-auto">
              {AVAILABLE_ICONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = icon === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setIcon(item.name)}
                    className={`p-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                      isSelected 
                        ? 'bg-sky-500 text-white ring-2 ring-sky-300 shadow-md shadow-sky-500/30' 
                        : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                    title={item.label}
                  >
                    <IconComponent className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit buttons */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-sky-500/25 transition-all active:scale-98 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Lưu Công Cụ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
