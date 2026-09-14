import React, { useRef } from 'react';
import { X, Download, Upload, Trash2, Database, Shield, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsModal: React.FC = () => {
  const { isSettingsOpen, setIsSettingsOpen, state, exportBackup, importBackup, resetToDefault } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isSettingsOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const success = importBackup(text);
          if (success) {
            alert('Khôi phục dữ liệu thành công!');
            setIsSettingsOpen(false);
          } else {
            alert('File dữ liệu không đúng định dạng!');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="glass-card w-full max-w-md rounded-3xl p-6 relative border border-sky-500/20 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Cài Đặt & Dữ Liệu</h3>
              <p className="text-xs text-slate-400">Quản lý sao lưu an toàn</p>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-5 space-y-4">
          {/* Storage Info */}
          <div className="p-3.5 rounded-2xl bg-[#14224a]/60 border border-white/5 text-xs text-slate-300">
            <div className="flex justify-between font-semibold text-white mb-1">
              <span>Trạng thái lưu trữ Offline:</span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> IndexedDB Hoạt động
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Tất cả 33 công cụ, danh sách việc, thói quen và ghi chú được lưu an toàn 100% trên máy tính của bạn.
            </p>
          </div>

          {/* Backup Actions */}
          <div className="space-y-2">
            <button
              onClick={exportBackup}
              className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-500/20"
            >
              <Download className="w-4 h-4" /> Xuất File Sao Lưu (.JSON)
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 px-4 rounded-xl bg-[#14224a] hover:bg-[#1b2b5a] text-slate-200 hover:text-white font-semibold text-xs border border-white/10 flex items-center justify-center gap-2 transition-all"
            >
              <Upload className="w-4 h-4 text-sky-400" /> Nạp Dữ Liệu Từ File Sao Lưu
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                if (confirm('Bạn có chắc muốn đặt lại dữ liệu về ban đầu?')) {
                  resetToDefault();
                  setIsSettingsOpen(false);
                }
              }}
              className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" /> Đặt Lại Dữ Liệu Gốc
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 text-right">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
