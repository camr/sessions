import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import presetTypography from '@unocss/preset-typography';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: 'src/components/tnia-event.js',
      formats: ['es'],
    },
    rollupOptions: {
      external: mode === 'production' ? '' : /^lit/,
    },
  },
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      presets: [
        presetUno(),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        }),
        presetTypography(),
      ],
    }),
  ],
}));
