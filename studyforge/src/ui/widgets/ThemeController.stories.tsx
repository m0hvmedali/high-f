import type { Meta, StoryObj } from '@storybook/react';
import ThemeController from './ThemeController';

const meta: Meta<typeof ThemeController> = {
  title: 'Widgets/ThemeController',
  component: ThemeController
};
export default meta;

export const Basic: StoryObj<typeof ThemeController> = {};
