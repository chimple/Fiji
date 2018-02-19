import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import StoryTitle from '../StoryTitle';
import {titles} from '../../../config/jest/mockData'

storiesOf( 'StoryTitle', module ) 
    .add('with string', () =>(
        <StoryTitle
            title={
                titles[0]
            }
            onPressItem={action('clicked-story')}
        />
    ));