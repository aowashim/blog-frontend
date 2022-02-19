import { TouchableOpacity, View } from 'react-native'
import { Avatar, Headline, Paragraph, Text } from 'react-native-paper'

const Post = ({ item }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ flex: 1, flexDirection: 'row' }}
      >
        <Avatar.Image size={45} source={{ uri: item.dp }} />
        <View style={{ marginLeft: 5, marginTop: 2 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontSize: 12 }}>@{item.userName}</Text>
        </View>
      </TouchableOpacity>

      <Headline>{item.title}</Headline>
      <Paragraph>{item.description}</Paragraph>
    </View>
  )
}

export default Post
