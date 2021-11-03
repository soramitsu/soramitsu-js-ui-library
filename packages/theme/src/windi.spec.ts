import { Processor } from 'windicss/lib'
import { windicssPluginTheme, windicssPluginTypography } from './windi'
import { ThemeVars } from './theme'

describe('Theme', () => {
  test('Generates class with specified variable', () => {
    const proc = new Processor({
      plugins: [
        windicssPluginTheme('my-theme', {
          [ThemeVars.BrandUltraBlack]: '#000',
        }),
      ],
    })

    const result = proc.interpret('s-theme-my-theme')

    expect(result.ignored).toHaveLength(0)
    expect(result.styleSheet.build()).toMatchInlineSnapshot(`
      ".s-theme-my-theme {
        --s-brand-ultra-black: #000;
      }"
    `)
  })
})

describe('Typography', () => {
  test('Matching generated blocks', () => {
    const processor = new Processor({
      plugins: [windicssPluginTypography()],
    })

    const result = processor.interpret('s-ty-d1 s-ty-p4')

    expect(result.ignored).toEqual([])
    expect(result.styleSheet.build()).toMatchInlineSnapshot(`
      ".s-ty-d1 {
        font-family: Sora;
        font-weight: bold;
        font-size: var(--s-font-size-4xl);
        letter-spacing: -0.02rem;
        line-height: 120%;
        font-feature-settings: 'tnum' on, 'lnum' on, 'salt' on, 'ss01' on, 'case' on;
      }
      .s-ty-p4 {
        font-family: Sora;
        font-weight: normal;
        font-size: var(--s-font-size-xs);
        line-height: 180%;
        font-feature-settings: 'tnum' on, 'lnum' on, 'salt' on, 'ss01' on, 'case' on;
      }"
    `)
  })
})
