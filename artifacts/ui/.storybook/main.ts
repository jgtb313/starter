import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  framework: '@storybook/react-vite',

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/experimental-addon-test'
  ],

  core: {
    builder: '@storybook/builder-vite',
  },

  typescript: {
    reactDocgen: false,
  },
}

export default config
