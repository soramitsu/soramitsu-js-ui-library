import 'virtual:windi.css'
import './custom.css'
import '@soramitsu-ui/theme/fonts/Sora/index.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
