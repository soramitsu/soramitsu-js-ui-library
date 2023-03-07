import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/lib.ts'],
    sourcemap: true,
    dts: true,
    format: ['esm', 'cjs'],
    target: 'esnext',
    platform: 'node',
    clean: true
})