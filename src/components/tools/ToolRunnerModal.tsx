import React, { useState, useEffect } from 'react';
import { 
  X, ArrowLeft, ExternalLink, RotateCcw, Maximize2, Minimize2, 
  Sparkles, Bot, Briefcase, Heart, Home, LayoutGrid
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToolRunnerModal: React.FC = () => {
  const { activeTool, setActiveTool } = useApp();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // Close on Escape key or message from tool iframe
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTool(null);
      }
    };

    const handleMessage = (e: MessageEvent) => {
      if (e.data === 'CLOSE_TOOL_MODAL') {
        setActiveTool(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('message', handleMessage);
    };
  }, [setActiveTool]);

  if (!activeTool) return null;

  const toolUrl = activeTool.link 
    ? (activeTool.link.startsWith('http') || activeTool.link.startsWith('/') ? activeTool.link : `/${activeTool.link}`)
    : `/cong-cu/${activeTool.id}.html`;

  const isAiTool = activeTool.tab === 'tab-nhan-su-ai';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`bg-[#0d1733] border border-sky-500/30 rounded-2xl md:rounded-3xl flex flex-col shadow-2xl overflow-hidden transition-all duration-300 ${
          isFullscreen 
            ? 'w-full h-full fixed inset-0 rounded-none border-none' 
            : 'w-full max-w-6xl h-[92vh] max-h-[950px]'
        }`}
      >
        {/* Top Control Header Bar */}
        <header className="flex items-center justify-between px-4 py-3 bg-[#0a1128] border-b border-sky-500/20 text-white shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Back button */}
            <button
              onClick={() => setActiveTool(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14224a] hover:bg-[#1f3370] text-sky-300 hover:text-white text-xs font-bold border border-sky-500/30 transition-all active:scale-95 shrink-0 shadow-sm"
              title="Quay lại Bảng Điều Khiển"
            >
              <ArrowLeft className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Quay Lại Bảng Quản Trị</span>
            </button>

            <div className="h-5 w-[1px] bg-slate-700 hidden sm:block"></div>

            {/* Tool Title & Info */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm md:text-base font-extrabold text-white truncate">
                  {activeTool.ten}
                </h3>
                {isAiTool && (
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    <Sparkles className="w-3 h-3 text-emerald-400" /> Trợ Lý AI
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                {activeTool.ghiChu || 'Công cụ chuyên dụng trong hệ thống Ngôi Nhà Số'}
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Reload button */}
            <button
              onClick={() => setReloadKey(k => k + 1)}
              className="p-2 rounded-xl bg-[#14224a]/80 hover:bg-[#1e326e] text-slate-300 hover:text-white text-xs transition-colors border border-white/5"
              title="Làm mới lại công cụ"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Open in New Window Tab */}
            <a
              href={toolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14224a]/80 hover:bg-[#1e326e] text-sky-300 hover:text-white text-xs font-semibold border border-sky-500/20 transition-colors"
              title="Mở trong tab trình duyệt riêng"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Mở Tab Riêng</span>
            </a>

            {/* Fullscreen toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-[#14224a]/80 hover:bg-[#1e326e] text-slate-300 hover:text-white text-xs transition-colors border border-white/5"
              title={isFullscreen ? "Thu nhỏ cửa sổ" : "Mở rộng toàn màn hình"}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Close Modal */}
            <button
              onClick={() => setActiveTool(null)}
              className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-xs transition-colors border border-rose-500/30"
              title="Đóng công cụ (Phím ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Tool Live Workspace Body (Embedded Iframe) */}
        <div className="flex-1 w-full h-full relative bg-[#f9f8f6] overflow-hidden">
          <iframe
            key={reloadKey}
            src={toolUrl}
            title={activeTool.ten}
            className="w-full h-full border-0 absolute inset-0"
            allow="autoplay; camera; microphone; clipboard-read; clipboard-write; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          />
        </div>
      </div>
    </div>
  );
};
