import sass from 'sass'
import path from 'path'

function resolveUrl(relativePath: string): URL {
  return new URL('file://' + path.resolve(__dirname, relativePath))
}

function compileInline(source: string, syntax: sass.Syntax = 'scss'): string {
  const result = sass.compileString(source, {
    syntax,
    importers: [
      {
        findFileUrl: (url) => {
          switch (url) {
            case 'v_lib':
              return resolveUrl('../lib.scss')
            case 'v_util':
              return resolveUrl('../util.scss')
            default:
              return null
          }
        },
      },
    ],
  })

  return result.css
}

describe('Exports', () => {
  test('token-as-var() returns a correct variable name', () => {
    expect(
      compileInline(
        `
        @use 'v_lib' as l
        body
          color: #{l.token-as-var('sys.color.primary')}
      `,
        'indented',
      ),
    ).toMatchInlineSnapshot(`
      "body {
        color: var(\\"--sora_sys_color_primary\\");
      }"
    `)
  })

  test('eval-tokens() throws due to incompleteness of the tree', () => {
    expect(() =>
      compileInline(`
        @use 'v_lib' as l;
        :root {
          @include l.eval-tokens(
            (
              'sys': (
                'color': (
                  'primary': red,
                ),
              ),
            )
          );
        }
      `),
    ).toThrowError(/Provided tokens data is incomplete/)
  })

  test('eval-tokens-partial() completes ok', () => {
    expect(
      compileInline(`
        @use 'v_lib' as l;

        :root {
          @include l.eval-tokens-partial(
            (
              'sys': (
                'color': (
                  'primary': red,
                ),
              ),
            )
          );
        }`),
    ).toMatchInlineSnapshot(`
      ":root {
        --sora_sys_color_primary: red;
      }"
    `)
  })

  test('light tokens preset matches to snapshot', () => {
    expect(
      compileInline(`
        @use 'v_lib' as l;
        :root {
          @include l.tokens-preset-light;
        }
      `),
    ).toMatchInlineSnapshot(`
      ":root {
        --sora_sys_color_primary: #d0021b;
        --sora_sys_color_primary-hover: #c6021a;
        --sora_sys_color_primary-pressed: #bb0218;
        --sora_sys_color_primary-focused: #b10217;
        --sora_sys_color_primary-background: #fae6e8;
        --sora_sys_color_primary-hover-background: #f6ccd1;
        --sora_sys_color_primary-pressed-background: #f1b3bb;
        --sora_sys_color_primary-focused-background: #ec9aa4;
        --sora_sys_color_content-primary: #2d2926;
        --sora_sys_color_content-secondary: #53565a;
        --sora_sys_color_content-tertiary: #75787b;
        --sora_sys_color_content-quaternary: #a3a4a8;
        --sora_sys_color_content-on-background-inverted: #fff;
        --sora_sys_color_background: #f5f7f8;
        --sora_sys_color_background-hover: #eceff0;
        --sora_sys_color_background-inverted: #4e4e4e;
        --sora_sys_color_border-primary: #dde0e1;
        --sora_sys_color_border-secondary: #eceff0;
        --sora_sys_color_disabled: #f5f7f8;
        --sora_sys_color_on-disabled: #a3a4a8;
        --sora_sys_color_body: #fff;
        --sora_sys_color_surface: #fff;
        --sora_sys_color_surface-overlay: rgba(255, 255, 255, 0.7);
        --sora_sys_color_overlay: rgba(0, 0, 0, 0.45);
        --sora_sys_color_success: #009900;
        --sora_sys_color_success-background: #ddf4dd;
        --sora_sys_color_success-background-hover: #b2f1b2;
        --sora_sys_color_warning: #ff9900;
        --sora_sys_color_warning-background: #fff2df;
        --sora_sys_color_warning-background-hover: #ffe3ba;
        --sora_sys_color_error: #ff0000;
        --sora_sys_color_error-background: #fff9fa;
        --sora_sys_color_error-background-hover: #ffd9df;
        --sora_sys_color_info: #1070ca;
        --sora_sys_color_info-background: #f3f6ff;
        --sora_sys_color_info-background-hover: #dbe4ff;
        --sora_sys_shadow_page-header: 0px 24px 80px rgba(10, 2, 34, 0.0700000003);
        --sora_sys_shadow_floating-notification: 0px 68px 80px rgba(24, 24, 29, 0.0900000036);
        --sora_sys_shadow_dropdown: 0px 0px 4px rgba(45, 41, 38, 0.0799999982);
        --sora_sys_shadow_active-tab: 0px 1px 1px rgba(83, 86, 90, 0.1000000015);
      }"
    `)
  })

  test("typography('d2') succeeds", () => {
    expect(
      compileInline(`
        @use 'v_lib' as l;
        @include l.typography('d2') {
          font-family: Sora;
          font-size: 36px;
        }
      `),
    ).toMatchInlineSnapshot(`
      ".sora-tpg-d2 {
        font-family: Sora;
        font-size: 36px;
      }"
    `)
  })

  test("typography('regulus') fails", () => {
    expect(() => compileInline(`@use 'v_lib' as l; @include l.typography('regulus');`)).toThrowError(
      /Wrong typography token: "regulus"/,
    )
  })

  test('typography default preset matches snapshot', () => {
    expect(compileInline(`@use 'v_lib' as l; @include l.typography-preset-default;`)).toMatchInlineSnapshot(`
      ".sora-tpg-d1 {
        font-family: Sora;
        font-size: 40px;
        font-weight: bold;
        line-height: 120%;
        letter-spacing: -2%;
      }

      .sora-tpg-d2 {
        font-family: Sora;
        font-size: 30px;
        font-weight: bold;
        line-height: 130%;
        letter-spacing: -4%;
      }

      .sora-tpg-h1 {
        font-family: Sora;
        font-size: 36px;
        font-weight: 400;
        line-height: 120%;
        letter-spacing: -4%;
      }

      .sora-tpg-h2 {
        font-family: Sora;
        font-size: 30px;
        font-weight: 400;
        line-height: 130%;
        letter-spacing: -4%;
      }

      .sora-tpg-h3 {
        font-family: Sora;
        font-size: 24px;
        font-weight: 400;
        line-height: 130%;
        letter-spacing: -2%;
      }

      .sora-tpg-h4 {
        font-family: Sora;
        font-size: 18px;
        font-weight: 400;
        line-height: 150%;
        letter-spacing: -2%;
      }

      .sora-tpg-h5 {
        font-family: Sora;
        font-size: 16px;
        font-weight: 400;
        line-height: 150%;
        letter-spacing: 1%;
      }

      .sora-tpg-h6 {
        font-family: Sora;
        font-size: 14px;
        font-weight: 400;
        line-height: 150%;
        letter-spacing: 0;
      }

      .sora-tpg-h7 {
        font-family: Sora;
        font-size: 12px;
        font-weight: 400;
        line-height: 150%;
        letter-spacing: 0;
      }

      .sora-tpg-ch1 {
        font-family: Sora;
        font-size: 14px;
        font-weight: bold;
        line-height: 130%;
        letter-spacing: 1%;
        text-transform: uppercase;
      }

      .sora-tpg-ch2 {
        font-family: Sora;
        font-size: 12px;
        font-weight: bold;
        line-height: 130%;
        letter-spacing: 3%;
        text-transform: uppercase;
      }

      .sora-tpg-ch3 {
        font-family: Sora;
        font-size: 10px;
        font-weight: bold;
        line-height: 140%;
        letter-spacing: 6%;
        text-transform: uppercase;
      }

      .sora-tpg-p1 {
        font-family: Sora;
        font-size: 16px;
        font-weight: 400;
        line-height: 170%;
        letter-spacing: 0;
      }

      .sora-tpg-p2 {
        font-family: Sora;
        font-size: 14px;
        font-weight: 600;
        line-height: 180%;
        letter-spacing: 0;
      }

      .sora-tpg-p3 {
        font-family: Sora;
        font-size: 14px;
        font-weight: 400;
        line-height: 180%;
        letter-spacing: 0;
      }

      .sora-tpg-p4 {
        font-family: Sora;
        font-size: 12px;
        font-weight: 400;
        line-height: 180%;
        letter-spacing: 0;
      }

      .sora-tpg-s1 {
        font-family: Sora;
        font-size: 15px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0;
      }"
    `)
  })
})

