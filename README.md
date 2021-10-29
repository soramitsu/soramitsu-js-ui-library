# Soramitsu UI - next

## Monorepo structure

Packages located at `packages/` dir.

Each package has its own `tsconfig.json` and own build & testing configs.

**`icons`** package contains only raw SVGs for now.

**`theme`** package contains theme-related tools - WindiCSS helpers & theme variables, as well as fonts.

**`ui`** package contains components.

## Contribution

Use `yarn`.

**Install packages:**

```shell
yarn
```

### Development

**Build theme:** (you need to rebuild it each time you use it from ui lib)

```shell
yarn build:theme
```

**Open storybook:**

```shell
yarn sb:serve
```

OR **cypress component-testing:**

```shell
yarn cy
```

### Building & publishing

**Build all packages:**

```shell
yarn build
```

**Publish:** WIP

**Build Storybook:**

```shell
yarn sb:build
```

### Versioning

TODO changesets

### Linting

TODO add commands
