import type { Simplify, CamelCase } from 'type-fest'

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

export type Expect<T extends true> = T

export type BemStyle = 'classic' | 'two-dashes'

export const BLOCK_KEY = 'block' as const

export type RootBlockKey = typeof BLOCK_KEY

type ApplyStyleToModifier<style extends BemStyle, m extends AnyModifier> = m extends ModifierBool<infer k>
  ? k
  : m extends ModifierKeyValue<infer k, infer v>
  ? style extends 'classic'
    ? `${k}_${v}`
    : style extends 'two-dashes'
    ? `${k}--${v}`
    : never
  : never

type ApplyStyleToModifierPrefix<style extends BemStyle, r extends string> = style extends 'classic'
  ? `${r}_`
  : style extends 'two-dashes'
  ? `${r}--`
  : never

type ApplyStyleToElementPrefix<style extends BemStyle, r extends string> = `${r}__`

export interface BlockBuilder<r extends string, mm extends ModifiersArray = [], ee extends BuiltElem<any, any>[] = []> {
  mod: {
    <b extends AnyBlockBuilder, m extends string>(this: b, key: m): ExtendBlockWithModifier<b, m>
    <b extends AnyBlockBuilder, m extends string, v extends string>(this: b, key: m, value: v): ExtendBlockWithModifier<
      b,
      m,
      v
    >
  }
  elem: {
    <b extends AnyBlockBuilder, n extends string>(this: b, name: n): ExtendBlockWithElement<b, BuiltElem<n, []>>
    <b extends AnyBlockBuilder, n extends string, e extends ElemBuilder<any>>(
      this: b,
      name: n,
      fn: (elementBuilder: ElemBuilder) => e,
    ): ExtendBlockWithElement<b, BuildElement<n, e>>
  }
  build: {
    <b extends AnyBlockBuilder>(this: b): BuildClasses<b, 'classic'>
    <b extends AnyBlockBuilder, s extends BemStyle>(this: b, style: s): BuildClasses<b, s>
  }
}

type AnyBlockBuilder = BlockBuilder<any, any, any>

type ExtendBlockWithElement<b extends AnyBlockBuilder, e extends BuiltElem<any, any>> = b extends BlockBuilder<
  infer r,
  infer m,
  infer ee
>
  ? BlockBuilder<r, m, [...ee, e]>
  : never

type BuildElement<n extends string, b extends ElemBuilder<any>> = b extends ElemBuilder<infer m>
  ? BuiltElem<n, m>
  : never

interface ElemBuilder<mm extends ModifiersArray = []> {
  mod: {
    <b extends AnyElemBuilder, k extends string>(this: b, key: k): ExtendElemWithModifier<b, k>
    <b extends AnyElemBuilder, k extends string, v extends string>(this: b, key: k, value: v): ExtendElemWithModifier<
      b,
      k,
      v
    >
  }
}

type AnyElemBuilder = ElemBuilder<any>

interface BuiltElem<n extends string, m extends ModifiersArray> {
  name: n
  modifiers: m
}

interface ModifierKeyValue<M extends string, V extends string> {
  kind: 'modifier-k-v'
  key: M
  value: V
}

interface ModifierBool<M extends string> {
  kind: 'modifier-bool'
  key: M
}

type AnyModifier = ModifierBool<any> | ModifierKeyValue<any, any>

type ExtendElemWithModifier<
  e extends ElemBuilder<any>,
  k extends string,
  v extends string | null = null,
> = e extends ElemBuilder<infer m> ? ElemBuilder<AddModifier<m, k, v>> : never

type ExtendBlockWithModifier<
  builder extends AnyBlockBuilder,
  key extends string,
  value extends string | null = null,
> = builder extends BlockBuilder<infer root, infer modifiers, infer elements>
  ? BlockBuilder<root, AddModifier<modifiers, key, value>, elements>
  : never

type ModifiersArray = Array<ModifierKeyValue<any, any> | ModifierBool<any>>

type AddModifier<m extends ModifiersArray, k extends string, v extends string | null = null> = [
  ...m,
  v extends string ? ModifierKeyValue<k, v> : ModifierBool<k>,
]

type test1 = Expect<Equal<AddModifier<[], 'foo'>, [ModifierBool<'foo'>]>>

type test2 = Expect<Equal<AddModifier<[], 'foo', 'bar'>, [ModifierKeyValue<'foo', 'bar'>]>>

type test3 = Expect<
  Equal<AddModifier<[ModifierBool<'foo'>], 'foo', 'bar'>, [ModifierBool<'foo'>, ModifierKeyValue<'foo', 'bar'>]>
>

type BuildClasses<b extends AnyBlockBuilder, style extends BemStyle> = b extends BlockBuilder<
  infer r,
  infer mm,
  infer ee
