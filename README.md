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

Use **changesets** to describe changes you've done in the project libraries.

- Collect changesets for each PR (`yarn changeset`);
- When PR is reviewed, apply collected changesets (`yarn changeset version`)
- Then PR might be closed

### Linting

**Only ESLint check:**

```shell
yarn lint:check
```
