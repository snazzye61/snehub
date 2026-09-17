import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        login: 'login.html',
        register: 'register.html',
        dashboard: 'dashboard.html',
        wallet: 'wallet.html',
        orders: 'orders.html',
        purchase: 'purchase.html',
        download: 'download.html',
        category: 'category.html',
        about: 'about.html',
        contact: 'contact.html',
        faq: 'faq.html',
        privacy: 'privacy-policy.html',
        settings: 'settings.html'
      }
    }
  }
});