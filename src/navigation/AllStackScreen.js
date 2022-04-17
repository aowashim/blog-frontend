import { createStackNavigator } from '@react-navigation/stack'
import { useContext } from 'react'
import Followers from '../screens/Followers'
import Posts from '../screens/Posts'
import Profile from '../screens/Profile'
import UserContext from '../store/UserContext'
import BottomTabNav from './BottomTabNav'

const AllStack = createStackNavigator()

const AllStackScreen = props => {
  const { userInfo } = useContext(UserContext)

  return (
    <AllStack.Navigator>
      <AllStack.Screen
        name='TabStack'
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
      <AllStack.Screen
        name='PostStack'
        component={Posts}
        options={({ route }) => ({
          title:
            route.params.un === userInfo.uname
              ? 'My Posts'
              : route.params.title,
        })}
      />
      <AllStack.Screen
        name='ProfileStack'
        component={Profile}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <AllStack.Screen
        name='FollowerStack'
        component={Followers}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </AllStack.Navigator>
  )
}

export default AllStackScreen
