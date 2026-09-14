import React from 'react';
import { 
  CheckCircle2, Clock, Sparkles, Pin, Flame, ShieldAlert,
  ArrowRight, Plus, Droplets, BookOpen, AlertCircle, Heart, Briefcase, Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ToolsGridView } from '../tools/ToolsGridView';

export const OverviewDashboard: React.FC = () => {
  const { state, setActiveView, toggleTaskDone, toggleHabit, currentTab, setCurrentTab, exportBackup } = useApp();

  const now = new Date();
  const hour = now.getHours();
  let greet = 'Chào buổi sáng';
  if (hour >= 12 && hour < 18) greet = 'Chào buổi chiều';
  else if (hour >= 18) greet = 'Chào buổi tối';

  const totalTasks = state.phong.viec.tasks.length;
  const doneTasks = state.phong.viec.tasks.filter(t => t.done).length;
  const pendingTasks = totalTasks - doneTasks;
  const todayHabitsDone = state.phong['thoi-quen'].habits.filter(h => h.history[new Date().toISOString().split('T')[0]]).length;
  const totalHabits = state.phong['thoi-quen'].habits.length;

  const pinnedTools = state.congCu.filter(t => t.ghim);

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Backup Alert Banner */}
      {!state.settings.lastBackupAt && (
        <div className="flex items-center justify-between gap-4 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-xs">
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Chưa sao lưu lần nào. Bạn nên xuất file sao lưu định kỳ để bảo toàn dữ liệu.</span>
          </div>
          <button
            onClick={exportBackup}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0 shadow-sm"
          >
            Xuất Ngay
          </button>
        </div>
      )}

      {/* Hero Greeting & Metric Cards Grid (Matching pxsx-ui) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1: Chào Tuấn Phạm */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> BẢNG ĐIỀU KHIỂN
            </div>
            <h2 className="text-xl font-extrabold text-white mt-1 leading-snug">
              {greet}, <span className="text-sky-400">{state.userName}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Bắt đầu ngày lúc {state.startTime} • Tự động đồng bộ</p>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400">
            <span>Sao lưu: {state.settings.lastBackupAt ? new Date(state.settings.lastBackupAt).toLocaleDateString('vi-VN') : 'Chưa'}</span>
          </div>
        </div>

        {/* KPI 2: Tiến độ việc hôm nay */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">VIỆC HÔM NAY</span>
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{doneTasks}/{totalTasks}</span>
              <span className="text-xs text-slate-400 font-medium">đã xong</span>
            </div>
            <div className="w-full bg-slate-800/80 rounded-full h-1.5 mt-2 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Còn {pendingTasks} việc cần làm</span>
            <button onClick={() => setActiveView('phong-viec')} className="text-sky-400 hover:underline font-semibold">Chi tiết →</button>
          </div>
        </div>

        {/* KPI 3: Thói quen chuỗi */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">THÓI QUEN</span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{todayHabitsDone}/{totalHabits}</span>
              <span className="text-xs text-amber-400 font-medium">hoàn thành</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Duy trì chuỗi kỷ luật 49 ngày</p>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Chuỗi cao nhất: 14 ngày</span>
            <button onClick={() => setActiveView('phong-thoi-quen')} className="text-amber-400 hover:underline font-semibold">Tích điểm →</button>
          </div>
        </div>

        {/* KPI 4: Trợ lý Nhân sự AI */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">NHÂN SỰ AI</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-white">6 Trợ Lý</div>
            <p className="text-xs text-slate-400 mt-1">Content • Sales • Marketing • SOP • CSKH</p>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span className="text-emerald-400 font-medium">Sẵn sàng 24/7</span>
            <button onClick={() => setCurrentTab('tab-nhan-su-ai')} className="text-emerald-400 hover:underline font-semibold">Mở AI →</button>
          </div>
        </div>
      </div>

      {/* DẢI 2 & 3: VIỆC CẦN LÀM & THÓI QUEN NHANH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Việc cần làm tiêu điểm (2 Cột) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-400">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white">Việc Cần Làm Sắp Tới</h3>
              </div>
              <button 
                onClick={() => setActiveView('phong-viec')}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold"
              >
                Mở phòng việc <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {state.phong.viec.tasks.slice(0, 3).map((task) => (
                <div 
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    task.done 
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500' 
                      : 'bg-[#14224a]/50 border-white/5 text-slate-200 hover:border-sky-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => toggleTaskDone(task.id)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        task.done ? 'bg-sky-500 border-sky-500 text-white' : 'border-slate-600 hover:border-sky-400'
                      }`}
                    >
                      {task.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold truncate ${task.done ? 'line-through text-slate-500' : 'text-white'}`}>
                        {task.ten}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className={`px-1.5 py-0.2 rounded font-bold ${
                          task.priority === 'CAO' ? 'bg-rose-500/20 text-rose-400' :
                          task.priority === 'VUA' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
                        }`}>
                          Ưu tiên {task.priority}
                        </span>
                        <span>•</span>
                        <span>Hạn: {task.due || 'Hôm nay'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thói quen hôm nay (1 Cột) */}
        <div className="glass-card rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                  <Flame className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white">Thói Quen</h3>
              </div>
              <span className="text-xs text-slate-400">{todayHabitsDone}/{totalHabits} đạt</span>
            </div>

            <div className="space-y-2.5">
              {state.phong['thoi-quen'].habits.map((habit) => {
                const today = new Date().toISOString().split('T')[0];
                const isDone = !!habit.history[today];
                return (
                  <button
                    key={habit.id}
                    onClick={() => toggleHabit(habit.id)}
                    className={`flex items-center justify-between w-full p-3 rounded-xl border text-left transition-all ${
                      isDone 
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' 
                        : 'bg-[#14224a]/50 border-white/5 text-slate-300 hover:border-amber-400/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`p-1.5 rounded-lg ${isDone ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-amber-400'}`}>
                        <Flame className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold truncate">{habit.ten}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {habit.currentStreak} ngày
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* DẢI 4: LƯỚI TẤT CẢ CÔNG CỤ & TAB THEO YÊU CẦU */}
      <ToolsGridView />
    </div>
  );
};
