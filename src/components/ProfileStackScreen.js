import { createStackNavigator } from '@react-navigation/stack'
import { useContext, useState } from 'react'
import Profile from '../screens/Profile'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import UserContext from '../store/UserContext'

const ProfileStack = createStackNavigator()

const ProfileStackScreen = () => {
  const { userInfo } = useContext(UserContext)

  if (userInfo.user) {
    return (
      <ProfileStack.Navigator screenOptions={{ animationEnabled: false }}>
        <ProfileStack.Screen
          name='ProfileS'
          component={Profile}
          options={({ route }) => ({
            title: route.params?.name || userInfo.name,
          })}
        />
      </ProfileStack.Navigator>
    )
  } else {
    return (
      <ProfileStack.Navigator screenOptions={{ animationEnabled: false }}>
        <ProfileStack.Screen
          name='SignIn'
          component={SignIn}
          options={{ title: 'Sign In' }}
        />
        <ProfileStack.Screen
          name='SignUp'
          component={SignUp}
          options={{ title: 'Create Account' }}
        />
      </ProfileStack.Navigator>
    )
  }
}

export default ProfileStackScreen
