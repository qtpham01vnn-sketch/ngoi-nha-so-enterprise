import React from 'react';
import { Search, Settings, Bell, Calendar, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { state, searchTerm, setSearchTerm, setIsSettingsOpen } = useApp();

  const now = new Date();
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const dayStr = `${daysOfWeek[now.getDay()]}, ${now.getDate()} tháng ${now.getMonth() + 1}, ${now.getFullYear()}`;

  const pendingTasks = state.phong.viec.tasks.filter(t => !t.done).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 lg:px-8 py-3.5 bg-[#0b132b]/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Tìm nhanh trong ${state.congCu.length} công cụ, việc cần làm...`}
            className="w-full bg-[#14224a]/70 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Date Display */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14224a]/50 border border-white/5 text-xs text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-sky-400" />
          <span>{dayStr}</span>
        </div>

        {/* Bell */}
        <button 
          onClick={() => alert(`Bạn có ${pendingTasks} việc cần hoàn thành hôm nay!`)}
          className="relative p-2 rounded-xl bg-[#14224a]/50 hover:bg-[#14224a] border border-white/5 text-slate-300 hover:text-white transition-colors"
          title="Thông báo hệ thống"
        >
          <Bell className="w-4 h-4" />
          {pendingTasks > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
              {pendingTasks}
            </span>
          )}
        </button>

        {/* Settings button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#14224a]/80 hover:bg-[#1b2b5a] border border-sky-500/20 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
        >
          <Settings className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">Cài Đặt</span>
        </button>

        {/* User Mini Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <img 
            src="/avatar_tuan_pham.png" 
            alt="Tuấn Phạm" 
            className="w-8 h-8 rounded-full object-cover ring-2 ring-sky-400/60 shadow-sm" 
          />
        </div>
      </div>
    </header>
  );
};
