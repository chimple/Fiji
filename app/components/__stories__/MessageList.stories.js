import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import ChatView from '../ProgressBar'

storiesOf('ProgressBar', module)
  .add('25%', () => (
    <ProgressBar
      style={{width: 200}}
      initialProgress={0.25}
      progress={0.5}
      duration={1000}
    />
  ))