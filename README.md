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
