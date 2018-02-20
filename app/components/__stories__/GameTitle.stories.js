import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import GameTitle from '../GameTitle';
import {games} from '../../../config/jest/mockData'

storiesOf( 'GameTitle', module ) 
    .add('with string', () =>(
        <GameTitle
            title = { games[0] }
            onPressItem={action('clicked-story')}
        />
    ));