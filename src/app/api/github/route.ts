import { NextResponse } from 'next/server';

export const revalidate = 300; // Cache for 5 minutes

export interface GitHubRepoItem {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
}

export async function GET() {
  const username = 'easy-web-p';

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
      headers: {
        'User-Agent': 'Portfolio-Nextjs-App',
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid response structure from GitHub');
    }

    const repos: GitHubRepoItem[] = data.map((item) => ({
      id: item.id,
      name: item.name,
      fullName: item.full_name,
      htmlUrl: item.html_url,
      description: item.description,
      language: item.language,
      stars: item.stargazers_count ?? 0,
      forks: item.forks_count ?? 0,
      updatedAt: item.updated_at,
      topics: item.topics ?? [],
    }));

    return NextResponse.json({
      success: true,
      username,
      total: repos.length,
      repos,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch GitHub repos';
    // Fallback static data if GitHub rate limits
    return NextResponse.json({
      success: true,
      username,
      fallback: true,
      error: msg,
      repos: [
        {
          id: 1,
          name: 'Queue-up',
          fullName: 'easy-web-p/Queue-up',
          htmlUrl: 'https://github.com/easy-web-p/Queue-up',
          description: 'Smart Web Queue Management Application (ระบบบริหารจัดการคิวและแจ้งเตือนเสียง)',
          language: 'JavaScript',
          stars: 1,
          forks: 0,
          updatedAt: '2026-03-01',
          topics: ['react', 'queue-management', 'audio-notification'],
        },
        {
          id: 2,
          name: 'KidGrowth_Calculator',
          fullName: 'easy-web-p/KidGrowth_Calculator',
          htmlUrl: 'https://github.com/easy-web-p/KidGrowth_Calculator',
          description: 'Child Growth & BMI Assessment Tool (เครื่องคำนวณเกณฑ์การเจริญเติบโตของเด็กตามมาตรฐาน)',
          language: 'JavaScript',
          stars: 0,
          forks: 0,
          updatedAt: '2026-02-15',
          topics: ['health-tech', 'calculator'],
        },
        {
          id: 3,
          name: 'Header-Dynamic-Navigation',
          fullName: 'easy-web-p/Header-Dynamic-Navigation',
          htmlUrl: 'https://github.com/easy-web-p/Header-Dynamic-Navigation',
          description: 'Dynamic Header Navigation Component with Smooth State Transitions',
          language: 'HTML / CSS',
          stars: 0,
          forks: 0,
          updatedAt: '2026-01-20',
          topics: ['ui-component', 'navigation'],
        },
      ],
    });
  }
}
