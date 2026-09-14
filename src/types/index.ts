export type Priority = 'CAO' | 'VUA' | 'THUONG';

export interface TaskItem {
  id: string;
  ten: string;
  nhom: 'hom-nay' | 'tuan-nay' | 'thang-nay';
  priority: Priority;
  phut?: number;
  tag?: string;
  due?: string;
  trongTam?: boolean;
  done: boolean;
  createdAt: number;
}

export interface HabitItem {
  id: string;
  ten: string;
  icon: string;
  targetCount?: number;
  currentStreak: number;
  longestStreak: number;
  history: Record<string, boolean>;
}

export interface NoteItem {
  id: string;
  content: string;
  pinned?: boolean;
  createdAt: number;
}

export interface ToolItem {
  id: string;
  ten: string;
  link: string;
  icon: string;
  co?: 'nho' | 'vua' | 'lon';
  tab: string;
  ghiChu: string;
  thuTu: number;
  ghim?: boolean;
}

export interface TabItem {
  id: string;
  ten: string;
  icon: string;
  thuTu: number;
}

export interface AppStateData {
  version: number;
  updatedAt: number;
  userName: string;
  startTime: string;
  settings: {
    soundEnabled: boolean;
    lastBackupAt: number | null;
  };
  tabs: TabItem[];
  congCu: ToolItem[];
  phong: {
    viec: {
      an: boolean;
      co: string;
      tab: string;
      ghim: boolean;
      tasks: TaskItem[];
    };
    'thoi-quen': {
      an: boolean;
      co: string;
      tab: string;
      ghim: boolean;
      habits: HabitItem[];
    };
    'ghi-nhanh': {
      an: boolean;
      co: string;
      tab: string;
      ghim: boolean;
      notes: NoteItem[];
    };
  };
}
