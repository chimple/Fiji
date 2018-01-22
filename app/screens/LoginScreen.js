import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import UserList from '../components/UserList'
import { fetchUsers } from '../redux/users'
import { syncUser } from '../redux/auth'

class LoginScreen extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers())
  }

  render() {
    return (
      this.props.isFetching
        ?
          <ActivityIndicator size="large" style={{ marginTop: 100 }}/>
        :
          this.props.users.length
            ?
              <UserList
                users={ this.props.users }
                navigation={ this.props.navigation }
                onPressItem = { this._handleLogin }
              />
            :
              <View>
                <Text>No users found</Text>
              </View>
    )
  }

  _handleLogin = (user) => {
    this.props.dispatch(syncUser(user))
    this.props.navigation.navigate('Main')
  }
}

LoginScreen.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }))
}

export default connect(state => ({
  users: state.users.list,
  isFetching: state.users.isFetching
}))(LoginScreen)