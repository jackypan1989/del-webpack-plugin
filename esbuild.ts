import { build } from 'esbuild'

const run = async () => {
  await build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    platform: 'node',
    bundle: true,
    minify: true,
    external: ['chalk', 'del']
  })
}

run()