>
  ? Simplify<{ [k in RootBlockKey]: r } & BuildModifierClasses<r, mm, style> & BuildElementsTupleClasses<r, ee, style>>
  : never

type test11 = Expect<
  Equal<
    BuildClasses<
      BlockBuilder<'ro-ot', [ModifierKeyValue<'ke-y', 'va-lue'>], [BuiltElem<'elem-1', [ModifierBool<'elem-flag'>]>]>,
      'classic'
    >,
    {
      block: 'ro-ot'
      block_keY_vaLue: 'ro-ot_ke-y_va-lue'
      block__elem1: 'ro-ot__elem-1'
      block__elem1_elemFlag: 'ro-ot__elem-1_elem-flag'
    }
  >
>

type BuildModifierSuffixes<m extends ModifiersArray, style extends BemStyle> = m extends [
  infer h extends ModifierBool<any> | ModifierKeyValue<any, any>,
  ...infer t extends ModifiersArray,
]
  ? [ApplyStyleToModifier<style, h>, ...BuildModifierSuffixes<t, style>]
  : []

type test7 = Expect<
  Equal<
    BuildModifierSuffixes<[ModifierBool<'foo'>, ModifierKeyValue<'my-key', 'my-value'>], 'classic'>,
    ['foo', 'my-key_my-value']
  >
>

type AnyModifierToKeySuffix<t extends AnyModifier> = t extends ModifierBool<infer k>
  ? CamelCase<k>
  : t extends ModifierKeyValue<infer k, infer v>
  ? `${CamelCase<k>}_${CamelCase<v>}`
  : never

type ModifiersToRecordRecur<r extends string, m extends ModifiersArray, style extends BemStyle> = m extends [
  infer head extends AnyModifier,
  ...infer tail extends ModifiersArray,
]
  ? {
      [K in `${RootBlockKey}_${AnyModifierToKeySuffix<head>}`]: `${ApplyStyleToModifierPrefix<
        style,
        r
      >}${ApplyStyleToModifier<style, head>}`
    } & ModifiersToRecordRecur<r, tail, style>
  : {}

type BuildModifierClasses<r extends string, m extends ModifiersArray, style extends BemStyle> = Simplify<
  ModifiersToRecordRecur<r, m, style>
>

type test10 = Expect<
  Equal<
    BuildModifierClasses<'s-table', [ModifierBool<'bool'>, ModifierKeyValue<'my-key', 'my-value'>], 'classic'>,
    {
      block_bool: 's-table_bool'
      block_myKey_myValue: 's-table_my-key_my-value'
    }
  >
>

type BuildSingleElementRecord<
  style extends BemStyle,
  r extends string,
  n extends string,
  m extends null | AnyModifier = null,
> = {
  [k in `${RootBlockKey}__${CamelCase<n>}${m extends AnyModifier
    ? `_${AnyModifierToKeySuffix<m>}`
    : ''}`]: `${ApplyStyleToElementPrefix<style, r>}${m extends AnyModifier
    ? `${ApplyStyleToModifierPrefix<style, n>}${ApplyStyleToModifier<style, m>}`
    : n}`
}

type BuildElementModifierClassesRecur<
  r extends string,
  n extends string,
  mm extends ModifiersArray,
  style extends BemStyle,
> = mm extends [infer head extends AnyModifier, ...infer tail extends ModifiersArray]
  ? BuildSingleElementRecord<style, r, n, head> & BuildElementModifierClassesRecur<r, n, tail, style>
  : {}

type BuildElementClasses<r extends string, e extends BuiltElem<any, any>, style extends BemStyle> = e extends BuiltElem<
  infer n,
  infer mm
>
  ? Simplify<BuildSingleElementRecord<style, r, n> & BuildElementModifierClassesRecur<r, n, mm, style>>
  : never

type BuildElementsTupleClassesRecur<
  r extends string,
  ee extends BuiltElem<any, any>[],
  style extends BemStyle,
> = ee extends [infer head extends BuiltElem<any, any>, ...infer tail extends BuiltElem<any, any>[]]
  ? BuildElementClasses<r, head, style> & BuildElementsTupleClassesRecur<r, tail, style>
  : {}

type BuildElementsTupleClasses<r extends string, ee extends BuiltElem<any, any>[], style extends BemStyle> = Simplify<
  BuildElementsTupleClassesRecur<r, ee, style>
>

type test12 = Expect<
  Equal<
    BuildElementClasses<'s-table', BuiltElem<'elem-1', [ModifierKeyValue<'key', 'value'>]>, 'classic'>,
    {
      block__elem1: 's-table__elem-1'
      block__elem1_key_value: 's-table__elem-1_key_value'
    }
  >
>
