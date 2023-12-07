import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles/vars.css'
import './custom.css'

export default {
  extends: DefaultTheme,
} satisfies Theme