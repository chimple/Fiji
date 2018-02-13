import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import Scroller from '../Scroller';

storiesOf('Scroller', module)
  .add('with text', () => (
    <Scroller
      data={[
        {
          id: 1, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
            { id: 3, title: '3' },
            { id: 4, title: '4' },
            { id: 5, title: '5' },
            { id: 6, title: '6' },
            { id: 7, title: '7' },
            { id: 8, title: '8' },
            { id: 9, title: '9' },
            { id: 11, title: '1' },
            { id: 12, title: '2' },
            { id: 13, title: '3' },
            { id: 14, title: '4' },
            { id: 15, title: '5' },
            { id: 16, title: '6' },
            { id: 17, title: '7' },
            { id: 18, title: '8' },
            { id: 19, title: '9' },
          ]
        },
        {
          id: 2, 
          tabLabel: 'ios-people',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
            { id: 3, title: '3' },
            { id: 4, title: '4' },
            { id: 5, title: '5' },
            { id: 6, title: '6' },
            { id: 7, title: '7' },
            { id: 8, title: '8' },
            { id: 9, title: '9' },
            { id: 11, title: '1' },
            { id: 12, title: '2' },
            { id: 13, title: '3' },
            { id: 14, title: '4' },
            { id: 15, title: '5' },
            { id: 16, title: '6' },
            { id: 17, title: '7' },
            { id: 18, title: '8' },
            { id: 19, title: '9' },
          ]
        },
        {
          id: 3, 
          tabLabel: 'ios-chatboxes',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
            { id: 3, title: '3' },
            { id: 4, title: '4' },
            { id: 5, title: '5' },
            { id: 6, title: '6' },
            { id: 7, title: '7' },
            { id: 8, title: '8' },
            { id: 9, title: '9' },
            { id: 11, title: '1' },
            { id: 12, title: '2' },
            { id: 13, title: '3' },
            { id: 14, title: '4' },
            { id: 15, title: '5' },
            { id: 16, title: '6' },
            { id: 17, title: '7' },
            { id: 18, title: '8' },
            { id: 19, title: '9' },
          ]
        },
        {
          id: 4, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 5, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 6, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 7, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 8, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 9, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 10, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 14, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 15, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 16, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 17, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 18, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 19, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        },
        {
          id: 20, 
          tabLabel: 'ios-paper',
          data: [
            { id: 1, title: '1' },
            { id: 2, title: '2' },
          ]
        }
      ]}
    />
  ));
