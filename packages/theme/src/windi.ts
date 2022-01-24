import { Config } from 'windicss/types/interfaces'

const TYPOGRAPHY_TOKENS = [
  'd1',
  'd2',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'h7',
  'ch1',
  'ch2',
  'ch3',
  'p1',
  'p2',
  'p3',
  'p4',
  's1',
] as const

type TypographyToken = typeof TYPOGRAPHY_TOKENS extends ReadonlyArray<infer V> ? V : never

function resolveTypographyClassName(token: TypographyToken): string {
  return `sora-tpg-${token}`
}

function generateTypographyShortcuts() {
  return Object.fromEntries(TYPOGRAPHY_TOKENS.map((x) => [`sora-typography-${x}`, resolveTypographyClassName(x)]))
}

/**
 * Preset with Soramitsu UI theming related stuff
 */
export const windicssPreset: Config = {
  shortcuts: {
    ...generateTypographyShortcuts(),
  },
  theme: {
    extend: {
      // TODO extract tokens to JSON and put here some convenient bindings to **compiled** variables.
      // It is primarily useful for library users rather than for library internals, thus TODO
    },
  },
}
