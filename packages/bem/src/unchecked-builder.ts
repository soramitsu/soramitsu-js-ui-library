import { BemStyle } from './types'
import { camelize } from 'fast-case'

type BemRecord = Record<string, string>

export class BemBlock {
  public readonly root: string
  public readonly modifiers: BemModifier[] = []
  public readonly elements: BemElement[] = []

  public constructor(root: string) {
    this.root = root
  }

  public mod(key: string, maybeArrayValue?: string | string[]): BemBlock {
    pushModifiers(this.modifiers, key, maybeArrayValue)
    return this
  }

  public elem(name: string, fn?: (el: BemElement) => BemElement): BemBlock {
    const el = new BemElement(name)
    this.elements.push(fn?.(el) ?? el)
    return this
  }

  /**
   * Could be optimized with lazy-evaluation and `Proxy`?
   */
  public build(style: BemStyle = 'classic'): BemRecord {
    const acc: BemRecord = {}

    acc._ = this.root

    if (this.modifiers.length) {
      const prefix = applyStyleToModifierPrefix(style, this.root)
      const opts = { acc, keyPrefix: '', valuePrefix: prefix, style }
      for (const mod of this.modifiers) {
        mod.write(opts)
        mod.write({ ...opts, preserve: true })
      }
    }

    if (this.elements.length) {
      const prefix = applyStyleToElementPrefix(this.root)
      const opts = { acc, valuePrefix: prefix, style }
      for (const el of this.elements) {
        el.write(opts)
        el.write({ ...opts, preserve: true })
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

  public mod(key: string, maybeArrayValue?: string | string[]): BemElement {
    pushModifiers(this.modifiers, key, maybeArrayValue)
    return this
  }

  public write({
    acc,
    valuePrefix,
    style,
    preserve,
  }: {
    acc: BemRecord
    valuePrefix: string
    style: BemStyle
    preserve?: boolean
  }): void {
    const keyElement = preserve ? this.name : camelize(this.name)
    const valueElement = valuePrefix + this.name

    acc[keyElement] = valueElement

    if (this.modifiers.length) {
      const prefix = applyStyleToModifierPrefix(style, valueElement)
      const opts = { acc, keyPrefix: keyElement, valuePrefix: prefix, style, preserve }
      for (const mod of this.modifiers) {
        mod.write(opts)
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

  public write({
    acc,
    keyPrefix,
    valuePrefix,
    style,
    preserve,
  }: {
    acc: BemRecord
    keyPrefix: string
    valuePrefix: string
    style: BemStyle
    preserve?: boolean
  }): void {
    const accKey = this.value
      ? preserve
        ? `${keyPrefix}_${this.key}_${this.value}`
        : `${keyPrefix}_${camelize(this.key)}_${camelize(this.value)}`
      : preserve
      ? `${keyPrefix}_${this.key}`
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

function pushModifiers(target: BemModifier[], key: string, maybeArrayValue?: string | string[]): void {
  if (Array.isArray(maybeArrayValue)) {
    for (const value of maybeArrayValue) {
      target.push(new BemModifier(key, value))
    }
  } else target.push(new BemModifier(key, maybeArrayValue))
}
