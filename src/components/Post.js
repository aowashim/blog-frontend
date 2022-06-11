import {
  Image,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { Avatar, Divider, Paragraph, Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import UserContext from '../store/UserContext'
import { useContext } from 'react'
import { LoginRequestMsg, OwnProfileVisitMsg } from '../helpers/constants'
import * as Linking from 'expo-linking'

const Post = props => {
  const { userInfo } = useContext(UserContext)

  const handleNav = () => {
    const uname = props.item.userName

    if (uname === userInfo.uname) {
      ToastAndroid.show(OwnProfileVisitMsg, ToastAndroid.LONG)
      return
    }

    props.navigation.push('ProfileStack', {
      uname,
      name: props.item.name,
    })
  }

  const handleSinglePost = () => {
    if (props.route.name !== 'SinglePost')
      if (!userInfo.user) ToastAndroid.show(LoginRequestMsg, ToastAndroid.LONG)
      else
        props.navigation.push('SinglePost', {
          pid: props.item.pid,
          title: props.item.title,
        })
  }

  const handleDelete = () => {
    if (props.route.name !== 'SinglePost')
      props.show(props.index, props.item.pid, props.item.userName)
  }

  return (
    <View
      style={{
        marginBottom: 10,
        // borderBottomColor: 'grey',
        // borderBottomWidth: 0.2,
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
            <Avatar.Image size={45} source={{ uri: props.item.dp }} />
          ) : (
            <Avatar.Icon
              size={45}
              icon='account'
              style={{ backgroundColor: '#333333' }}
            />
          )}
          <View style={{ marginLeft: 5, marginTop: 2 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {props.item.name}
            </Text>
            <Text style={{ fontSize: 12 }}>@{props.item.userName}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            marginLeft: 30,
            marginTop: 3,
            // marginRight: 10,
            paddingHorizontal: 10,
          }}
          onPress={() =>
            props.handleBookMark(
              props.item.pid,
              props.item.bm,
              props.index,
              props.item.title
            )
          }
        >
          <MaterialCommunityIcons
            name={
              Boolean(props.item.bm)
                ? 'bookmark-multiple'
                : 'bookmark-multiple-outline'
            }
            size={24}
            color='#2c7273'
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Pressable
          onPress={handleSinglePost}
          onLongPress={() => handleDelete()}
        >
          <Text style={{ fontSize: 16 }}>{props.item.title}</Text>
          <Paragraph style={{ fontSize: 15 }}>
            {props.item.description}
          </Paragraph>

          {Boolean(props.item.image?.length) && (
            <Image
              style={{ height: 300, width: '100%' }}
              source={{
                uri: props.item.image,
              }}
              resizeMode='contain'
            />
          )}
        </Pressable>

        {Boolean(props.item.url?.length) && (
          <Text
            onPress={() => {
              Linking.openURL(props.item.url)
            }}
            style={{ textDecorationLine: 'underline', marginTop: 2 }}
          >
            {props.item.url}
          </Text>
        )}
      </View>

      <Divider style={{ backgroundColor: 'grey' }} />
    </View>
  )
}

export default Post
