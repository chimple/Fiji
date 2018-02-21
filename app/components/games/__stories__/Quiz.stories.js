import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Dimensions } from 'react-native'
import Quiz from '../Quiz';

const window = Dimensions.get("window")

storiesOf('Quiz', module)
  .add('with text', () => (
    <Quiz
      data={{
        question: 'A',
        choices: ['Z', 'B', 'K', 'A'],
        answerIndex: 3
      }}
      style = {{
        width: window.width,
        height: window.height
      }}
    />
  ));
