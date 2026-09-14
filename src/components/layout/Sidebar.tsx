import React, { useState } from 'react';
import { 
  Home, Briefcase, Heart, Bot, LayoutGrid, Download, 
  Settings, Database, CheckCircle2, Shield, Sparkles, ChevronRight, User, Plus,
  HeartHandshake, Coins, Gamepad2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AddToolModal } from '../tools/AddToolModal';

export const Sidebar: React.FC = () => {
  const { 
    state, currentTab, setCurrentTab, activeView, setActiveView, 
    setIsSettingsOpen, exportBackup, isMobileMenuOpen, setIsMobileMenuOpen 
  } = useApp();
  const [isAddToolOpen, setIsAddToolOpen] = useState(false);

  const getBadgeCount = (tabId: string) => {
    if (tabId === 'tab-tat-ca') return state.congCu.length;
    if (tabId === 'tab-hom-nay') {
      const roomCount = Object.keys(state.phong).filter(k => !state.phong[k as keyof typeof state.phong].an).length;
      const toolCount = state.congCu.filter(t => t.tab === 'tab-hom-nay').length;
      return roomCount + toolCount;
    }
    return state.congCu.filter(t => t.tab === tabId).length;
  };

  const navItems = [
    { id: 'tab-hom-nay', title: 'HÔM NAY & TIÊU ĐIỂM', icon: Home, count: getBadgeCount('tab-hom-nay'), color: 'text-amber-400' },
    { id: 'tab-cong-viec', title: 'CÔNG VIỆC & KD (25)', icon: Briefcase, count: getBadgeCount('tab-cong-viec'), color: 'text-blue-400' },
    { id: 'tab-vo-chong', title: 'HẠNH PHÚC VỢ CHỒNG (15)', icon: HeartHandshake, count: getBadgeCount('tab-vo-chong'), color: 'text-rose-400', isHot: true },
    { id: 'tab-doi-song', title: 'ĐỜI SỐNG & SỨC KHỎE (15)', icon: Heart, count: getBadgeCount('tab-doi-song'), color: 'text-teal-400' },
    { id: 'tab-nhan-su-ai', title: 'ĐỘI NGŨ NHÂN SỰ AI (18)', icon: Bot, count: getBadgeCount('tab-nhan-su-ai'), color: 'text-emerald-400', isAi: true },
    { id: 'tab-tai-chinh', title: 'TÀI CHÍNH & TIỆN ÍCH (14)', icon: Coins, count: getBadgeCount('tab-tai-chinh'), color: 'text-violet-400' },
    { id: 'tab-giai-tri', title: 'GAME & GIẢI TRÍ (13)', icon: Gamepad2, count: getBadgeCount('tab-giai-tri'), color: 'text-orange-400' },
    { id: 'tab-tat-ca', title: 'TẤT CẢ CÔNG CỤ (100)', icon: LayoutGrid, count: getBadgeCount('tab-tat-ca'), color: 'text-sky-400' }
  ];

  const renderSidebarContent = () => (
    <>
      {/* BRAND LOGO & USER PROFILE INTEGRATED CARD WITH GLOWING GRADIENT BORDER */}
      <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-500 to-teal-400 shadow-xl shadow-sky-500/15 mb-4 group transition-all">
        <div className="bg-[#0e1738] rounded-[15px] p-3 flex items-center gap-3">
          {/* Real Avatar of Tuấn Phạm with glowing ring & Online indicator */}
          <div className="relative shrink-0">
            <img 
              src="/avatar_tuan_pham.png" 
              alt="Tuấn Phạm" 
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-sky-400/80 shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform" 
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0e1738] shadow-sm flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-ping"></span>
            </span>
          </div>

          {/* Brand & User Title */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-base text-white tracking-tight leading-none bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent truncate">
                NGÔI NHÀ SỐ
              </h1>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
            </div>
            <p className="text-xs text-sky-400 font-bold mt-1 truncate">
              Tuấn Phạm <span className="text-[10px] text-slate-400 font-normal">• Quản Trị</span>
            </p>
            <div className="flex items-center gap-2.5 mt-1.5 pt-1.5 border-t border-white/10 text-[11px] text-slate-400">
              <button onClick={() => { setIsSettingsOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-1 hover:text-sky-300 transition-colors">
                <Settings className="w-3 h-3 text-sky-400" /> Cài đặt
              </button>
              <span>•</span>
              <button onClick={exportBackup} className="flex items-center gap-1 hover:text-emerald-300 transition-colors">
                <Database className="w-3 h-3 text-emerald-400" /> Sao lưu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Add Tool & PWA Install */}
      <div className="space-y-2 mb-4">
        <button 
          onClick={() => { setIsAddToolOpen(true); setIsMobileMenuOpen(false); }}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-sky-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-sky-500/25 transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>+ THÊM CÔNG CỤ MỚI</span>
        </button>

        <button 
          onClick={() => {
            alert('Để cài đặt PWA: Nhấn vào biểu tượng Cài đặt trên thanh địa chỉ trình duyệt hoặc chạy Mo-App-Enterprise.bat');
          }}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/25 transition-all"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Cài Đặt Ứng Dụng (PWA)</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
          Danh Mục 100 Công Cụ
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id && activeView === 'dashboard';
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setActiveView('dashboard');
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive 
                  ? 'bg-sky-500/20 border border-sky-500/40 text-white shadow-sm shadow-sky-500/15 font-semibold' 
                  : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : item.color}`} />
                <span className="truncate">{item.title}</span>
                {item.isAi && <Sparkles className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />}
                {item.isHot && <span className="text-[9px] bg-rose-500/30 text-rose-300 px-1.5 py-0.2 rounded font-bold border border-rose-500/40">VIP</span>}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.count}
                </span>
                <ChevronRight className={`w-3 h-3 text-slate-400 ${isActive ? 'text-sky-400' : ''}`} />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer System Info */}
      <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Ngôi Nhà Số 100 Tools</span>
        <span className="flex items-center gap-1 text-emerald-400 font-medium">
          <CheckCircle2 className="w-3 h-3" /> Online/Offline
        </span>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0a1128] border-r border-slate-800/80 min-h-screen p-4 select-none shrink-0 z-20">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Slide-out Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <aside className="relative w-80 max-w-[85vw] bg-[#0a1128] border-r border-sky-500/30 p-4 flex flex-col h-full z-10 shadow-2xl">
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Add Tool Modal */}
      <AddToolModal isOpen={isAddToolOpen} onClose={() => setIsAddToolOpen(false)} />
    </>
  );
};
