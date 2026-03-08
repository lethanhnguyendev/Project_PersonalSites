import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'portfolio.html',
        'contact.html',
        'ProfileCareer/software-eng.html',
        'ProfileCareer/engineering.html',
        'Portfolio/SmartRetail/SmartRetail.html',
        'Portfolio/QRCodeScanMobile/QRCodeScanMobile.html',
        'Portfolio/AdelaideMetroRealtime/AdelaideMetroRealtime.html',
        'Portfolio/BackEndAPICanthoEQ/BackEndAPICanthoEQ.html',
        'Portfolio/DesktopAppCanthoEQ/DesktopAppCanthoEQ.html',
      ],
    },
  },
});
