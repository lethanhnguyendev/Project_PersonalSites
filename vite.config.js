import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'portfolio.html',
        'contact.html',
        'ProfileCareer/software-eng.html',
        'ProfileCareer/engineering.html',
        'Portfolio/SmartRetail.html',
      ],
    },
  },
});
