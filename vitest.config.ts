import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['test/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: [
        'src/components/Analytics.tsx',
        'src/components/PrivacyPreferences.tsx',
        'src/components/portfolio/CampaignWork.tsx',
        'src/components/portfolio/Contact.tsx',
        'src/components/portfolio/Header.tsx',
        'src/components/portfolio/Hobbies.tsx',
        'src/components/portfolio/Testimonials.tsx',
        'src/components/portfolio/YouTube.tsx',
        'src/components/portfolio/AudienceDetails.tsx',
        'src/components/portfolio/content.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
  },
});
