import { Period, Identifier, BracketClose, BracketOpen, AnyToken, Tokenize } from './tokens'
import { ModifierBool, ModifierKeyValue, Elem, Block } from './bem-tree'
import { either, Equal } from './util'
import { Expect } from '../types'

// type TokensArray = ([]

type MatchTokens<tokens extends AnyToken[]> = tokens extends [Identifier<infer blockName>, ...infer rest]
  ? MatchBlockTokens<rest> extends infer blockTokensResult
    ? blockTokensResult extends either.Left<[infer modifiers, infer elements]>
      ? either.Left<Block<blockName, modifiers, elements>>
      : blockTokensResult
    : never
  : either.Right<'Block name expected at the beginning'>

type MatchBlockTokens<tokens extends AnyToken[]> = tokens extends [
  Period,
  infer id extends Identifier<any>,
  ...infer rest,
]
  ? MatchModifierTokens<[id, ...rest]> extends infer modifierTokensResult
    ? modifierTokensResult extends ['ok', infer new_block_modifiers, infer rest]
      ? ['ok']
      : never
    : never
  : never

// type MergeBlockTokensMatchResults

type MatchModifierTokens<tokens extends AnyToken[]> = tokens extends [
  Period,
  Identifier<infer modifierName>,
  BracketOpen,
  ...infer modifierValues extends Identifier<any>[],
  BracketClose,
  ...infer rest,
]
  ? ['ok', ConstructModifiersWithNameAndValues<modifierName, modifierValues>, rest]
  : tokens extends [Period, Identifier<infer modifierName>, ...infer rest]
  ? ['ok', ModifierBool<modifierName>, rest]
  : never

type ConstructModifiersWithNameAndValues<name extends string, values extends Identifier<any>[]> = values extends [
  Identifier<infer head>,
  ...infer tail,
]
  ? [ModifierKeyValue<name, head>, ...ConstructModifiersWithNameAndValues<name, tail>]
  : []

type test1 = Expect<
  Equal<
    //
    MatchTokens<Tokenize<'v-btn'>>,
    either.Left<Block<'v-btn', [], []>>
  >
>
