import { useGitHub } from './hooks/useGitHub';
import { useTheme } from './hooks/useTheme';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { ReposSection } from './components/ReposSection';
import { LanguagesSection } from './components/LanguagesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ThemeToggle } from './components/ThemeToggle';
import { Scanlines } from './components/Scanlines';

function App() {
  const { user, repos, topRepos, languages, loading, error } = useGitHub();
  const { theme, toggle } = useTheme();

  if (loading) {
    return (
      <div className="loading-screen">
        <pre className="boot-text">
{`> BOOTING SYSTEM...
> LOADING GITHUB DATA...
> PLEASE WAIT...`}
        </pre>
        <div className="loading-cursor">█</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen">
        <pre className="boot-text error-text">
{`> ERROR: ${error}
> SYSTEM HALTED
> RETRY: refresh page`}
        </pre>
      </div>
    );
  }

  return (
    <div className="app">
      <Scanlines />
      <ThemeToggle theme={theme} toggle={toggle} />
      <Navbar />
      <main className="main-content">
        <HeroSection user={user} />
        <ProjectsSection />
        <StatsSection user={user} repos={repos} />
        <ReposSection repos={topRepos} />
        <LanguagesSection languages={languages} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
