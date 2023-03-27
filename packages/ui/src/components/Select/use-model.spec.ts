import type { Except } from 'type-fest'
import { describe, test, expect, vi } from 'vitest'
import { useSelectModel, type UseSelectModelParams } from './use-model'
import type { SelectOption } from './types'

const OPTIONS = [
  { value: 'regular', label: 'Regular crust' },
  { value: 'deep', label: 'Deep dish' },
  { value: 'thin', label: 'Thin crust' },
] as const

describe('Auto-closing', () => {
  function useFactory(
    props: Except<UseSelectModelParams<any>, 'options' | 'multiple' | 'storeSelectedOptions'>,
    mode: 'single' | 'multi',
  ) {
    return useSelectModel({
      options: ref(OPTIONS),
      multiple: ref(mode === 'multi' ? true : false),
      storeSelectedOptions: ref(false),
      ...props,
    })
  }

  test('when value is selected in single-mode, it is called', () => {
    const onAutoClose = vi.fn()
    const modeling = useFactory(
      {
        model: ref(null),
        singleModeAutoClose: ref(true),
        onAutoClose,
      },
      'single',
    )

    modeling.select('thin')

    expect(onAutoClose).toBeCalled()
  })

  test('when value is unselected in single mode, it is called', () => {
    const onAutoClose = vi.fn()
    const modeling = useFactory(
      {
        model: ref('regular'),
        singleModeAutoClose: ref(true),
        onAutoClose,
      },
      'single',
    )

    modeling.unselect('regular')

    expect(onAutoClose).toBeCalled()
  })

  test('when value is selected/unselected in multiple mode, it is not called', () => {
    const onAutoClose = vi.fn()
    const modeling = useFactory(
      {
        model: ref(null),
        singleModeAutoClose: ref(true),
        onAutoClose,
      },
      'multi',
    )

    modeling.select('thin')
    modeling.select('regular')
    modeling.unselect('thin')

    expect(onAutoClose).not.toBeCalled()
  })

  test('when valud is selected/unselected in single mode, but auto-close is disabled, it is not called', () => {
    const onAutoClose = vi.fn()
    const modeling = useFactory(
      {
        model: ref(null),
        singleModeAutoClose: ref(false),
        onAutoClose,
      },
      'single',
    )

    modeling.select('thin')
    modeling.select('regular')
    modeling.unselect('thin')

    expect(onAutoClose).not.toBeCalled()
  })
})

describe('Storing options', () => {
  test('when selected option is removed from options list, it is selected anyway', () => {
    const changingOptions = ref<readonly SelectOption[]>(OPTIONS)
    const modeling = useSelectModel({
      model: ref(null),
      options: changingOptions,
      multiple: ref(true),
      storeSelectedOptions: ref(true),
      singleModeAutoClose: ref(true),
      onAutoClose: () => {},
    })

    modeling.select('thin')
    modeling.select('regular')
    modeling.select('deep')

    changingOptions.value = [OPTIONS[1], OPTIONS[2]]

    expect(modeling.selectedOptions.value).toHaveLength(3)
  })
})
