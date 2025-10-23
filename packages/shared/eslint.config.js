import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    ignores: ['jest.config.js', 'jest.setup.js', 'dist/**'],
  },
];

