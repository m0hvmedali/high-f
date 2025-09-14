import type { Meta, StoryObj } from '@storybook/react';
import QuickQuizWidget from './QuickQuizWidget';

const meta: Meta<typeof QuickQuizWidget> = {
  title: 'Widgets/QuickQuizWidget',
  component: QuickQuizWidget
};
export default meta;

export const Basic: StoryObj<typeof QuickQuizWidget> = {
  args: {
    question: {
      id: 'q1',
      body: 'ما نهاية الدالة f(x) = x^2 عندما x تؤول إلى 2؟',
      options: ['2', '4', '8', 'لا شيء مما سبق'],
      correct: '4',
      related: { name: 'تعريف النهاية', id: 'lesson-limit-def' }
    },
    onAnswer: () => {}
  }
};
