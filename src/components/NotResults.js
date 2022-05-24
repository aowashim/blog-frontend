import { View } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import { globalStyles } from '../helpers/globalStyles'

const NotResults = () => (
  <Card style={{ marginTop: 20, marginHorizontal: 10 }}>
    <Card.Content>
      <View style={globalStyles.avatar}>
        <Avatar.Icon
          style={{ backgroundColor: '#474747' }}
          size={70}
          icon='emoticon-sad'
          color='orange'
        />
      </View>
      <Title>আপোনাৰ সন্ধানৰ বাবে কোনো ফলাফল পোৱা নগল ।</Title>
    </Card.Content>
  </Card>
)

export default NotResults
