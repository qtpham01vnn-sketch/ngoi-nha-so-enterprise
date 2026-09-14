import React from 'react';
import { Home, Briefcase, Heart, Bot, LayoutGrid } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { currentTab, setCurrentTab, activeView, setActiveView } = useApp();

  const tabs = [
    { id: 'tab-hom-nay', label: 'Hôm nay', icon: Home },
    { id: 'tab-cong-viec', label: 'Công việc', icon: Briefcase },
    { id: 'tab-doi-song', label: 'Đời sống', icon: Heart },
    { id: 'tab-nhan-su-ai', label: 'Nhân sự AI', icon: Bot },
    { id: 'tab-tat-ca', label: 'Tất cả (33)', icon: LayoutGrid }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1733]/95 backdrop-blur-lg border-t border-slate-800 flex items-center justify-around py-2 px-1 select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id && activeView === 'dashboard';
        return (
          <button
            key={tab.id}
            onClick={() => {
              setCurrentTab(tab.id);
              setActiveView('dashboard');
            }}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-lg transition-colors ${
              isActive ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
