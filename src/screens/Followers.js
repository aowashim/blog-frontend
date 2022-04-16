import { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Follower from '../components/Follower'
import ListFooter from '../components/ListFooter'
import Loading from '../components/Loading'
import { getFollowers, getFollowing } from '../helpers/callApi'
import UserContext from '../store/UserContext'

const Followers = props => {
  const followers = useRef([])
  const more = useRef(true)
  const [pull, setPull] = useState(false)
  const last = useRef(99999)
  const [refresh, setRefresh] = useState(false)
  const { userInfo } = useContext(UserContext)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    handleNewFollowers()
  }, [])

  const handleNewFollowers = async () => {
    let res
    if (props.route.params.tn === 'fr') {
      res = await getFollowers(props.route.params.un, 99999)
    } else {
      res = await getFollowing(props.route.params.un, 99999)
    }

    if (res.status !== 400) {
      last.current = res.data[res.data.length - 1].id
      followers.current = res.data
      more.current = true

      setRefresh(!refresh)
    } else {
      setNotFound(true)
      // setRefresh(!refresh)
    }
  }

  const handleFollowerProfile = async (uname, name) => {
    // let destScreen = 'ViewProfile'
    // const curScreen = props.route.params.screen
    // // console.log(curScreen)
    // if (curScreen === 'ProfileS' || curScreen === 'FollowerProfile')
    //   destScreen = 'FollowerProfile'

    props.navigation.push('ProfileStack', {
      uname,
      name,
    })

    // if (curScreen === 'ProfileS' || curScreen === 'FollowerProfile') {
    //   props.navigation.navigate('FollowerProfile', {
    //     uname,
    //     name,
    //   })
    // } else {
    //   props.navigation.navigate('ViewProfile', {
    //     uname,
    //     name,
    //   })
    // }
  }

  const handleGetFollowers = async isPulled => {
    if (!more.current) return

    // if (!isPulled) {
    //   console.log('called')
    // }

    let res
    if (props.route.params.tn === 'fr') {
      res = await getFollowers(props.route.params.un, last.current)
    } else {
      res = await getFollowing(props.route.params.un, last.current)
    }

    if (res.status !== 400) {
      last.current = res.data[res.data.length - 1].id
      if (isPulled) {
        followers.current = res.data
        more.current = true
      } else {
        followers.current = [...followers.current, ...res.data]
      }
      setRefresh(!refresh)
    } else {
      more.current = false
      setRefresh(!refresh)
    }
  }

  const handleRefresh = async () => {
    setPull(true)
    more.current = true
    last.current = 99999
    followers.current = []
    await handleGetFollowers(true)
    // await handleNewBookmarks()
    setPull(false)
  }

  const renderItem = itemData => {
    return (
      <Follower
        item={itemData.item}
        handleFollowerProfile={handleFollowerProfile}
      />
    )
  }

  return notFound ? (
    <Text>Not found</Text>
  ) : followers.current.length ? (
    <View style={styles.container}>
      <FlatList
        data={followers.current}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={() => handleGetFollowers(false)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<ListFooter data={more.current} />}
        onRefresh={handleRefresh}
        refreshing={pull}
      />
    </View>
  ) : (
    <Loading txt='Getting followers...' />
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
})

export default Followers
