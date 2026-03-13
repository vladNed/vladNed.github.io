import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TerminalWindow } from './TerminalWindow';
import { Navbar } from './Navbar';
import { getPost } from '../blog/posts';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';
import { Scanlines } from './Scanlines';
import { Footer } from './Footer';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { theme, toggle } = useTheme();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <div className="app">
        <Scanlines />
        <ThemeToggle theme={theme} toggle={toggle} />
        <Navbar />
        <main className="main-content">
          <TerminalWindow title="vladned@github ~ 404">
            <div className="terminal-line">
              <span className="prompt">$</span>
              <span> cat {slug}.md</span>
            </div>
            <p className="blog-404">cat: {slug}.md: No such file or directory</p>
            <Link to="/blog" className="blog-back">&larr; cd ~/blog</Link>
          </TerminalWindow>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Scanlines />
      <ThemeToggle theme={theme} toggle={toggle} />
      <Navbar />
      <main className="main-content">
        <TerminalWindow title={`vladned@github ~ blog/${post.slug}`}>
          <div className="terminal-line">
            <span className="prompt">$</span>
            <span> cat {post.slug}.md</span>
          </div>
          <div className="blog-post-meta">
            <span className="blog-post-date">{post.date}</span>
          </div>
          <article className="blog-post-content">
            <Markdown
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const code = String(children).replace(/\n$/, '');
                  if (match) {
                    return (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        customStyle={{
                          margin: '0.8rem 0',
                          borderRadius: '2px',
                          fontSize: '0.8rem',
                        }}
                      >
                        {code}
                      </SyntaxHighlighter>
                    );
                  }
                  return <code className={className} {...props}>{children}</code>;
                },
              }}
            >
              {post.content}
            </Markdown>
          </article>
          <Link to="/blog" className="blog-back">&larr; cd ~/blog</Link>
        </TerminalWindow>
      </main>
      <Footer />
    </div>
  );
}
