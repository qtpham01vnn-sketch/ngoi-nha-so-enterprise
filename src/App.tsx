import React from 'react';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { ToolRunnerModal } from './components/tools/ToolRunnerModal';
import { SettingsModal } from './components/settings/SettingsModal';

export const AppContent: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#0b132b] text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 px-3 sm:px-4 lg:px-8 py-4 sm:py-6 max-w-7xl w-full mx-auto pb-24 lg:pb-8">
          <OverviewDashboard />
        </main>

        <MobileNav />
      </div>

      {/* Global Modals */}
      <ToolRunnerModal />
      <SettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
