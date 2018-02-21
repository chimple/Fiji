import 'react-native';
import React from 'react';
import ChatView from '../ChatView';
import { messages, users } from '../../../config/jest/mockData'

import renderer from 'react-test-renderer';



it('renders correctly', () => {
    const tree = renderer.create(
    <ChatView
    item = {messages[0]}
      // to send user,friend to chatview
      // sticker = {this.props.sticker}
     user={users[0]}
       friend={users[1]}  
    />
).toJSON();
    expect(tree).toMatchSnapshot();
  });