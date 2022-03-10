import {
  NavigationContainer,
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
} from '@react-navigation/native'
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import Posts from './src/screens/Posts'
import { useColorScheme } from 'react-native'
import ProfileStackScreen from './src/components/ProfileStackScreen'
import CreatePost from './src/screens/CreatePost'
import UserContext from './src/store/UserContext'
import { useEffect, useMemo, useState } from 'react'
import { getData } from './src/helpers/asyncStorage'
import Loading from './src/components/Loading'
import Profile from './src/screens/Profile'

const MyDarkThemeNav = {
  ...NavDarkTheme,
  dark: true,
  colors: {
    ...NavDarkTheme.colors,
    primary: '#d5e0da',
    background: '#0e0f0f',
    //card: '#162626',
  },
}

const MyDarkThemePaper = {
  ...PaperDarkTheme,
  dark: true,
  colors: {
    ...PaperDarkTheme.colors,
    // primary: '#10614e',
    primary: '#2c7273',
    //accent: '#26373d',
    background: 'black',
  },
}

const MyDefaultThemePaper = {
  ...PaperDefaultTheme,
  //roundness: 20,
}

const HomeStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='HomeS' component={Posts} />
      <HomeStack.Screen name='Post' component={CreatePost} />
      <HomeStack.Screen name='UserPosts' component={Posts} />
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

const GettingToken = () => {
  return <Loading txt='' />
}

const App = () => {
  //const scheme = useColorScheme()
  const scheme = 'dark'
  const [userInfo, setUserInfo] = useState({
    token: '',
    name: '',
    uname: '',
    user: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userInfo.user) {
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const data = await getData('userInfo')

    if (data) {
      setUserInfo({
        ...data,
        user: true,
      })
    }

    setLoading(false)
  }

  const val = useMemo(() => ({ userInfo, setUserInfo }), [userInfo.token])

  return (
    <NavigationContainer
      theme={scheme === 'dark' ? MyDarkThemeNav : NavDefaultTheme}
    >
      <PaperProvider
        theme={scheme === 'dark' ? MyDarkThemePaper : MyDefaultThemePaper}
      >
        <StatusBar
          //backgroundColor={scheme === 'dark' ? '#18241e' : '#ffffff'}
          style={scheme === 'dark' ? 'light' : 'dark'}
        />
        <UserContext.Provider value={val}>
          <Tab.Navigator
            // backBehavior={{ initialRoute: true }}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline'
                  return (
                    <MaterialCommunityIcons
                      name={iconName}
                      size={30}
                      color={color}
                    />
                  )
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'account' : 'account-outline'
                  return (
                    <MaterialCommunityIcons
                      name={iconName}
                      size={30}
                      color={color}
                    />
                  )
                }
              },
              headerShown: false,
            })}
          >
            <Tab.Screen
              name='Home'
              component={loading ? GettingToken : HomeStackScreen}
            />
            <Tab.Screen
              name='Profile'
              //options={{ unmountOnBlur: true }}
              component={ProfileStackScreen}
            />
          </Tab.Navigator>
        </UserContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  )
}

export default App
