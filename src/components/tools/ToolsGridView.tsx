import React from 'react';
import { 
  Pin, Sparkles, Plus, ExternalLink, Play, Search,
  DollarSign, TrendingUp, Eye, UserCheck, CheckSquare, ShieldCheck,
  FileText, Scale, FileQuestion, Shuffle, Receipt, Tag, UtensilsCrossed,
  Timer, RotateCcw, BookOpen, Dices, Backpack, CalendarDays, PieChart,
  MessageCircle, QrCode, Hourglass, Clock, ShoppingCart, Droplets,
  PenLine, Briefcase, BarChart3, GraduationCap, ClipboardCheck, MessageSquare,
  Home, Heart, Bot, LayoutGrid, HeartHandshake, Coins, Gamepad2,
  Calculator, Target, Mail, FileCheck, Calendar, Layers, Cpu, HelpCircle,
  Filter, AlertTriangle, Boxes, Smile, Activity, Moon, Flame, ShieldPlus,
  Wallet, Zap, Gauge, BookHeart, Video, Image, MailCheck, UserPlus, Gift,
  BookMarked, LineChart, Award, Languages, Compass, CalendarClock, Banknote,
  Percent, PartyPopper, Users, FileSignature, TimerReset, Clock3, ArrowRightLeft,
  KeyRound, CircleDot, Dice5, Sparkle, Grid, Keyboard, Headphones, TableProperties,
  SunMedium
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ToolItem } from '../../types';

const ICON_MAP: Record<string, any> = {
  DollarSign, TrendingUp, Eye, UserCheck, CheckSquare, ShieldCheck,
  FileText, Scale, FileQuestion, Shuffle, Receipt, Tag, UtensilsCrossed,
  Timer, RotateCcw, BookOpen, Dices, Backpack, CalendarDays, PieChart,
  MessageCircle, QrCode, Hourglass, Clock, ShoppingCart, Droplets,
  PenLine, Sparkles, Briefcase, BarChart3, GraduationCap, ClipboardCheck, MessageSquare,
  Home, Heart, Bot, LayoutGrid, HeartHandshake, Coins, Gamepad2,
  Calculator, Target, Mail, FileCheck, Calendar, Layers, Cpu, HelpCircle,
  Filter, AlertTriangle, Boxes, Smile, Activity, Moon, Flame, ShieldPlus,
  Wallet, Zap, Gauge, BookHeart, Video, Image, MailCheck, UserPlus, Gift,
  BookMarked, LineChart, Award, Languages, Compass, CalendarClock, Banknote,
  Percent, PartyPopper, Users, FileSignature, TimerReset, Clock3, ArrowRightLeft,
  KeyRound, CircleDot, Dice5, Sparkle, Grid, Keyboard, Headphones, TableProperties,
  SunMedium
};

export const ToolsGridView: React.FC = () => {
  const { state, currentTab, setCurrentTab, searchTerm, setActiveTool, togglePinTool } = useApp();

  const getFilteredTools = () => {
    let tools = state.congCu;

    // Filter by tab
    if (currentTab !== 'tab-tat-ca') {
      tools = tools.filter(t => t.tab === currentTab);
    }

    // Filter by search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      tools = tools.filter(t => 
        t.ten.toLowerCase().includes(q) || 
        t.ghiChu.toLowerCase().includes(q)
      );
    }

    return tools;
  };

  const filteredTools = getFilteredTools();

  const getTabLabel = (tabId: string) => {
    const tab = state.tabs.find(t => t.id === tabId);
    return tab ? tab.ten : '';
  };

  return (
    <div className="space-y-4">
      {/* Category Tabs Header */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 border-b border-white/5 scrollbar-thin">
        <div className="flex items-center gap-1.5">
          {state.tabs.map((tab) => {
            const count = tab.id === 'tab-tat-ca' 
              ? state.congCu.length 
              : state.congCu.filter(t => t.tab === tab.id).length;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-bold' 
                    : 'bg-[#14224a]/50 text-slate-400 hover:text-slate-200 hover:bg-[#14224a]'
                }`}
              >
                <span>{tab.ten}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Tools */}
      {filteredTools.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center text-slate-400">
          <Search className="w-8 h-8 mx-auto text-slate-600 mb-2" />
          <p className="text-sm font-semibold text-slate-300">Không tìm thấy công cụ phù hợp</p>
          <p className="text-xs text-slate-500 mt-1">Thử tìm kiếm với từ khóa khác hoặc chuyển sang tab "Tất cả"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredTools.map((tool) => {
            const Icon = ICON_MAP[tool.icon] || FileText;
            const isAiTool = tool.tab === 'tab-nhan-su-ai';
            const isLoveTool = tool.tab === 'tab-vo-chong';

            return (
              <div
                key={tool.id}
                onClick={() => setActiveTool(tool)}
                className="glass-card glass-card-interactive rounded-2xl p-4 flex flex-col justify-between cursor-pointer group relative hover:border-sky-400/40 transition-all hover:scale-[1.01]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className={`p-2.5 rounded-xl ${
                      isAiTool 
                        ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30' 
                        : isLoveTool
                        ? 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30'
                        : 'bg-sky-500/15 text-sky-400 ring-1 ring-sky-500/30'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {tool.tab && currentTab === 'tab-tat-ca' && (
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/5 truncate max-w-[100px]">
                          {getTabLabel(tool.tab)}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePinTool(tool.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          tool.ghim ? 'text-amber-400 bg-amber-400/10' : 'text-slate-600 hover:text-slate-400'
                        }`}
                        title={tool.ghim ? "Bỏ ghim" : "Ghim ra dùng nhanh"}
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                    {tool.ten}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tool.ghiChu}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 group-hover:text-sky-400 transition-colors">
                  <span className="text-[11px] font-medium">Chạy công cụ</span>
                  <Play className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-sky-400" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
