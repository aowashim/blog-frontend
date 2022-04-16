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
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import UserContext from './src/store/UserContext'
import { useEffect, useMemo, useState } from 'react'
import { getData } from './src/helpers/asyncStorage'
import AllStackScreen from './src/navigation/AllStackScreen'

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
          <AllStackScreen loading={loading} />
        </UserContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  )
}

export default App
