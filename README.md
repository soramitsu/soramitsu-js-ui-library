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

### Linting & Format

Available scripts:

```
- lint:check
  run-s lint:es lint:format:check
- lint:es
  eslint .
- lint:es:fix
  yarn lint:es --fix
- lint:format:base
  prettier-eslint "**/*.{ts,js,vue}"
- lint:format:check
  yarn lint:format:base --list-different
- lint:format:fix
  yarn lint:format:base --write
```

To use "Format On Save" feature you should setup your (I)DE to run:

```bash
# From the project root
./node_modules/.bin/prettier-eslint --write <target file name>
```

Maybe you will also need to specify paths for prettier config, prettier binary, eslint config or eslint binary. See all list of options with `yarn prettier-eslint -h`.

> If you are using VSCode, take a lot at [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint) extension, it may help with auto formatting.
