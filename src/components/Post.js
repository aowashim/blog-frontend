import { Image, TouchableOpacity, View } from 'react-native'
import { Avatar, Divider, Headline, Paragraph, Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import UserContext from '../store/UserContext'
import { useContext, useEffect } from 'react'

const Post = props => {
  const { userInfo } = useContext(UserContext)

  const handleNav = () => {
    if (props.home) {
      if (userInfo.uname === props.item.userName) {
        props.navigation.navigate('Profile')
      } else {
        props.navigation.navigate('ViewProfile', {
          uname: props.item.userName,
          name: props.item.name,
        })
      }
    } else {
      props.navigation.pop()
    }
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
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 1,
            flexDirection: 'row',
            marginRight: 30,
          }}
          onPress={handleNav}
        >
          {props.item.dp !== 'na' ? (
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

      <Headline>{props.item.title}</Headline>
      <Paragraph>{props.item.description}</Paragraph>

      {Boolean(props.item.image?.length) && (
        <Image
          style={{ height: 300, width: '100%' }}
          source={{
            uri: props.item.image,
          }}
          resizeMode='contain'
        />
      )}

      <Divider
        style={{ backgroundColor: 'grey', marginBottom: 5, marginTop: 10 }}
      />
    </View>
  )
}

export default Post
