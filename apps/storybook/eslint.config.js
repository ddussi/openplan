import { config } from '@repo/eslint-config/react-internal';

export default [
  ...config,
  {
    ignores: ['node_modules/**', '.storybook/**', 'storybook-static/**'],
  },
];

