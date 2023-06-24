import Input from './Input';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Orange = {
  args: {
    type: 'password',
    text: 'UWU',
    color: 'orange',
  },
};

export const Blue = {
  args: {
    type: 'password',
    text: 'UWU',
    color: 'blue',
  },
};
