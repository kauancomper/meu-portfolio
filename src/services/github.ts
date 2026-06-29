// src/services/github.ts

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

const GITHUB_USERNAME = 'kauancomper';
const CACHE_KEY = 'gh-repos-cache';
const CACHE_TTL = 60 * 60 * 1000; // 1 hora

export async function fetchGithubProjects(): Promise<GithubRepo[]> {
  // Serve cache se ainda válido
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { ts, repos } = JSON.parse(cached) as { ts: number; repos: GithubRepo[] };
      if (Date.now() - ts < CACHE_TTL) return repos;
    }
  } catch { /* ignore */ }

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`);
    if (!response.ok) {
      if (response.status === 403) console.warn('Limite de taxa da API do GitHub atingido.');
      throw new Error('Falha ao carregar repositórios do GitHub');
    }

    const data = await response.json() as GithubRepo[];
    if (!Array.isArray(data)) throw new Error('Resposta inesperada da API');

    const filtered = data.filter(repo =>
      repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase() && !repo.fork
    );

    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), repos: filtered })); }
    catch { /* quota excedida — sem cache */ }

    return filtered;
  } catch (error) {
    console.error('Erro ao buscar projetos do GitHub:', error);
    return [];
  }
}

export async function fetchGithubRepo(repoName: string): Promise<GithubRepo | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
    if (!response.ok) return null;
    return await response.json() as GithubRepo;
  } catch {
    return null;
  }
}

/**
 * Retorna uma imagem de fallback baseada na linguagem do repositório
 * para manter a estética premium mesmo sem social_preview.
 */
export function getRepoLanguageImage(language: string | null): string {
  const images: Record<string, string> = {
    'TypeScript': 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800',
    'JavaScript': 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=800',
    'Python': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    'HTML': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
    'CSS': 'https://images.unsplash.com/photo-1523437113738-bbd3ee89fbbb?auto=format&fit=crop&q=80&w=800',
    'default': 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800'
  };

  return images[language || 'default'] || images['default'];
}
