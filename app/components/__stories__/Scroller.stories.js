import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import Scroller from '../Scroller';
import { story_chicken_and_duck } from '../../../config/jest/mockData'

storiesOf('Scroller', module)
  .add('with text', () => (
    <Scroller
      data={story_chicken_and_duck}
    />
  ));
