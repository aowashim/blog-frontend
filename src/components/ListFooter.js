import { ActivityIndicator, View } from 'react-native'
import { Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
      <Text style={{ marginRight: 5 }}>You have seen all the posts</Text>
      <MaterialCommunityIcons
        name='thumb-up-outline'
        size={20}
        color='orange'
      />
    </View>
  )
}

export default ListFooter
