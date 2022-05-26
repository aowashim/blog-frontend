import { createStackNavigator } from '@react-navigation/stack'
import { useContext } from 'react'
import Bookmarks from '../screens/Bookmarks'
import EditProfile from '../screens/EditProfile'
import Profile from '../screens/Profile'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
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
          options={{ title: "সংৰক্ষিত প'ষ্টসমূহ" }}
        />
        <ProfileStack.Screen
          name='EditProfile'
          component={EditProfile}
          options={{ title: "প্ৰ'ফাইল সম্পাদনা" }}
        />
      </ProfileStack.Navigator>
    )
  } else {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name='SignIn'
          component={SignIn}
          options={{ title: 'লগ ইন' }}
        />
        <ProfileStack.Screen
          name='SignUp'
          component={SignUp}
          options={{ title: 'একাউণ্ট সৃষ্টি কৰক' }}
        />
      </ProfileStack.Navigator>
    )
  }
}

export default ProfileStackScreen
