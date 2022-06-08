import { useContext } from 'react'
import { ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Avatar, Divider, Paragraph, Text } from 'react-native-paper'
import { OwnProfileVisitMsg } from '../helpers/constants'
import UserContext from '../store/UserContext'

const Comment = props => {
  const { userInfo } = useContext(UserContext)

  const handleNav = () => {
    const uname = props.item.uname.toLowerCase()

    if (uname === userInfo.uname.toLowerCase()) {
      ToastAndroid.show(OwnProfileVisitMsg, ToastAndroid.LONG)
      return
    }

    props.navigation.push('ProfileStack', {
      uname,
      name: props.item.name,
    })
  }

  return (
    <View
      style={{
        marginBottom: 10,
        paddingBottom: 10,
      }}
    >
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 1,
            flexDirection: 'row',
            marginRight: 30,
          }}
          onPress={handleNav}
        >
          {props.item.dp ? (
            <Avatar.Image size={40} source={{ uri: props.item.dp }} />
          ) : (
            <Avatar.Icon
              size={40}
              icon='account'
              style={{ backgroundColor: '#333333' }}
            />
          )}
          <View style={{ marginLeft: 5, marginTop: 2 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
              {props.item.name}
            </Text>
            <Text style={{ fontSize: 10 }}>@{props.item.uname}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Paragraph style={{ fontWeight: 'bold' }}>{props.item.content}</Paragraph>

      <Divider style={{ backgroundColor: 'grey', marginTop: 5 }} />
    </View>
  )
}

export default Comment