describe('Utils', () => {
  test('full tokens tree evaluation - ok', () => {
    expect(
      compileInline(`
        @use 'v_util' as util;

        $src: (
          'sys.color.primary': '--scp',
          'sys.color.secondary': '--scs',
        );

        $values: (
          'sys.color.primary': red,
          'sys.color.secondary': blue
        );
        
        :root {
          @include util.eval-tokens($src, $values)
        }
      `),
    ).toMatchInlineSnapshot(`
      ":root {
        --scp: red;
        --scs: blue;
      }"
    `)
  })

  test('full tokens tree evaluation - error if there are excessive tokens', () => {
    expect(() =>
      compileInline(`
        @use 'v_util' as util;

        $src: (
          'sys.color.primary': '--scp',
          'sys.color.secondary': '--scs',
        );

        $values: (
          'sys.color.primary': red,
          'sys.color.secondary': blue,
          'sys.color.tertiary': green
        );
        
        :root {
          @include util.eval-tokens($src, $values)
        }
      `),
    ).toThrowError(/excessive/)
  })

  test('partial tokens tree evaluation - ok', () => {
    expect(
      compileInline(`
        @use 'v_util' as util;

        $src: (
          'sys.color.primary': '--scp',
          'sys.color.secondary': '--scs',
        );

        $values: (
          'sys.color.secondary': blue
        );
        
        :root {
          @include util.eval-tokens($src, $values, true)
        }
      `),
    ).toMatchInlineSnapshot(`
      ":root {
        --scs: blue;
      }"
    `)
  })

  test('partial tokens tree evaluation - fails if there are excessive tokens', () => {
    expect(() =>
      compileInline(`
        @use 'v_util' as util;

        $src: (
          'sys.color.primary': '--scp',
          'sys.color.secondary': '--scs',
        );

        $values: (
          'sys.color.tertiary': green
        );
        
        :root {
          @include util.eval-tokens($src, $values, true)
        }
    `),
    ).toThrowError(/excessive/)
  })

  describe('lists-diff', () => {
    test('works correct if there are equal elements on 0 index', () => {
      expect(
        compileInline(`
          @use 'v_util' as util;
          body {
            color: util.lists-diff(red blue, red green);
          }
      `),
      ).toMatchInlineSnapshot(`
        "body {
          color: blue;
        }"
      `)
    })
  })
})
