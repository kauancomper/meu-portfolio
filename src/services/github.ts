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
}

const GITHUB_USERNAME = 'kauancomper';

export async function fetchGithubProjects(): Promise<GithubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`);
    if (!response.ok) {
      if (response.status === 403) {
        console.warn('Limite de taxa da API do GitHub atingido.');
      }
      throw new Error('Falha ao carregar repositórios do GitHub');
    }
    
    const data: GithubRepo[] = await response.json();
    
    // Filtragem refinada:
    // 1. Remove o repositório do perfil (kauancomper/kauancomper)
    // 2. Remove forks (opcional, mas geralmente melhor para portfólio)
    // 3. Garante que tenha descrição ou seja um dos projetos principais que vimos
    const filtered = data.filter((repo: any) => 
      repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase() && 
      !repo.fork &&
      (repo.description || repo.stargazers_count > 0)
    );

    return filtered;
  } catch (error) {
    console.error('Erro ao buscar projetos do GitHub:', error);
    return [];
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
