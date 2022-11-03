import type { Simplify, CamelCase } from 'type-fest'

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

export type NotEqual<X, Y> = Equal<X, Y> extends true ? false : true

export type Expect<T extends true> = T

export type BemStyle = 'classic' | 'two-dashes'

export const BLOCK_KEY = 'block' as const

export type RootBlockKey = typeof BLOCK_KEY

type ApplyStyleToModifier<style extends BemStyle, modifier extends AnyModifier> = modifier extends ModifierBool<
  infer key
>
  ? key
  : modifier extends ModifierKeyValue<infer key, infer value>
  ? style extends 'classic'
    ? `${key}_${value}`
    : style extends 'two-dashes'
    ? `${key}--${value}`
    : never
  : never

type ApplyStyleToModifierPrefix<style extends BemStyle, prefix extends string> = style extends 'classic'
  ? `${prefix}_`
  : style extends 'two-dashes'
  ? `${prefix}--`
  : never

type ApplyStyleToElementPrefix<prefix extends string> = `${prefix}__`

type ReadonlyStringArray = readonly string[]

export interface BlockBuilder<
  in out block extends string,
  in out modifiers extends ModifiersArray = [],
  in out elements extends Elem<any, any>[] = [],
> {
  mod: {
    <key extends string>(key: key): BlockBuilder<block, AddModifier<modifiers, key>, elements>
    <key extends string, values extends ReadonlyStringArray>(key: key, values: values): BlockBuilder<
      block,
      AddModifier<modifiers, key, values>,
      elements
    >
    <key extends string, value extends string>(key: key, value: value): BlockBuilder<
      block,
      AddModifier<modifiers, key, value>,
      elements
    >
  }
  elem: {
    <name extends string>(name: name): BlockBuilder<block, modifiers, [...elements, Elem<name, []>]>
    <name extends string, builder extends ElemBuilder<any>>(
      name: name,
      fn: (elementBuilder: ElemBuilder) => builder,
    ): BlockBuilder<block, modifiers, [...elements, BuildElem<name, builder>]>
  }
  build: {
    (): BuildClasses<block, modifiers, elements, 'classic'>
    <style extends BemStyle>(style: style): BuildClasses<block, modifiers, elements, style>
  }
}

type BuildElem<name extends string, builder extends ElemBuilder<any>> = builder extends ElemBuilder<infer modifiers>
  ? Elem<name, modifiers>
  : never

interface ElemBuilder<in out modifiers extends ModifiersArray = []> {
  mod: {
    <key extends string>(key: key): ElemBuilder<AddModifier<modifiers, key>>
    <key extends string, values extends ReadonlyStringArray>(key: key, values: values): ElemBuilder<
      AddModifier<modifiers, key, values>
    >
    <key extends string, value extends string>(key: key, value: value): ElemBuilder<AddModifier<modifiers, key, value>>
  }
}

interface Elem<name extends string, modifiers extends ModifiersArray> {
  name: name
  modifiers: modifiers
}

interface ModifierKeyValue<key extends string, value extends string> {
  kind: 'modifier-k-v'
  key: key
  value: value
}

interface ModifierBool<key extends string> {
  kind: 'modifier-bool'
  key: key
}

type AnyModifier = ModifierBool<any> | ModifierKeyValue<any, any>

type ModifiersArray = Array<ModifierKeyValue<any, any> | ModifierBool<any>>

type ExpandModifiersTuple<key extends string, values extends ReadonlyStringArray> = values extends readonly [
  infer head extends string,
  ...infer tail extends ReadonlyStringArray,
]
  ? [ModifierKeyValue<key, head>, ...ExpandModifiersTuple<key, tail>]
  : []

type test14 = Expect<
  Equal<ExpandModifiersTuple<'key', ['a', 'b']>, [ModifierKeyValue<'key', 'a'>, ModifierKeyValue<'key', 'b'>]>
>

type AddModifier<
  modifiers extends ModifiersArray,
  key extends string,
  value extends ReadonlyStringArray | string | null = null,
> = value extends ReadonlyStringArray
  ? [...modifiers, ...ExpandModifiersTuple<key, value>]
  : [...modifiers, value extends string ? ModifierKeyValue<key, value> : ModifierBool<key>]

type test1 = Expect<Equal<AddModifier<[], 'foo'>, [ModifierBool<'foo'>]>>

type test2 = Expect<Equal<AddModifier<[], 'foo', 'bar'>, [ModifierKeyValue<'foo', 'bar'>]>>

type test3 = Expect<
  Equal<AddModifier<[ModifierBool<'foo'>], 'foo', 'bar'>, [ModifierBool<'foo'>, ModifierKeyValue<'foo', 'bar'>]>
>

type test4 = Expect<
  Equal<
    AddModifier<[], 'key', readonly ['foo', 'bar']>,
    [ModifierKeyValue<'key', 'foo'>, ModifierKeyValue<'key', 'bar'>]
  >
>

type BuildClasses<
  block extends string,
  modifiers extends ModifiersArray,
  elements extends Elem<any, any>[],
  style extends BemStyle,
> = Simplify<
  Record<RootBlockKey, block> &
    BuildModifierClasses<block, modifiers, style> &
    BuildElementsTupleClasses<block, elements, style>
>

