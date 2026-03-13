import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { TerminalWindow } from './TerminalWindow';
import type { GitHubUser, GitHubRepo } from '../types/github';

interface Props {
  user: GitHubUser | null;
  repos: GitHubRepo[];
}

export function StatsSection({ user, repos }: Props) {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = statsRef.current!.querySelectorAll('.stat-item');
            animate(items, {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: stagger(120),
              duration: 500,
              easing: 'easeOutCubic',
            });

            const counters = statsRef.current!.querySelectorAll('.stat-value');
            counters.forEach((el) => {
              const target = parseInt(el.getAttribute('data-target') || '0', 10);
              animate(el, {
                innerText: [0, target],
                round: 1,
                duration: 1200,
                easing: 'easeOutExpo',
              });
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [user, repos]);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

  const stats = [
    { label: 'Public Repos', value: user?.public_repos || 0 },
    { label: 'Stars Earned', value: totalStars },
    { label: 'Forks', value: totalForks },
    { label: 'Followers', value: user?.followers || 0 },
  ];

  return (
    <section className="stats-section">
      <TerminalWindow title="vladned@github ~ stats">
        <div className="terminal-line">
          <span className="prompt">$</span>
          <span> gh api user --jq '.stats'</span>
        </div>
        <div ref={statsRef} className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <span
                className="stat-value"
                data-target={stat.value}
              >
                0
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
