import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import { TerminalWindow } from './TerminalWindow';
import { Navbar } from './Navbar';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';
import { Scanlines } from './Scanlines';
import { Footer } from './Footer';
import { posts } from '../blog/posts';

export function BlogListPage() {
  const { theme, toggle } = useTheme();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll('.blog-item');
    animate(items, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(100),
      duration: 500,
      easing: 'easeOutCubic',
    });
  }, []);

  return (
    <div className="app">
      <Scanlines />
      <ThemeToggle theme={theme} toggle={toggle} />
      <Navbar />
      <main className="main-content">
        <TerminalWindow title="vladned@github ~ blog">
          <div className="terminal-line">
            <span className="prompt">$</span>
            <span> ls ~/blog/</span>
          </div>
          <div ref={listRef} className="blog-list">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="blog-item"
              >
                <div className="blog-item-header">
                  <span className="blog-item-date">{post.date}</span>
                  <span className="blog-item-title">{post.title}</span>
                </div>
                <p className="blog-item-summary">{post.summary}</p>
              </Link>
            ))}
          </div>
        </TerminalWindow>
      </main>
      <Footer />
    </div>
  );
}
