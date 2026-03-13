import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { TerminalWindow } from './TerminalWindow';
import type { LanguageStats } from '../types/github';

interface Props {
  languages: LanguageStats;
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

export function LanguagesSection({ languages }: Props) {
  const barsRef = useRef<HTMLDivElement>(null);

  const sorted = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const max = sorted.length > 0 ? sorted[0][1] : 1;

  useEffect(() => {
    if (!barsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = barsRef.current!.querySelectorAll('.lang-bar-fill');
            animate(bars, {
              width: ((el: Element) => (el as HTMLElement).getAttribute('data-width') || '0%') as unknown as string,
              delay: stagger(100),
              duration: 800,
              easing: 'easeOutCubic',
            });

            const rows = barsRef.current!.querySelectorAll('.lang-row');
            animate(rows, {
              opacity: [0, 1],
              translateX: [-15, 0],
              delay: stagger(80),
              duration: 400,
              easing: 'easeOutCubic',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(barsRef.current);
    return () => observer.disconnect();
  }, [languages]);

  return (
    <section className="languages-section">
      <TerminalWindow title="vladned@github ~ languages">
        <div className="terminal-line">
          <span className="prompt">$</span>
          <span> tokei --sort code | head -8</span>
        </div>
        <div ref={barsRef} className="lang-bars">
          {sorted.map(([lang, count]) => (
            <div key={lang} className="lang-row">
              <span className="lang-name">{lang}</span>
              <div className="lang-bar-track">
                <div
                  className="lang-bar-fill"
                  data-width={`${(count / max) * 100}%`}
                  style={{
                    width: 0,
                    backgroundColor: LANG_COLORS[lang] || 'var(--accent)',
                  }}
                />
              </div>
              <span className="lang-count">{count} repos</span>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
