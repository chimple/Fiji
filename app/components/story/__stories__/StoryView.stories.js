import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import StoryView from '../StoryView';
import { story_alice_in_wonderland } from '../../../../config/jest/mockData'

storiesOf('StoryView', module)
  .add('with alice', () => (
    <StoryView
      data={story_alice_in_wonderland}
    />
  ));
