import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

/** Used only at build time by scripts/prerender.mjs to produce static HTML per route. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}

export { SITE } from './data/site'
export { FAQS } from './data/faqs'
export { PLANS } from './data/plans'
export { VIDEOS } from './data/videos'
export { CEO } from './data/about'
