import { createStackNavigator } from '@react-navigation/stack'
import CreatePost from '../screens/CreatePost'
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
    </HomeStack.Navigator>
  )
}

export default HomeStackScreen
