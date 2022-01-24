import { Processor } from 'windicss/lib'
import { windicssPreset } from './windi'

describe('Typography shortcuts', () => {
  test.only('When using preset, then typography shortcut is replaced', () => {
    const proc = new Processor({
      presets: [windicssPreset],
    })

    const result = proc.validate('sora-typography-p1')

    // just ensure that this class is not ignored
    // idk how to test shortcuts replacement :<
    expect(result.success).toHaveLength(1)
    expect(result.ignored).toHaveLength(0)
  })
})
