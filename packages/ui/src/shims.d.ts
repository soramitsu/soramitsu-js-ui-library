/* eslint-disable @typescript-eslint/no-duplicate-imports */

declare module '*.svg' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '~icons/*' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// CSS
declare module '*.css' {
  const css: string
  export default css
}
declare module '*.scss' {
  const css: string
  export default css
}
declare module '*.sass' {
  const css: string
  export default css
}
