import type { BlockBuilder } from './types'
import { BemBlock } from './unchecked-builder'

export const defineBem: <r extends string>(blockName: r) => BlockBuilder<r> = /* @__PURE */ (blockName) =>
  new BemBlock(blockName) as unknown as BlockBuilder<any>

export type { BlockBuilder, BemStyle } from './types'
