interface Props {
  theme: 'light' | 'dark';
  toggle: () => void;
}

export function ThemeToggle({ theme, toggle }: Props) {
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === 'dark' ? '[ ☀ light ]' : '[ ☾ dark ]'}
    </button>
  );
}
