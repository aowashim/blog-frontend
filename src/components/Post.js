import { Image, TouchableOpacity, View } from 'react-native'
import { Avatar, Headline, Paragraph, Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Post = ({ item, handleBookMark, index }) => {
  return (
    <View
      style={{
        marginBottom: 10,
        // borderBottomColor: 'grey',
        // borderBottomWidth: 0.2,
        paddingBottom: 10,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 1,
            flexDirection: 'row',
            marginRight: 30,
          }}
        >
          {/* <Avatar.Image size={45} source={{ uri: item.dp }} /> */}
          {item.dp !== 'na' ? (
            <Avatar.Image size={45} source={{ uri: item.dp }} />
          ) : (
            <Avatar.Icon
              size={45}
              icon='account'
              style={{ backgroundColor: '#333333' }}
            />
          )}
          <View style={{ marginLeft: 5, marginTop: 2 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 12 }}>@{item.userName}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            marginLeft: 30,
            marginTop: 3,
            marginRight: 10,
            paddingHorizontal: 10,
          }}
          onPress={() => handleBookMark(item.pid, item.bm, index)}
        >
          <MaterialCommunityIcons
            name={
              Boolean(item.bm)
                ? 'bookmark-multiple'
                : 'bookmark-multiple-outline'
            }
            size={24}
            color='#2c7273'
          />
        </TouchableOpacity>
      </View>

      <Headline>{item.title}</Headline>
      <Paragraph>{item.description}</Paragraph>

      {Boolean(item.image.length) && (
        <Image
          style={{ height: 300, width: '100%' }}
          source={{
            uri: item.image,
          }}
          resizeMode='contain'
        />
      )}
    </View>
  )
}

export default Post
