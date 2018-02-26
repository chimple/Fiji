import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import FriendList from '../components/FriendList'
import { fetchUsers } from '../redux/users'

class LoginScreen extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers())
  }

  render() {
    const FilteredUsers = this.props.users.filter((user) => user._id != this.props.user._id)
    return (
      this.props.isFetching
        ?
          <ActivityIndicator size="large" style={{ marginTop: 100 }}/>
        :
          this.props.users.length
            ?
              <FriendList
                users={ FilteredUsers }
                navigation={ this.props.navigation }
                onPressItem = { this._handleChat }
              />
            :
              <View>
                <Text>No users found</Text>
              </View>
    )
  }

  _handleChat = (friend) => {
    this.props.navigation.navigate('ChatWith', { friend })
  }
}

LoginScreen.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })),
  user: PropTypes.object
}

export default connect(state => ({
  users: state.users.list,
  isFetching: state.users.isFetching,
  user: state.auth.user
}))(LoginScreen)