import { Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'

const HomeHeader = props => {
  return (
    <Pressable
      onPress={props.openModal}
      style={{ flexDirection: 'row', paddingRight: 10 }}
    >
      <Text style={{ marginLeft: 20, fontSize: 20 }}>Select</Text>
      <Entypo
        style={{ marginTop: 4 }}
        name='chevron-small-down'
        size={24}
        color='white'
      />
    </Pressable>
  )
}

export default HomeHeader
