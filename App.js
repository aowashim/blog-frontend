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
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import Home from './src/screens/Home'
import { useColorScheme } from 'react-native'
import ProfileStackScreen from './src/components/ProfileStackScreen'

const MyDarkThemeNav = {
  ...NavDarkTheme,
  dark: true,
  colors: {
    ...NavDarkTheme.colors,
    primary: '#d5e0da',
    //background: '#101c1c',
    //card: '#162626',
  },
}

const MyDarkThemePaper = {
  ...PaperDarkTheme,
  dark: true,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#10614e',
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
      <HomeStack.Screen name='HomeS' component={Home} />
    </HomeStack.Navigator>
  )
}

const App = () => {
  //const scheme = useColorScheme()
  const scheme = 'dark'

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
                iconName = focused ? 'user' : 'user-o'
                return <FontAwesome name={iconName} size={size} color={color} />
              }
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name='Home' component={HomeStackScreen} />
          <Tab.Screen
            name='Profile'
            //options={{ unmountOnBlur: true }}
            component={ProfileStackScreen}
          />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  )
}

export default App
