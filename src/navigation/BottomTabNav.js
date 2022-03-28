import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ProfileStackScreen from './ProfileStackScreen'
import HomeStackScreen from './HomeStackScreen'
import Loading from '../components/Loading'

const Tab = createBottomTabNavigator()

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
          }
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name='Home'
        component={props.loading ? GettingToken : HomeStackScreen}
      />
      <Tab.Screen
        name='Profile'
        //options={{ unmountOnBlur: true }}
        component={ProfileStackScreen}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNav