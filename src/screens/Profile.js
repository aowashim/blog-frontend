import { useContext } from 'react'
import { View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { removeValue } from '../helpers/asyncStorage'
import { getUserInfo } from '../helpers/callApi'
import UserContext from '../store/UserContext'
import SignIn from './SignIn'

const Profile = () => {
  const { userToken, setUserToken } = useContext(UserContext)

  const handleSignOut = async () => {
    await removeValue('userToken')
    setUserToken('')
  }

  const handleUserInfo = async () => {
    const res = await getUserInfo(userToken)

    if (res.status === 200) {
      console.log(res.data)
    }
  }

  return (
    <View>
      <Text>Hi.. how are you</Text>
      <Button onPress={handleSignOut}>Log Out</Button>
      <Button onPress={handleUserInfo}>Info</Button>
    </View>
  )
}

export default Profile
