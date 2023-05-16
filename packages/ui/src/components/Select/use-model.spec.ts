import type { Except } from 'type-fest'
import { describe, test, expect, vi } from 'vitest'
import { useSelectModel, type UseSelectModelParams } from './use-model'
import type { ParsedOptions } from './types'
import type { PrimitiveKey } from '@/types'
import type { Ref, MaybeRefOrGetter } from 'vue'

// const OPTIONS = [
//   { value: 'regular', label: 'Regular crust' },
//   { value: 'deep', label: 'Deep dish' },
//   { value: 'thin', label: 'Thin crust' },
// ] as const

interface TestOption<V> {
  value: V
  // disabled?: boolean
  anything?: unknown
}

function factory<V>(params: {
  options:
    | { kind: 'simple'; value: MaybeRefOrGetter<TestOption<V>[]> }
    | { kind: 'full'; value: MaybeRefOrGetter<ParsedOptions<TestOption<V>>> }
  modelAsValues: Ref<undefined | null | V | V[]>
  multiple?: MaybeRefOrGetter<boolean>
}) {
  return useSelectModel({
    optionsParsed: computed((): ParsedOptions<TestOption<V>> => {
      const opts = params.options
      if (opts.kind === 'simple') {
        return unref(opts.value).map((x) => ({ kind: 'item', raw: x }))
      }
      return unref(opts.value)
    }),
    modelAsValues: params.modelAsValues,
    multiple: toRef(() => toValue(params.multiple) ?? false),
    optionGetters: {
      value: (x) => x.value,
    },
  })
}

test('constructs options model from values model', () => {
  const model = ref(2)
  const options = [
    { value: 0 },
    { value: 1 },
    {
      value: 2,
      // we will check that the actual option with this field is returned
      anything: true,
    },
  ] satisfies TestOption<number>[]

  const { modelAsOptions } = factory({
    options: { kind: 'simple', value: options },
    modelAsValues: model,
  })

  expect(modelAsOptions.value).toEqual({ value: 2, anything: true } satisfies TestOption<number>)
})

test('when an option is removed from the model, its value is removed too', () => {
  const model = ref(0)
  const options = [{ value: 0 }, { value: 1 }, { value: 2 }] satisfies TestOption<number>[]
  const { modelAsOptions } = factory({
    options: { kind: 'simple', value: options },
    modelAsValues: model,
  })

  modelAsOptions.value = null

  expect(model.value).toBeNull()
})

test('when an option is selected in single mode, its value is selected too', () => {
  const model = ref(0)
  const options = [{ value: 0 }, { value: 1 }, { value: 2 }] satisfies TestOption<number>[]
  const { modelAsOptions } = factory({
    options: { kind: 'simple', value: options },
    modelAsValues: model,
  })

  modelAsOptions.value = { value: 1 }

  expect(model.value).toBe(1)
})

test('when an option is selected in multiple mode, its value is selected too', () => {
  const model = ref([])
  const options = [{ value: 0 }, { value: 1 }, { value: 2 }] satisfies TestOption<number>[]
  const { modelAsOptions } = factory({
    options: { kind: 'simple', value: options },
    modelAsValues: model,
    multiple: true,
  })

  modelAsOptions.value = [{ value: 1 }, { value: 2 }]

  expect(model.value).toEqual([1, 2])
})

test('modelAsValues single/array format is changed reactively according to multiplicity', () => {
  const model = ref()
  const multiple = ref(false)

  factory<string>({
    options: { kind: 'simple', value: [{ value: 'a' }, { value: 'b' }, { value: 'c' }] },
    modelAsValues: model,
    multiple,
  })

  expect(model.value).toBeNull()

  multiple.value = true
  expect(model.value).toEqual([])

  model.value = ['a', 'b']
  multiple.value = false
  expect(model.value).toEqual('a')

  multiple.value = true
  expect(model.value).toEqual(['a'])
})

test.only('when values are not normalised initially, options are immediately accessible anyway', () => {
  const { modelAsOptions } = factory({
    options: { kind: 'simple', value: [{ value: 1 }] },
    modelAsValues: ref([]),
    multiple: false,
  })

  expect(modelAsOptions.value).toEqual(null)
})
