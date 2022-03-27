import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { globalStyles } from '../helpers/globalStyles'

const Follower = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => props.handleViewPost(props.item.userName)}
    >
      <View style={globalStyles.cont}>
        <View style={styles.cont}>
          <View style={styles.avatar}>
            {props.item.dp !== 'na' ? (
              <Avatar.Image size={55} source={{ uri: props.item.dp }} />
            ) : (
              <Avatar.Icon
                size={55}
                icon='account'
                style={{ backgroundColor: '#333333' }}
              />
            )}
          </View>

          <View style={styles.nameCont}>
            <Text>{props.item.name}</Text>
            <Text>@{props.item.userName}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#0e2333',
  },
  nameCont: {
    justifyContent: 'center',
    marginLeft: 10,
  },
})

export default Follower
