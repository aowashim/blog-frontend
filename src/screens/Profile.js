import { useContext, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Button, Headline, Text, TextInput } from 'react-native-paper'
import Loading from '../components/Loading'
import { removeValue } from '../helpers/asyncStorage'
import { getUserInfo } from '../helpers/callApi'
import { globalStyles } from '../helpers/globalStyles'
import UserContext from '../store/UserContext'

const Profile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const userData = useRef('')
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    handleUserInfo()
  }, [])

  const handleSignOut = async () => {
    await removeValue('userToken')
    setUserInfo('')
  }

  const handleUserInfo = async () => {
    const res = await getUserInfo(userInfo.token)

    if (res.status === 200) {
      userData.current = res.data
      setRefresh(!refresh)
    }
  }

  return Boolean(userData.current) ? (
    <View>
      <View style={globalStyles.avatar}>
        {userData.current.dp !== 'na' ? (
          <Avatar.Image size={100} source={{ uri: userData.current.dp }} />
        ) : (
          <Avatar.Icon
            size={100}
            icon='account'
            style={{ backgroundColor: '#333333' }}
          />
        )}
      </View>
      <View>
        <Button onPress={handleSignOut}>Log Out</Button>
      </View>
    </View>
  ) : (
    <Loading txt='' />
  )
}

export default Profile
