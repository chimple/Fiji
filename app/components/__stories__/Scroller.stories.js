import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import Scroller from '../Scroller';
import { story_alice_in_wonderland } from '../../../config/jest/mockData'

storiesOf('Scroller', module)
  .add('with text', () => (
    <Scroller
      data={story_alice_in_wonderland}
    />
  ));
