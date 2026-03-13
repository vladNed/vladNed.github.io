import { useState, useEffect } from 'react';
import type { GitHubRepo, GitHubUser, LanguageStats } from '../types/github';

const USERNAME = 'vladNed';
const API = 'https://api.github.com';

export function useGitHub() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<LanguageStats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`${API}/users/${USERNAME}`),
          fetch(`${API}/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const userData: GitHubUser = await userRes.json();
        const reposData: GitHubRepo[] = await reposRes.json();

        const ownRepos = reposData.filter((r) => !r.fork);

        const langCounts: LanguageStats = {};
        for (const repo of ownRepos) {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          }
        }

        setUser(userData);
        setRepos(ownRepos);
        setLanguages(langCounts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return { user, repos, topRepos, languages, loading, error };
}
