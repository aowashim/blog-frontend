import { ActivityIndicator, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'

const ListFooter = ({ data }) => {
  return data ? (
    <ActivityIndicator size={30} color='#10614e' />
  ) : (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 5,
      }}
    >
      <Entypo name='dot-single' size={30} color='grey' />
      <Entypo name='dot-single' size={30} color='grey' />
      <Entypo name='dot-single' size={30} color='grey' />
    </View>
  )
}

export default ListFooter
