import { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Follower from '../components/Follower'
import ListFooter from '../components/ListFooter'
import Loading from '../components/Loading'
import NotResults from '../components/NotResults'
import { getSearchUser } from '../helpers/Api/search'
import { getFollowers, getFollowing } from '../helpers/callApi'
import { MAX_ID } from '../helpers/constants'
import UserContext from '../store/UserContext'

const Followers = props => {
  const followers = useRef([])
  const more = useRef(true)
  const [pull, setPull] = useState(false)
  const last = useRef(MAX_ID)
  const [refresh, setRefresh] = useState(false)
  const { userInfo } = useContext(UserContext)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    handleNewFollowers()
  }, [])

  const handleNewFollowers = async () => {
    let res
    const tn = props.route.params.tn

    if (tn === 'fr') {
      res = await getFollowers(props.route.params.un, MAX_ID)
    } else if (tn === 'fg') {
      res = await getFollowing(props.route.params.un, MAX_ID)
    } else {
      res = await getSearchUser(
        MAX_ID,
        props.route.params.key,
        props.route.params.byName
      )
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
    if (uname === userInfo.uname) {
      ToastAndroid.show(
        'Please visit profile tab to access your own profile.',
        ToastAndroid.LONG
      )
      return
    }

    props.navigation.push('ProfileStack', {
      uname,
      name,
    })
  }

  const handleGetFollowers = async isPulled => {
    if (!more.current) return

    let res
    const tn = props.route.params.tn

    if (tn === 'fr') {
      res = await getFollowers(props.route.params.un, last.current)
    } else if (tn === 'fg') {
      res = await getFollowing(props.route.params.un, last.current)
    } else {
      res = await getSearchUser(
        last.current,
        props.route.params.key,
        props.route.params.byName
      )
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
    last.current = MAX_ID
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
    <NotResults />
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
