import { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import { Button, FAB } from 'react-native-paper'
import ListFooter from '../components/ListFooter'
import Loading from '../components/Loading'
import Post from '../components/Post'
import { addBookMark, getAllPost, rmvBookMark } from '../helpers/callApi'
import UserContext from '../store/UserContext'

const Home = props => {
  const posts = useRef([])
  const morePost = useRef(true)
  const [pull, setPull] = useState(false)
  const lastPost = useRef(99999)
  const [refresh, setRefresh] = useState(false)
  const { userToken } = useContext(UserContext)

  useEffect(() => {
    handlePosts(false)
  }, [])

  const handlePosts = async isPulled => {
    if (!morePost.current) return

    const res = await getAllPost(lastPost.current, userToken)

    if (res.status !== 400) {
      lastPost.current = res.data[res.data.length - 1].pid
      if (isPulled) {
        posts.current = res.data
        morePost.current = true
      } else {
        posts.current = [...posts.current, ...res.data]
      }
      setRefresh(!refresh)
    } else {
      morePost.current = false
      setRefresh(!refresh)
    }
  }

  const changePostData = (index, bm) => {
    posts.current[index].bm = bm
    setRefresh(!refresh)

    if (bm) {
      ToastAndroid.show('Added to bookmark', ToastAndroid.SHORT)
    } else {
      ToastAndroid.show('Removed from bookmark', ToastAndroid.SHORT)
    }
  }

  const handleBookMark = async (id, bm, index) => {
    if (userToken) {
      if (Boolean(bm)) {
        const status = await rmvBookMark(id, userToken)

        if (status === 200) {
          changePostData(index, 0)
        }
      } else {
        const status = await addBookMark(id, userToken)

        if (status === 200) {
          changePostData(index, 1)
        }
      }
    } else {
      ToastAndroid.show('Please sign in to bookmark', ToastAndroid.LONG)
    }
  }

  const handleRefresh = async () => {
    setPull(true)
    morePost.current = true
    lastPost.current = 99999
    await handlePosts(true)
    setPull(false)
  }

  const renderItem = itemData => {
    return (
      <Post
        item={itemData.item}
        handleBookMark={handleBookMark}
        index={itemData.index}
      />
    )
  }

  return posts.current.length ? (
    <View style={styles.container}>
      <FlatList
        data={posts.current}
        renderItem={renderItem}
        keyExtractor={item => item.pid}
        onEndReached={() => handlePosts(false)}
        onEndReachedThreshold={0}
        ListFooterComponent={<ListFooter data={morePost.current} />}
        onRefresh={handleRefresh}
        refreshing={pull}
      />

      <FAB
        style={styles.fab}
        icon='pen-plus'
        onPress={() => props.navigation.navigate('Post')}
      />
    </View>
  ) : (
    <Loading txt='Getting posts...' />
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export default Home
