import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Hi... How are you??</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
})

export default Home
