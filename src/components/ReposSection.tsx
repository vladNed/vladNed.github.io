import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { TerminalWindow } from './TerminalWindow';
import type { GitHubRepo } from '../types/github';

interface Props {
  repos: GitHubRepo[];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Dockerfile: '#384d54',
  Makefile: '#427819',
};

export function ReposSection({ repos }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = gridRef.current!.querySelectorAll('.repo-card');
            animate(cards, {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: stagger(100),
              duration: 600,
              easing: 'easeOutCubic',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [repos]);

  return (
    <section className="repos-section">
      <TerminalWindow title="vladned@github ~ repos">
        <div className="terminal-line">
          <span className="prompt">$</span>
          <span> gh repo list --sort stars --limit 6</span>
        </div>
        <div ref={gridRef} className="repos-grid">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
            >
              <div className="repo-header">
                <span className="repo-icon">&#9656;</span>
                <span className="repo-name">{repo.name}</span>
              </div>
              {repo.description && (
                <p className="repo-desc">{repo.description}</p>
              )}
              <div className="repo-meta">
                {repo.language && (
                  <span className="repo-lang">
                    <span
                      className="lang-dot"
                      style={{
                        backgroundColor:
                          LANG_COLORS[repo.language] || 'var(--accent)',
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="repo-stars">★ {repo.stargazers_count}</span>
                )}
                {repo.forks_count > 0 && (
                  <span className="repo-forks">⑂ {repo.forks_count}</span>
                )}
              </div>
              {repo.topics.length > 0 && (
                <div className="repo-topics">
                  {repo.topics.slice(0, 4).map((t) => (
                    <span key={t} className="topic-tag">{t}</span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
