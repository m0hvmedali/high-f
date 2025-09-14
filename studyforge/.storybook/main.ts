import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/test'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: { autodocs: true }
};
export default config;
