import { defineConfig, presetUno, presetAttributify, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'Fira Code',
      },
    }),
  ],
  theme: {
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
    },
    breakpoints: {
      phone: '480px',
      tablet: '768px',
    },
  },
})
