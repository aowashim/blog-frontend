import { Image, TouchableOpacity, View } from 'react-native'
import { Avatar, Headline, Paragraph, Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Post = ({ item }) => {
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
          <Avatar.Image size={45} source={{ uri: item.dp }} />
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
        >
          <MaterialCommunityIcons
            name={Boolean(item.bm) ? 'bookmark' : 'bookmark-outline'}
            size={28}
            color='orange'
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
