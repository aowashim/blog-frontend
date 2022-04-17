import { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Button, Divider, Text } from 'react-native-paper'
import Loading from '../components/Loading'
import { removeValue } from '../helpers/asyncStorage'
import { addFollowing, getUserInfo, removeFollowing } from '../helpers/callApi'
import { globalStyles } from '../helpers/globalStyles'
import UserContext from '../store/UserContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Profile = ({ route, navigation }) => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const userData = useRef('')
  const self = useRef(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    handleUserInfo()
  }, [])

  const handleSignOut = async () => {
    await removeValue('userInfo')
    setUserInfo({
      token: '',
      name: '',
      uname: '',
      user: false,
    })
  }

  const handleUserInfo = async () => {
    let res
    if (route.params?.uname) {
      res = await getUserInfo(route.params.uname, false, userInfo.uname)
    } else {
      res = await getUserInfo(userInfo.token, true, userInfo.uname)
      self.current = true
    }

    if (res.status === 200) {
      userData.current = res.data
      setRefresh(!refresh)
    }
  }

  const handleFollow = async () => {
    if (userData.current.fname) {
      const res = await removeFollowing(
        userInfo.token,
        userData.current.userName
      )

      userData.current.fname = false
      setRefresh(!refresh)
    } else {
      const res = await addFollowing(userInfo.token, userData.current.userName)

      userData.current.fname = true
      setRefresh(!refresh)
    }
  }

  const handleFollowNav = tn => {
    const title = tn === 'fr' ? 'Followers' : 'Following'

    navigation.push('FollowerStack', {
      tn,
      un: userData.current.userName,
      title,
    })
  }

  const handlePostNav = () => {
    const name = userData.current.name.split(' ')[0]

    navigation.push('PostStack', {
      un: userData.current.userName,
      title: `${name}'s posts`,
    })
  }

  return Boolean(userData.current) ? (
    <View style={globalStyles.container}>
      <Divider
        style={{ backgroundColor: 'grey', marginBottom: 5, marginTop: 10 }}
      />

      <View style={styles.infoCont}>
        <View>
          <View style={styles.avatar}>
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
          <Text style={styles.uname}>@{userData.current.userName}</Text>
        </View>

        <View style={styles.txtCont}>
          <View style={styles.city}>
            <MaterialCommunityIcons
              name='information-outline'
              size={20}
              color='#2c7273'
            />
            <Text style={{ flex: 1, marginLeft: 5 }}>
              {userData.current.about}
            </Text>
          </View>

          <View style={styles.city}>
            <MaterialCommunityIcons
              name='map-marker-outline'
              size={20}
              color='#2c7273'
            />
            <Text style={{ marginLeft: 5 }}>{userData.current.city}</Text>
          </View>

          {self.current ? (
            <Button
              icon='account-edit'
              style={{ marginTop: 15, paddingHorizontal: 2 }}
              color='#0092d6'
              onPress={handleSignOut}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              icon='account-edit'
              style={{ marginTop: 15, paddingHorizontal: 2 }}
              color='#0092d6'
              onPress={handleFollow}
            >
              {userData.current.fname ? 'Following' : 'Follow'}
            </Button>
          )}
        </View>
      </View>

      <Divider
        style={{ backgroundColor: 'grey', marginBottom: 30, marginTop: 10 }}
      />

      <Button
        icon='book-open-page-variant'
        style={styles.btn}
        color='orange'
        onPress={handlePostNav}
      >
        {self.current ? 'My Posts' : 'Posts'}
      </Button>
      <Button
        icon='account-arrow-right'
        style={styles.btn}
        color='orange'
        onPress={() => handleFollowNav('fr')}
      >
        Followers
      </Button>
      <Button
        icon='account-arrow-left'
        style={styles.btn}
        color='orange'
        onPress={() => handleFollowNav('fg')}
      >
        Following
      </Button>
      {self.current && (
        <Button
          icon='bookmark-multiple'
          style={styles.btn}
          color='orange'
          onPress={() => navigation.navigate('Bookmarks')}
        >
          Bookmarks
        </Button>
      )}
      {self.current && (
        <Button
          icon='logout'
          style={styles.btn}
          color='orange'
          onPress={handleSignOut}
        >
          Log Out
        </Button>
      )}
    </View>
  ) : (
    <Loading txt='' />
  )
}

const styles = StyleSheet.create({
  infoCont: {
    flexDirection: 'row',
  },
  txtCont: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 5,
    marginLeft: 20,
  },
  avatar: {
    ...globalStyles.avatar,
    marginBottom: 10,
  },
  uname: {
    textAlign: 'center',
  },
  city: {
    marginTop: 10,
    flexDirection: 'row',
  },
  btn: {
    marginBottom: 10,
  },
})

export default Profile
