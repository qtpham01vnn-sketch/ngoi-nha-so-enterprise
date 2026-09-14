import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';
import { AppStateData, TaskItem, HabitItem, NoteItem, ToolItem } from '../types';
import { INITIAL_DATA, ALL_100_TOOLS } from '../data/initialData';

localforage.config({
  name: 'NgoiNhaSoApp',
  storeName: 'app_state'
});

interface AppContextType {
  state: AppStateData;
  currentTab: string;
  setCurrentTab: (tabId: string) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  activeTool: ToolItem | null;
  setActiveTool: (tool: ToolItem | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  
  // Handlers
  addTask: (task: Omit<TaskItem, 'id' | 'createdAt'>) => void;
  toggleTaskDone: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  toggleHabit: (habitId: string) => void;
  addNote: (content: string) => void;
  deleteNote: (noteId: string) => void;
  togglePinTool: (toolId: string) => void;
  addTool: (tool: Omit<ToolItem, 'id'>) => void;
  exportBackup: () => void;
  importBackup: (jsonData: string) => boolean;
  resetToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppStateData>(INITIAL_DATA);
  const [currentTab, setCurrentTab] = useState<string>('tab-hom-nay');
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  useEffect(() => {
    localforage.getItem<AppStateData>('nns_state').then(saved => {
      if (saved && typeof saved === 'object' && saved.version === INITIAL_DATA.version) {
        const merged = { ...INITIAL_DATA, ...saved };
        merged.tabs = INITIAL_DATA.tabs;
        merged.congCu = ALL_100_TOOLS;
        setState(merged);
      } else {
        setState(INITIAL_DATA);
        localforage.setItem('nns_state', INITIAL_DATA);
      }
    });
  }, []);

  const saveState = (newState: AppStateData) => {
    newState.updatedAt = Date.now();
    setState(newState);
    localforage.setItem('nns_state', newState);
  };

  const addTask = (task: Omit<TaskItem, 'id' | 'createdAt'>) => {
    const newTask: TaskItem = {
      ...task,
      id: 'tsk_' + Date.now(),
      createdAt: Date.now()
    };
    saveState({
      ...state,
      phong: {
        ...state.phong,
        viec: {
          ...state.phong.viec,
          tasks: [newTask, ...state.phong.viec.tasks]
        }
      }
    });
  };

  const toggleTaskDone = (taskId: string) => {
    const tasks = state.phong.viec.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
    saveState({
      ...state,
      phong: { ...state.phong, viec: { ...state.phong.viec, tasks } }
    });
  };

  const deleteTask = (taskId: string) => {
    const tasks = state.phong.viec.tasks.filter(t => t.id !== taskId);
    saveState({
      ...state,
      phong: { ...state.phong, viec: { ...state.phong.viec, tasks } }
    });
  };

  const toggleHabit = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const habits = state.phong['thoi-quen'].habits.map(h => {
      if (h.id === habitId) {
        const hist = { ...h.history };
        let streak = h.currentStreak || 0;
        if (hist[today]) {
          delete hist[today];
          streak = Math.max(0, streak - 1);
        } else {
          hist[today] = true;
          streak += 1;
        }
        return { ...h, history: hist, currentStreak: streak, longestStreak: Math.max(streak, h.longestStreak || 0) };
      }
      return h;
    });
    saveState({
      ...state,
      phong: { ...state.phong, 'thoi-quen': { ...state.phong['thoi-quen'], habits } }
    });
  };

  const addNote = (content: string) => {
    const newNote: NoteItem = { id: 'n_' + Date.now(), content, createdAt: Date.now() };
    saveState({
      ...state,
      phong: { ...state.phong, 'ghi-nhanh': { ...state.phong['ghi-nhanh'], notes: [newNote, ...state.phong['ghi-nhanh'].notes] } }
    });
  };

  const deleteNote = (noteId: string) => {
    const notes = state.phong['ghi-nhanh'].notes.filter(n => n.id !== noteId);
    saveState({
      ...state,
      phong: { ...state.phong, 'ghi-nhanh': { ...state.phong['ghi-nhanh'], notes } }
    });
  };

  const togglePinTool = (toolId: string) => {
    const congCu = state.congCu.map(t => t.id === toolId ? { ...t, ghim: !t.ghim } : t);
    saveState({ ...state, congCu });
  };

  const addTool = (tool: Omit<ToolItem, 'id'>) => {
    const newTool: ToolItem = { ...tool, id: 'tool_' + Date.now() };
    saveState({ ...state, congCu: [newTool, ...state.congCu] });
  };

  const exportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const a = document.createElement('a');
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `ngoi_nha_so_tuanpham_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    saveState({
      ...state,
      settings: { ...state.settings, lastBackupAt: Date.now() }
    });
  };

  const importBackup = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed && parsed.tabs && parsed.congCu) {
        saveState(parsed);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const resetToDefault = () => {
    saveState(INITIAL_DATA);
  };

  return (
    <AppContext.Provider value={{
      state, currentTab, setCurrentTab, activeView, setActiveView,
      activeTool, setActiveTool, searchTerm, setSearchTerm,
      isSettingsOpen, setIsSettingsOpen,
      addTask, toggleTaskDone, deleteTask,
      toggleHabit, addNote, deleteNote,
      togglePinTool, addTool, exportBackup, importBackup, resetToDefault
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
