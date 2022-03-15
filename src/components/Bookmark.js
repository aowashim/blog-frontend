import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Bookmark = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => props.handleViewPost(props.item.pid)}
    >
      <View style={styles.cont}>
        <MaterialCommunityIcons
          name='bookmark-outline'
          size={24}
          color='rgba(219, 219, 219, 1)'
          style={styles.icon}
        />
        <Text style={styles.title}>{props.item.b_title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'rgba(217, 213, 145, 1)',
    fontWeight: '600',
    fontSize: 20,
  },
  cont: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingVertical: 15,
    marginBottom: 15,
    backgroundColor: 'rgba(99, 99, 99, 0.1)',
    // flexDirection: 'row',
  },
  icon: {
    marginTop: 5,
    marginRight: 10,
  },
})

export default Bookmark
