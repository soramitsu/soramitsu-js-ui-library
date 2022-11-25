import { Expect, Equal, either } from './util'
import { Opaque } from 'type-fest'

export type Identifier<s extends string> = Opaque<s, 'id'>

export type BracketOpen = '('

export type BracketClose = ')'

export type Period = '.'

export type AnyToken = Identifier<any> | BracketClose | BracketClose | Period

type StringToCharsUnion<s extends string> = s extends `${infer head}${infer tail}`
  ? head | StringToCharsUnion<tail>
  : never

type ValidIdentifierChar = StringToCharsUnion<'abcdefghijklmnopqrstuvwxyz-0123456789'>

type FindNextToken<s extends string> = TrimLeftWhiteSpace<s> extends infer s extends string
  ? s extends `.${infer rest}`
    ? either.Left<[Period, rest]>
    : s extends `(${infer rest}`
    ? either.Left<[BracketOpen, rest]>
    : s extends `)${infer rest}`
    ? either.Left<[BracketClose, rest]>
    : TryFindLeadingIdentifier<s> extends either.Left<[infer id, infer rest]>
    ? either.Left<[id, rest]>
    : s extends ''
    ? either.Left<'EOI'>
    : either.Right<`Could not parse: ${s}`>
  : never

type test5 = Expect<Equal<FindNextToken<''>, either.Left<'EOI'>>>
type test6 = Expect<Equal<FindNextToken<' .  '>, either.Left<[Period, '  ']>>>
type test7 = Expect<Equal<FindNextToken<'v-btn'>, either.Left<[Identifier<'v-btn'>, '']>>>

type TrimLeftWhiteSpace<s extends string> = s extends `${' ' | '\n'}${infer rest}` ? TrimLeftWhiteSpace<rest> : s

type TryFindLeadingIdentifier<s extends string> = GetLeadingIdRecur<s> extends [
  infer maybe_id extends string,
  infer tail extends string,
]
  ? maybe_id extends ''
    ? either.Right<`No leading id in "${s}"`>
    : either.Left<[Identifier<maybe_id>, tail]>
  : never

type GetLeadingIdRecur<s extends string> = s extends `${infer c extends ValidIdentifierChar}${infer rest}`
  ? GetLeadingIdRecur<rest> extends [infer id_tail extends string, infer rest extends string]
    ? [`${c}${id_tail}`, rest]
    : never
  : ['', s]

type test3 = Expect<Equal<TrimLeftWhiteSpace<'     '>, ''>>
type test4 = Expect<Equal<TrimLeftWhiteSpace<' \n as '>, 'as '>>

type test8 = Expect<Equal<TryFindLeadingIdentifier<'v-btn 123'>, either.Left<[Identifier<'v-btn'>, ' 123']>>>

export type Tokenize<schema extends string> = FindNextToken<schema> extends infer result
  ? result extends either.Left<[infer token, infer rest extends string]>
    ? Tokenize<rest> extends infer next_tokens
      ? next_tokens extends either.Left<infer tokens extends any[]>
        ? either.Left<[token, ...tokens]>
        : either.Left<next_tokens>
      : never
    : result extends either.Left<'EOI'>
    ? either.Left<[]>
    : result
  : never

type test1 = Expect<
  Equal<Tokenize<`v-btn .loading`>, either.Left<[Identifier<'v-btn'>, Period, Identifier<'loading'>]>>
>

type test2 = Expect<
  Equal<
    Tokenize<`v-btn .loading(a b c)`>,
    either.Left<
      [
        Identifier<'v-btn'>,
        Period,
        Identifier<'loading'>,
        BracketOpen,
        Identifier<'a'>,
        Identifier<'b'>,
        Identifier<'c'>,
        BracketClose,
      ]
    >
  >
>

type test10 = Expect<
  Equal<
    Tokenize<`v-btn head .loading bottom`>,
    either.Left<[Identifier<'v-btn'>, Identifier<'head'>, Period, Identifier<'loading'>, Identifier<'bottom'>]>
  >
>
