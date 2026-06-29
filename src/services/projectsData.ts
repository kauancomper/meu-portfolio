import type { PortfolioContent } from '../data/content';

export interface ProjectLang {
  name: string;
  highlight: string;
  detail: string;
}

export interface ProjectData {
  repoName: string;
  coverImage: string;
  liveUrl: string;
  tools: string[];
  screenshots: string[];
  pt: ProjectLang;
  en: ProjectLang;
  es: ProjectLang;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface ContentOverrides {
  pt?: DeepPartial<PortfolioContent>;
  en?: DeepPartial<PortfolioContent>;
  es?: DeepPartial<PortfolioContent>;
}

export interface SiteData {
  version: number;
  projects: ProjectData[];
  overrides?: ContentOverrides;
}

const STORAGE_KEY = 'portfolio-admin-data';

// ─── Load ────────────────────────────────────────────────────────────────────

export async function loadSiteData(): Promise<SiteData> {
  // 1. localStorage tem prioridade (rascunho do admin)
  const draft = localStorage.getItem(STORAGE_KEY);
  if (draft) {
    try {
      const parsed: SiteData = JSON.parse(draft);
      if (parsed.projects !== undefined) return parsed;
    } catch { /* ignore */ }
  }

  // 2. Arquivo estático
  try {
    const res = await fetch('/site-data.json');
    if (res.ok) return await res.json() as SiteData;
  } catch { /* ignore */ }

  // 3. Legacy: projects-data.json
  try {
    const res = await fetch('/projects-data.json');
    if (res.ok) {
      const data = await res.json();
      return { version: 1, projects: data.projects ?? [], overrides: {} };
    }
  } catch { /* ignore */ }

  return { version: 2, projects: [], overrides: {} };
}

export async function loadProjects(): Promise<ProjectData[]> {
  const data = await loadSiteData();
  return data.projects;
}

export function findProject(data: ProjectData[], repoName: string): ProjectData | undefined {
  return data.find(p => p.repoName === repoName);
}

// ─── Save / Export ────────────────────────────────────────────────────────────

export function saveDraft(data: SiteData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearDraft(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportSiteData(data: SiteData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'site-data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function emptyProject(): ProjectData {
  return {
    repoName: '',
    coverImage: '',
    liveUrl: '',
    tools: [],
    screenshots: [],
    pt: { name: '', highlight: '', detail: '' },
    en: { name: '', highlight: '', detail: '' },
    es: { name: '', highlight: '', detail: '' },
  };
}
