import { Plugin } from 'rollup'

/**
 * TODO replace with real d.ts building
 * @returns
 */
export default function vueDts(): Plugin {
  return {
    name: 'vue-dts',
    resolveId(id) {
      if (id.endsWith('.vue')) {
        return id + '.d.ts'
      }
      return null
    },
    load(id) {
      if (id.endsWith('.vue.d.ts')) {
        console.log('ctx', this.getModuleInfo(id))
        return `
        import { DefineComponent } from 'vue'
        const component: DefineComponent<{}, {}, any>
        export default component
      `
      }
    },
  }
}
