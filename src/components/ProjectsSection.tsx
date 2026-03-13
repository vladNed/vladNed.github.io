import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { TerminalWindow } from './TerminalWindow';

const projects = [
  {
    name: 'SafeFiles',
    url: 'https://safefiles.app',
    icon: 'https://safefiles.app/logo-main.png',
    description:
      'A WeTransfer alternative that\'s simple & privacy first. Peer-to-peer file sharing directly between browsers with end-to-end encryption and no server storage.',
  },
  {
    name: 'fastapi-endpoints',
    url: 'https://vladned.github.io/fastapi-endpoints/',
    icon: 'https://vladned.github.io/fastapi-endpoints/assets/logo-black.png',
    description:
      'A lightweight file-based router for FastAPI. Automatically discovers and registers routes based on your project\'s directory structure.',
  },
];

export function ProjectsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = gridRef.current!.querySelectorAll('.project-card');
            animate(cards, {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: stagger(150),
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
  }, []);

  return (
    <section className="projects-section">
      <TerminalWindow title="vladned@github ~ launched">
        <div className="terminal-line">
          <span className="prompt">$</span>
          <span> ls ~/projects/launched/</span>
        </div>
        <div ref={gridRef} className="projects-grid">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-header">
                <img
                  src={project.icon}
                  alt=""
                  className="project-icon"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="project-name">{project.name}</span>
                <span className="project-status">● LIVE</span>
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="project-url">{project.url.replace('https://', '')}</div>
            </a>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
