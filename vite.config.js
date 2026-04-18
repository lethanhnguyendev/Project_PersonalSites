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
        'Portfolio/BackEndAPICanthoEQ.html',
        'Portfolio/CanthoEQ.html',
        'Portfolio/DesktopAppCanthoEQ.html',
        'Portfolio/MobileAppCanthoEQ.html',
        'Portfolio/WebAppCanthoEQ.html',
        'Portfolio/SmartRetail.html',
        'Portfolio/QRCodeScanMobile.html',
        'Portfolio/AdelaideMetroRealtime.html',
        'Portfolio/MLSolarIssueDetection.html',
      ],
    },
  },
});
