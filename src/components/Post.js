import {
  Image,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Avatar,
  Divider,
  Headline,
  Paragraph,
  Subheading,
  Text,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import UserContext from '../store/UserContext'
import { useContext, useEffect } from 'react'

const Post = props => {
  const { userInfo } = useContext(UserContext)

  const handleNav = () => {
    const uname = props.item.userName

    if (uname === userInfo.uname) {
      ToastAndroid.show(
        'Please visit profile tab to access your own profile.',
        ToastAndroid.LONG
      )
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

      <Pressable
        style={{ marginBottom: 10 }}
        onPress={() =>
          props.navigation.push('SinglePost', {
            pid: props.item.pid,
            title: props.item.title,
          })
        }
      >
        {/* <View style={{ marginLeft: 5 }}> */}
        <Text style={{ fontSize: 20 }}>{props.item.title}</Text>
        <Paragraph>{props.item.description}</Paragraph>
        {/* </View> */}

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

      <Divider style={{ backgroundColor: 'grey' }} />
    </View>
  )
}

export default Post
