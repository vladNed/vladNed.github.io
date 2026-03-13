import { type ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({ title = 'terminal', children, className = '' }: Props) {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
}
