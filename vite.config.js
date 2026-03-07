import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Project_PersonalSites/',
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
