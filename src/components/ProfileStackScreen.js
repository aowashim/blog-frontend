import { createStackNavigator } from '@react-navigation/stack'
import { useState } from 'react'
import Profile from '../screens/Profile'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'

const ProfileStack = createStackNavigator()

const ProfileStackScreen = () => {
  const [profile, setProfile] = useState(false)

  if (profile) {
    return (
      <ProfileStack.Navigator screenOptions={{ animationEnabled: false }}>
        <ProfileStack.Screen name='ProfileS' component={Profile} />
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
