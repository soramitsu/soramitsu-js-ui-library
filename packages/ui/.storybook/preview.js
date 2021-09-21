import '../src/styles/fonts.scss'
import '../src/styles/root.scss'
import { addParameters } from '@storybook/vue3'
import { DocsPage, DocsContainer } from '@storybook/addon-docs'

addParameters({
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
})

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}
