import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { TerminalWindow } from './TerminalWindow';
import { TypewriterText } from './TypewriterText';
import type { GitHubUser } from '../types/github';

interface Props {
  user: GitHubUser | null;
}

export function HeroSection({ user }: Props) {
  const asciiRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!asciiRef.current) return;
    const lines = asciiRef.current.querySelectorAll('.ascii-line');
    animate(lines, {
      opacity: [0, 1],
      translateX: [-20, 0],
      delay: stagger(80),
      duration: 600,
      easing: 'easeOutCubic',
    });
  }, []);

  const bonsaiArt = [
    '         ,####,',
    '        ,##._.##,',
    '       ,##.   .##,',
    '      ,##  .  . ##,',
    '       \'##.   .##\'',
    '        \'##._.##\'',
    '          \'####\'',
    '            ||',
    '            ||',
    '      ------||------',
    '      |  ________  |',
    '      \\____________/',
  ];

  return (
    <section className="hero-section">
      <TerminalWindow title="vladned@github ~ intro">
        {user?.avatar_url && (
          <div className="hero-avatar-row">
            <img
              src={user.avatar_url}
              alt={user.name || 'vladNed'}
              className="hero-avatar"
            />
          </div>
        )}
        <div className="hero-content">
          <pre ref={asciiRef} className="ascii-art" aria-hidden="true">
            {bonsaiArt.map((line, i) => (
              <span key={i} className="ascii-line">{line}{'\n'}</span>
            ))}
          </pre>
          <div className="hero-text">
            <div className="terminal-line">
              <span className="prompt">$</span>
              <TypewriterText text=" whoami" speed={80} />
            </div>
            <h1 className="hero-name">
              <TypewriterText
                text={user?.name || 'vladNed'}
                speed={60}
                delay={800}
              />
            </h1>
            <div className="terminal-line">
              <span className="prompt">$</span>
              <TypewriterText text=" cat tagline.txt" speed={60} delay={1800} />
            </div>
            <p className="hero-tagline">
              <TypewriterText text="zen like a bonsai" speed={50} delay={2800} />
            </p>
            {user?.bio && (
              <>
                <div className="terminal-line">
                  <span className="prompt">$</span>
                  <TypewriterText text=" cat bio.txt" speed={60} delay={3800} />
                </div>
                <p className="hero-bio">
                  <TypewriterText text={user.bio} speed={30} delay={4600} />
                </p>
              </>
            )}
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
}
