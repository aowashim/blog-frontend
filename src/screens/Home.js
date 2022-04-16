import { useLayoutEffect } from 'react'
import { View } from 'react-native'
import HomeHeader from '../components/HomeHeader'

const Home = () => {
  // customizing Home screen to select post from followers and all
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => <HomeHeader openModal={() => setShowModal(true)} />,
    })
  }, [])

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home
