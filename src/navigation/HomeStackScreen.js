import { createStackNavigator } from '@react-navigation/stack'
import CreatePost from '../screens/CreatePost'
import Followers from '../screens/Followers'
import Posts from '../screens/Posts'
import Profile from '../screens/Profile'

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='HomeS'
        component={Posts}
        options={{ title: 'Home' }}
      />
      <HomeStack.Screen name='Post' component={CreatePost} />
      <HomeStack.Screen
        name='UserPosts'
        component={Posts}
        options={({ route }) => ({
          title: `${route.params.name}'s posts`,
        })}
      />
      <HomeStack.Screen
        name='ViewProfile'
        component={Profile}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <HomeStack.Screen
        name='FollowersHome'
        component={Followers}
        // options={{ title: 'My Posts' }}
      />
      {/* <HomeStack.Screen
        name='FollowerProfileHome'
        component={Profile}
        options={({ route }) => ({
          title: route.params.name,
        })}
      /> */}
    </HomeStack.Navigator>
  )
}

export default HomeStackScreen
