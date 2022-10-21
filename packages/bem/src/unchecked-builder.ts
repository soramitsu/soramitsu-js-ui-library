import { BemStyle, RootBlockKey, BLOCK_KEY } from './types'
import { camelize } from 'fast-case'

type BemRecord = Record<StartsWithBlock, string>

type StartsWithBlock = `${RootBlockKey}${string}`

export class BemBlock {
  public readonly root: string
  public readonly modifiers: BemModifier[] = []
  public readonly elements: BemElement[] = []

  public constructor(root: string) {
    this.root = root
  }

  public mod(key: string, value?: string): BemBlock {
    this.modifiers.push(new BemModifier(key, value))
    return this
  }

  public elem(name: string, fn?: (el: BemElement) => BemElement): BemBlock {
    const el = new BemElement(name)
    this.elements.push(fn?.(el) ?? el)
    return this
  }

  public build(style: BemStyle = 'classic'): BemRecord {
    const acc: BemRecord = {}

    acc[BLOCK_KEY] = this.root

    if (this.modifiers.length) {
      const prefix = applyStyleToModifierPrefix(style, this.root)
      for (const mod of this.modifiers) {
        mod.write(acc, BLOCK_KEY, prefix, style)
      }
    }

    if (this.elements.length) {
      const prefix = applyStyleToElementPrefix(this.root)
      for (const el of this.elements) {
        el.write(acc, prefix, style)
      }
    }

    return acc
  }
}

class BemElement {
  public readonly name: string
  public readonly modifiers: BemModifier[] = []

  public constructor(name: string) {
    this.name = name
  }

  public mod(key: string, value?: string): BemElement {
    this.modifiers.push(new BemModifier(key, value))
    return this
  }

  public write(acc: BemRecord, valuePrefix: string, style: BemStyle): void {
    const keyElement: StartsWithBlock = `${BLOCK_KEY}__${camelize(this.name)}`
    const valueElement = valuePrefix + this.name

    acc[keyElement] = valueElement

    if (this.modifiers.length) {
      const prefix = applyStyleToModifierPrefix(style, valueElement)
      for (const mod of this.modifiers) {
        mod.write(acc, keyElement, prefix, style)
      }
    }
  }
}

class BemModifier {
  public readonly key: string
  public readonly value: string | null

  public constructor(key: string, value?: string) {
    this.key = key
    this.value = value ?? null
  }

  // eslint-disable-next-line max-params
  public write(acc: BemRecord, keyPrefix: StartsWithBlock, valuePrefix: string, style: BemStyle): void {
    const accKey: StartsWithBlock = this.value
      ? `${keyPrefix}_${camelize(this.key)}_${camelize(this.value)}`
      : `${keyPrefix}_${camelize(this.key)}`

    acc[accKey] = valuePrefix + applyStyleToModifier(style, this)
  }
}

function applyStyleToElementPrefix(root: string): string {
  return `${root}__`
}

function applyStyleToModifier(style: BemStyle, mod: BemModifier): string {
  return mod.value ? (style === 'classic' ? `${mod.key}_${mod.value}` : `${mod.key}--${mod.value}`) : mod.key
}

function applyStyleToModifierPrefix(style: BemStyle, pre: string): string {
  return style === 'classic' ? `${pre}_` : `${pre}--`
}