type test11 = Expect<
  Equal<
    BuildClasses<
      'ro-ot',
      [ModifierKeyValue<'ke-y', 'va-lue'>],
      [Elem<'elem-1', [ModifierBool<'elem-flag'>]>],
      'classic'
    >,
    {
      block: 'ro-ot'
      block_keY_vaLue: 'ro-ot_ke-y_va-lue'
      'block_ke-y_va-lue': 'ro-ot_ke-y_va-lue'
      block__elem1: 'ro-ot__elem-1'
      'block__elem-1': 'ro-ot__elem-1'
      block__elem1_elemFlag: 'ro-ot__elem-1_elem-flag'
      'block__elem-1_elem-flag': 'ro-ot__elem-1_elem-flag'
    }
  >
>

type BuildModifierSuffixes<modifiers extends ModifiersArray, style extends BemStyle> = modifiers extends [
  infer head extends ModifierBool<any> | ModifierKeyValue<any, any>,
  ...infer tail extends ModifiersArray,
]
  ? [ApplyStyleToModifier<style, head>, ...BuildModifierSuffixes<tail, style>]
  : []

type test7 = Expect<
  Equal<
    BuildModifierSuffixes<[ModifierBool<'foo'>, ModifierKeyValue<'my-key', 'my-value'>], 'classic'>,
    ['foo', 'my-key_my-value']
  >
>

type AnyModifierToKeySuffix<
  modifier extends AnyModifier,
  preserve extends boolean = false,
> = modifier extends ModifierBool<infer key>
  ? preserve extends true
    ? key
    : CamelCase<key>
  : modifier extends ModifierKeyValue<infer key, infer value>
  ? preserve extends true
    ? `${key}_${value}`
    : `${CamelCase<key>}_${CamelCase<value>}`
  : never

type ModifiersToRecordRecur<r extends string, m extends ModifiersArray, style extends BemStyle> = m extends [
  infer head extends AnyModifier,
  ...infer tail extends ModifiersArray,
]
  ? {
      [K in `${RootBlockKey}_${AnyModifierToKeySuffix<head, boolean>}`]: `${ApplyStyleToModifierPrefix<
        style,
        r
      >}${ApplyStyleToModifier<style, head>}`
    } & ModifiersToRecordRecur<r, tail, style>
  : {}

type BuildModifierClasses<block extends string, modifiers extends ModifiersArray, style extends BemStyle> = Simplify<
  ModifiersToRecordRecur<block, modifiers, style>
>

type test10 = Expect<
  Equal<
    BuildModifierClasses<'s-table', [ModifierBool<'bool'>, ModifierKeyValue<'my-key', 'my-value'>], 'classic'>,
    {
      block_bool: 's-table_bool'
      block_myKey_myValue: 's-table_my-key_my-value'
      'block_my-key_my-value': 's-table_my-key_my-value'
    }
  >
>

type BuildSingleElementRecord<
  style extends BemStyle,
  block extends string,
  elementName extends string,
  modifier extends null | AnyModifier = null,
> = BuildSingleElementRecordWithPreserveOption<style, block, elementName, modifier, true> &
  BuildSingleElementRecordWithPreserveOption<style, block, elementName, modifier, false>

type BuildSingleElementRecordWithPreserveOption<
  style extends BemStyle,
  block extends string,
  elementName extends string,
  modifier extends null | AnyModifier,
  preserve extends boolean,
> = Record<
  `${RootBlockKey}__${preserve extends true ? elementName : CamelCase<elementName>}${modifier extends AnyModifier
    ? `_${AnyModifierToKeySuffix<modifier, preserve>}`
    : ''}`,
  `${ApplyStyleToElementPrefix<block>}${modifier extends AnyModifier
    ? `${ApplyStyleToModifierPrefix<style, elementName>}${ApplyStyleToModifier<style, modifier>}`
    : elementName}`
>

type BuildElementModifierClassesRecur<
  block extends string,
  elementName extends string,
  modifiers extends ModifiersArray,
  style extends BemStyle,
> = modifiers extends [infer head extends AnyModifier, ...infer tail extends ModifiersArray]
  ? BuildSingleElementRecord<style, block, elementName, head> &
      BuildElementModifierClassesRecur<block, elementName, tail, style>
  : {}

type BuildElementClasses<block extends string, elem extends Elem<any, any>, style extends BemStyle> = elem extends Elem<
  infer name,
  infer modifiers
>
  ? Simplify<
      BuildSingleElementRecord<style, block, name> & BuildElementModifierClassesRecur<block, name, modifiers, style>
    >
  : never

type BuildElementsTupleClassesRecur<
  block extends string,
  elements extends Elem<any, any>[],
  style extends BemStyle,
> = elements extends [infer head extends Elem<any, any>, ...infer tail extends Elem<any, any>[]]
  ? BuildElementClasses<block, head, style> & BuildElementsTupleClassesRecur<block, tail, style>
  : {}

type BuildElementsTupleClasses<
  block extends string,
  elements extends Elem<any, any>[],
  style extends BemStyle,
> = Simplify<BuildElementsTupleClassesRecur<block, elements, style>>

type test12 = Expect<
  Equal<
    BuildElementClasses<'s-table', Elem<'elem-1', [ModifierKeyValue<'key', 'value'>]>, 'classic'>,
    {
      block__elem1: 's-table__elem-1'
      'block__elem-1': 's-table__elem-1'
      block__elem1_key_value: 's-table__elem-1_key_value'
      'block__elem-1_key_value': 's-table__elem-1_key_value'
    }
  >
>
