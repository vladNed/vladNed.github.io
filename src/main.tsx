import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'

const BlogListPage = lazy(() => import('./components/BlogListPage').then(m => ({ default: m.BlogListPage })))
const BlogPostPage = lazy(() => import('./components/BlogPostPage').then(m => ({ default: m.BlogPostPage })))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Suspense fallback={
        <div className="loading-screen">
          <div className="loading-cursor">█</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </StrictMode>,
)
