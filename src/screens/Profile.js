import { View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'

const Profile = () => {
  return (
    <View>
      <Text>Profile tab...</Text>
      <Button
        icon='camera'
        mode='contained'
        onPress={() => console.log('Pressed')}
      >
        Press me
      </Button>
      <TextInput
        label='Email'
        //mode='outlined'
        placeholder='Enter your email...'
        //value={text}
        //onChangeText={text => setText(text)}
      />
    </View>
  )
}

export default Profile
