import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ProfileStackScreen from './ProfileStackScreen'
import Loading from '../components/Loading'
import { Feather } from '@expo/vector-icons'
import Search from '../screens/Search'
import TempScree from '../screens/TempScree'
import { createStackNavigator } from '@react-navigation/stack'
import Posts from '../screens/Posts'
import CreatePost from '../screens/CreatePost'

const Tab = createBottomTabNavigator()
const SearchStack = createStackNavigator()
const HomeStack = createStackNavigator()

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name='SearchStack'
        component={Search}
        options={{ title: 'Find posts and people' }}
      />
    </SearchStack.Navigator>
  )
}

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='HomeStack'
        component={Posts}
        options={{ headerTitleStyle: { display: 'none' } }}
      />
      <HomeStack.Screen
        name='CreatePost'
        component={CreatePost}
        options={{ title: 'Create post' }}
      />
    </HomeStack.Navigator>
  )
}

const GettingToken = () => {
  return <Loading txt='' />
}

const BottomTabNav = props => {
  return (
    <Tab.Navigator
      // backBehavior={{ initialRoute: true }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
            return (
              <MaterialCommunityIcons name={iconName} size={30} color={color} />
            )
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline'
            return (
              <MaterialCommunityIcons name={iconName} size={30} color={color} />
            )
          } else if (route.name === 'Search') {
            return <Feather name='search' size={28} color={color} />
          }
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name='Home'
        component={props.loading ? GettingToken : HomeStackScreen}
      />
      <Tab.Screen name='Search' component={SearchStackScreen} />
      <Tab.Screen
        name='Profile'
        //options={{ unmountOnBlur: true }}
        component={ProfileStackScreen}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNav
