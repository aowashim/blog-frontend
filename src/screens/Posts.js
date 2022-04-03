import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import { Button, FAB } from 'react-native-paper'
import HomeHeader from '../components/HomeHeader'
import ListFooter from '../components/ListFooter'
import Loading from '../components/Loading'
import Post from '../components/Post'
import SelectModal from '../components/SelectModal'
import {
  addBookMark,
  getAllPost,
  getFollowingPosts,
  getUserPosts,
  rmvBookMark,
} from '../helpers/callApi'
import { globalStyles } from '../helpers/globalStyles'
import UserContext from '../store/UserContext'

const Posts = props => {
  const posts = useRef([])
  const morePost = useRef(true)
  const [pull, setPull] = useState(false)
  const lastPost = useRef(99999)
  const fromAll = useRef(true)
  const [refresh, setRefresh] = useState(false)
  const { userInfo } = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)
  const [colorModalBtn, setColorModalBtn] = useState(true)

  useEffect(() => {
    handleNewPosts()
  }, [userInfo.user, fromAll.current])

  // function to switch between following post and all posts
  const handleViewPost = val => {
    if (fromAll.current !== val) {
      morePost.current = true
      posts.current = []
      fromAll.current = val
      setColorModalBtn(!colorModalBtn)
    }
    setShowModal(false)
  }

  // customizing Home screen to select post from followers and all
  if (props.route.name === 'HomeS') {
    useLayoutEffect(() => {
      props.navigation.setOptions({
        headerLeft: () => <HomeHeader openModal={() => setShowModal(true)} />,
      })
    }, [])
  }

  const handleNewPosts = async () => {
    let res

    if (fromAll.current) {
      if (props.route.params?.un) {
        res = await getUserPosts(99999, userInfo.token, props.route.params.un)
      } else {
        res = await getAllPost(99999, userInfo.token)
      }
    } else {
      res = await getFollowingPosts(99999, userInfo.token)
    }

    if (res.status !== 400) {
      lastPost.current = res.data[res.data.length - 1].pid
      posts.current = res.data
      morePost.current = true

      setRefresh(!refresh)
    } else {
      // morePost.current = false
      setRefresh(!refresh)
    }
  }

  const handlePosts = async isPulled => {
    if (!morePost.current) return

    let res

    if (fromAll.current) {
      if (props.route.params?.un) {
        res = await getUserPosts(
          lastPost.current,
          userInfo.token,
          props.route.params.un
        )
      } else {
        res = await getAllPost(lastPost.current, userInfo.token)
      }
    } else {
      res = await getFollowingPosts(lastPost.current, userInfo.token)
    }

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

  const handleBookMark = async (id, bm, index, title) => {
    if (userInfo.user) {
      if (Boolean(bm)) {
        const status = await rmvBookMark(id, userInfo.token)

        if (status === 200) {
          changePostData(index, 0)
        }
      } else {
        const status = await addBookMark(id, userInfo.token, title)

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
    posts.current = []
    await handlePosts(true)
    setPull(false)
  }

  const renderItem = itemData => {
    return (
      <Post
        item={itemData.item}
        handleBookMark={handleBookMark}
        index={itemData.index}
        navigation={props.navigation}
        home={Boolean(!props.route.params?.un)}
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

      {!props.route.params?.un && (
        <FAB
          style={styles.fab}
          icon='pen-plus'
          // color='grey'
          onPress={() => props.navigation.navigate('Post')}
        />
      )}

      <SelectModal
        show={showModal}
        closeModal={() => setShowModal(false)}
        handleViewPost={handleViewPost}
        all={colorModalBtn}
      />
    </View>
  ) : (
    <Loading txt='Getting posts...' />
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    height: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#115a69',
  },
})

export default Posts
