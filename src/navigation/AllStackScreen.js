import { createStackNavigator } from '@react-navigation/stack'
import { useContext } from 'react'
import Comments from '../screens/Comments'
import CreateComment from '../screens/CreateComment'
import Followers from '../screens/Followers'
import Posts from '../screens/Posts'
import Profile from '../screens/Profile'
import SinglePost from '../screens/SinglePost'
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
              ? "মোৰ প'ষ্টসমূহ"
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
      <AllStack.Screen
        name='SinglePost'
        component={SinglePost}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <AllStack.Screen
        name='CreateComment'
        component={CreateComment}
        options={{
          title: 'মন্তব্য',
        }}
      />
      <AllStack.Screen
        name='ViewComments'
        component={Comments}
        options={{
          title: 'পূৰ্বৰ মন্তব্যসমূহ',
        }}
      />
    </AllStack.Navigator>
  )
}

export default AllStackScreen
