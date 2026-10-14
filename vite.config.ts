import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'

const extensionlessLegalRoutes: Plugin = {
  name: 'extensionless-legal-routes',
  enforce: 'post',
  apply: 'build',
  generateBundle(_options, bundle) {
    const index = bundle['index.html']
    if (!index || index.type !== 'asset') return
    const source = typeof index.source === 'string' ? index.source : new TextDecoder().decode(index.source)

    for (const route of ['privacy', 'terms']) {
      const title = route === 'privacy' ? 'Privacy Policy · Domg.o' : 'Terms of Use · Domg.o'
      const description = route === 'privacy'
        ? 'Privacy policy for Domgo, the creator portfolio of Dominic George-Oppong.'
        : 'Terms of Use for Domgo, the creator portfolio of Dominic George-Oppong.'
      const page = source
        .replace('https://domgo.co.uk/', `https://domgo.co.uk/${route}`)
        .replace(/<meta name="description" content="[^"]*"\s*\/>/u, `<meta name="description" content="${description}" />`)
        .replace(/<meta property="og:title" content="[^"]*"\s*\/>/u, `<meta property="og:title" content="${title}" />`)
        .replace(/<meta property="og:description" content="[^"]*"\s*\/>/u, `<meta property="og:description" content="${description}" />`)
        .replace(/<meta property="og:url" content="[^"]*"\s*\/>/u, `<meta property="og:url" content="https://domgo.co.uk/${route}" />`)
        .replace(/<title>[^<]*<\/title>/u, `<title>${title}</title>`)
      this.emitFile({ type: 'asset', fileName: `${route}/index.html`, source: page })
    }
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), extensionlessLegalRoutes],
  base: '/',
})
