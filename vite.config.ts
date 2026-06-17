import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function domainReplacePlugin(): Plugin {
  return {
    name: 'domain-replace',
    apply: 'build',
    closeBundle() {
      const domain: string | undefined = process.env.VITE_DOMAIN
      if (!domain) return
      const distDir: string = resolve(process.cwd(), 'dist')
      for (const file of ['sitemap.xml', 'robots.txt']) {
        const fp: string = resolve(distDir, file)
        if (existsSync(fp)) {
          const content: string = readFileSync(fp, 'utf-8')
          writeFileSync(fp, content.replace(/%VITE_DOMAIN%/g, domain), 'utf-8')
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), domainReplacePlugin()],
})
