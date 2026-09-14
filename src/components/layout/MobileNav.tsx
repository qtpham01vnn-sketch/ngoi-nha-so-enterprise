import { Home, Briefcase, Heart, Bot, LayoutGrid, HeartHandshake, Coins, Gamepad2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { currentTab, setCurrentTab, activeView, setActiveView } = useApp();

  const tabs = [
    { id: 'tab-hom-nay', label: 'Hôm nay', icon: Home },
    { id: 'tab-cong-viec', label: 'Việc', icon: Briefcase },
    { id: 'tab-vo-chong', label: 'Vợ Chồng', icon: HeartHandshake },
    { id: 'tab-nhan-su-ai', label: 'AI', icon: Bot },
    { id: 'tab-tai-chinh', label: 'Tài Chính', icon: Coins },
    { id: 'tab-giai-tri', label: 'Game', icon: Gamepad2 },
    { id: 'tab-tat-ca', label: 'Tất cả (100)', icon: LayoutGrid }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1733]/95 backdrop-blur-lg border-t border-slate-800 flex items-center justify-around py-2 px-1 select-none overflow-x-auto">
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
            className={`flex flex-col items-center justify-center gap-1 flex-1 min-w-[50px] py-1 rounded-lg transition-colors ${
              isActive ? 'text-sky-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[9px] leading-none whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
