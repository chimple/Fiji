import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import StoryList from '../StoryList';
import {titles} from '../../../config/jest/mockData'

storiesOf( 'StoryList', module ) 
    .add('with string', () =>(
        <StoryList
            titles = { titles }
            onPressItem={action('clicked-story')}
        />
    ));