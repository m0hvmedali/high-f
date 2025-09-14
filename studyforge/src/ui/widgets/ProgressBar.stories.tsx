import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Widgets/ProgressBar',
  component: ProgressBar
};
export default meta;

export const Basic: StoryObj<typeof ProgressBar> = { args: { value: 42 } };
