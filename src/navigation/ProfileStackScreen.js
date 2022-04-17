import { createStackNavigator } from '@react-navigation/stack'
import { useContext } from 'react'
import Post from '../components/Post'
import Bookmarks from '../screens/Bookmarks'
import Followers from '../screens/Followers'
import Posts from '../screens/Posts'
import Profile from '../screens/Profile'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import SinglePost from '../screens/SinglePost'
import UserContext from '../store/UserContext'

const ProfileStack = createStackNavigator()

const ProfileStackScreen = () => {
  const { userInfo } = useContext(UserContext)

  if (userInfo.user) {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name='ProfileS'
          component={Profile}
          options={{ title: userInfo.name }}
        />
        <ProfileStack.Screen
          name='Bookmarks'
          component={Bookmarks}
          // options={{ title: 'My Posts' }}
        />
        <ProfileStack.Screen
          name='SinglePost'
          component={SinglePost}
          // options={{ title: 'My Posts' }}
        />
      </ProfileStack.Navigator>
    )
  } else {
    return (
      <ProfileStack.Navigator>
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
