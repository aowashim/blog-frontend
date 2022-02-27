import { useContext } from 'react'
import { View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { removeValue } from '../helpers/asyncStorage'
import UserContext from '../store/UserContext'
import SignIn from './SignIn'

const Profile = () => {
  const { userToken, setUserToken } = useContext(UserContext)

  const handleSignOut = async () => {
    await removeValue('userToken')
    setUserToken('')
  }

  return (
    <View>
      <Text>Hi.. how are you</Text>
      <Button onPress={handleSignOut}>Log Out</Button>
    </View>
  )
}

export default Profile
