# soramitsu-js-ui-library

## Project setup
```
yarn install
```

## Font variables setup
Required!: Add scss font variables to your project

```
$s-font-family-default-path: '~@soramitsu/soramitsu-js-ui/lib/assets/fonts/Sora-VariableFont_wght.ttf' !default;
$s-font-family-mono-path: '~@soramitsu/soramitsu-js-ui/lib/assets/fonts/JetBrainsMono-Regular.woff' !default;
$s-font-family-icons-path: '~@soramitsu/soramitsu-js-ui/lib/assets/fonts/soramitsu-icons-1.0.0.ttf' !default;
```

## Usage library in project
### 1.Install all of library components:
```
import Vue from 'vue
import SoramitsuElements from '@soramitsu/soramitsu-js-ui'

const options = {
  store // if u want to merge ui lib modules
}

Vue.use(SoramitsuElements, options)
```
### 2.Install only necessary components (to reduce vendors bundle size)
```
import Vue from 'vue
import ElementUIPlugin from '@soramitsu/soramitsu-js-ui/lib/plugins/elementUI'
import SoramitsuUIStorePlugin from '@soramitsu/soramitsu-js-ui/lib/plugins/soramitsuUIStore'
import SButton from '@soramitsu/soramitsu-js-ui/lib/components/Button/SButton'
import SButton from '@soramitsu/soramitsu-js-ui/lib/components/Input/SInput'

Vue.use(ElementUIPlugin) // required
Vue.use(SoramitsuUIStorePlugin, store) // optional
Vue.use(SButton)
Vue.use(SInput)
```

### Compiles and hot-reloads storybook with components for development
```
yarn storybook:serve
```

### Compiles and minifies storybook with components and docs for production
```
yarn storybook:build
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
