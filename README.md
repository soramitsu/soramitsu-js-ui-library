# Soramitsu UI - next

## Monorepo structure

Packages located at `packages/` dir.

Each package has its own `tsconfig.json`, own build & testing configs and their specific user guidelines in README
files.

- **`icons`** package contains only raw SVGs for now.
- **`theme`** package contains theme-related tools - Windi CSS helpers & theme variables, as well as fonts.
- **`ui`** package contains components.

## Getting started

**Install packages:**

```shell
yarn
```

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
yarn test:cy
```

**Build all packages:**

```shell
yarn build
```

**Build Storybook:**

```shell
yarn sb:build
```

### To add new component:

1. Create a component directory in `ui/src/components` (e.g. `ui/src/components/Button`) with component itself
   prefixed with `S` (e.g. `SButton.vue`) and the `index.ts` file exporting it. The file's name becomes component's
   name. There are also can be subsidiary entities like other components, composables types, constants and so on that
   can be exported too.
2. Every exported component must be added to `ui/src/components/all-components.ts` and `ui/src/components/index.ts`.
3. Then it's necessary to add a story for being able to manually test the components. It can be done by adding a
   `*.stories.ts` file in `ui/stories` directory (e.g. `ui/stories/SButton.stories.ts`).
4. Then added component should be tested. A test should be an `ui/cypress/component/*.spec.cy.ts` file, where `*` is
   component's name. For searching elements in a component you should use `data-testid` attribute.
5. If there are any quite complex utils they should have their own unit tests nearby.
6. When everything is working, use repo root script `lint:format:fix` to bring the code to common style (more details
   in the section **Linting & Format**).
7. Then you should update `ui.api.md` using two commands in `ui` package: `build:tsc` and then `api:extract:local`.
8. Using `yarn changeset` create a minor change with `**feat**` prefix about new component (e.g.
   `**feat**: added button component`).
9. Create pull request.

### To release & publishing:

1. Create a release branch.
2. Make sure that everything is ready.
3. Use the command `yarn changeset version` to update `CHANGELOG.md` files.
4. Create a pull request with a release version in name.
5. Merge the pull request. It will automatically publish packages.

### Some recommendations

- There are a useful library [VueUse](https://vueuse.org/) with a lot of composition utilities that can be used in
  develop, so it is good idea to regularly check it.
- We often use provide/inject mechanism for main-subsidiary components communication (e.g. checkbox group - checkbox).
  It should be done by creating `api.ts` with a provided payload type, an injection key and an api hook in
  component directory.

### Styleguide

- Previously enums was defined as plain TypeScript enums, but they don't work well with tree shaking, so now we
  define enums as follows:

  ```ts
  const Status = {
    Info: 'info',
  } as const

  type Status = typeof Status[keyof typeof Status]
  ```

- There is no need to create folders for every type of subsidiary entities, e.g. composables, utilities, etc.,
  if their number is small.
- Move composables to its own files started with `use`. It's helps to detect and group composables in directory tree.
- We are using BEM with underscores for class names (e.g. `button__icon_hidden` or `button__icon_size_small`).
- Try to use Windi CSS utility classes.
- Messages in changesets should start with `**type**`, where `type` can be `fix`, `feat` or something like this,
  that describes a type of change. After the type should go a scope in brackets if it can be defined. (For example,
  it can be the name of a component). Then after colon goes a change description.
  Examples: `` **fix**(`STable`): remove unnecessary border `` or `**feat**: add pagination component`.
  More info: https://www.conventionalcommits.org/en/v1.0.0/

## Linting & Format

Available scripts:

- `lint:es` - calls eslint to find formatting errors for all project
- `lint:es:fix` - calls eslint to find and fix formatting errors for all project
- `lint:format:base` - calls prettier and then eslint
- `lint:format:check` - calls prettier and then eslint to find files with formatting errors
- `lint:format:fix`- calls prettier and then eslint to fix formatting errors
- `lint:check` - calls `lint:es` and then `lint:format:check`

To use "Format On Save" feature you should setup your (I)DE to run:

```bash
# From the project root
./node_modules/.bin/prettier-eslint --write <target file name>
```

Maybe you will also need to specify paths for prettier config, prettier binary, eslint config or eslint binary. See all list of options with `yarn prettier-eslint -h`.

> If you are using VSCode, take a lot at [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint) extension, it may help with auto formatting.
