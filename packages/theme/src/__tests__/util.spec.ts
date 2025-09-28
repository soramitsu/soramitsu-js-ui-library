import { describe, expect, test } from '@jest/globals'
import sass from 'sass'
import path from 'node:path'

function compile(fragment: string) {
  const loadPath = path.resolve(__dirname, '../sass')
  return sass.compileString(`@use 'util' as util;\n${fragment}`, {
    style: 'expanded',
    loadPaths: [loadPath],
  })
}

describe('map-filter-non-null-values', () => {
  test('keeps null entries only', () => {
    const result = compile(`
      @use 'sass:meta';
      $values: (
        'keep': null,
        'drop-string': '',
        'drop-zero': 0,
        'drop-false': false,
      );

      $filtered: util.map-filter-non-null-values($values);
      :root { content: meta.inspect($filtered); }
    `)

    expect(result.css).toContain('"keep": null')
    expect(result.css).not.toContain('drop-string')
    expect(result.css).not.toContain('drop-zero')
    expect(result.css).not.toContain('drop-false')
  })

  test('ignores already empty maps', () => {
    const result = compile(`
      @use 'sass:meta';
      $values: ();
      $filtered: util.map-filter-non-null-values($values);
      :root { content: meta.inspect($filtered); }
    `)

    expect(result.css).toContain('()')
  })
})
