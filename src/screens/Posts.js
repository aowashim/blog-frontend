import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import { FAB } from 'react-native-paper'
import DeleteModal from '../components/DeleteModal'
import HomeHeader from '../components/HomeHeader'
import ListFooter from '../components/ListFooter'
import Loading from '../components/Loading'
import NotResults from '../components/NotResults'
import Post from '../components/Post'
import SelectModal from '../components/SelectModal'
import { deletePost } from '../helpers/Api/post'
import { getSearchPost } from '../helpers/Api/search'
import {
  addBookMark,
  getAllPost,
  getFollowingPosts,
  getUserPosts,
  rmvBookMark,
} from '../helpers/callApi'
import { ErrorMsg, LoginRequestMsg, MAX_ID } from '../helpers/constants'
import UserContext from '../store/UserContext'

const Posts = props => {
  const posts = useRef([])
  const morePost = useRef(true)
  const [pull, setPull] = useState(false)
  const lastPost = useRef(MAX_ID)
  const postToDelete = useRef({ idx: -1, pid: -1, uname: 'n' })
  // const fromAll = useRef(true)
  const [refresh, setRefresh] = useState(false)
  const { userInfo } = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)
  const [fromAll, setFromAll] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    handleNewPosts()
  }, [userInfo.user, fromAll])

  // function to switch between following post and all posts
  const handleViewPost = val => {
    if (val === 'a') {
      if (!fromAll) {
        morePost.current = true
        posts.current = []
        setFromAll(true)
      }
    } else {
      if (!userInfo.user) {
        ToastAndroid.show(LoginRequestMsg, ToastAndroid.SHORT)
        setShowModal(false)
      } else if (fromAll) {
        morePost.current = true
        posts.current = []
        setFromAll(false)
      }
    }
    setShowModal(false)
  }

  const handleDeletePost = async () => {
    setShowDeleteModal(false)

    if (userInfo.user) {
      if (
        userInfo.uname.toLowerCase() !==
        postToDelete.current.uname.toLowerCase()
      ) {
        ToastAndroid.show(
          "আপুনি আনৰ প'ষ্ট বিলোপ কৰিব নোৱাৰে",
          ToastAndroid.SHORT
        )
      } else {
        const status = await deletePost(
          postToDelete.current.pid,
          userInfo.token
        )

        if (status === 200) {
          posts.current.splice(postToDelete.current.idx, 1)
          ToastAndroid.show("প'ষ্ট সফলতাৰে বিলোপ কৰা হৈছে", ToastAndroid.SHORT)
        } else {
          ToastAndroid.show(ErrorMsg, ToastAndroid.SHORT)
        }
      }
    } else {
      ToastAndroid.show(LoginRequestMsg, ToastAndroid.SHORT)
    }

    postToDelete.current = { idx: -1, pid: -1, uname: 'n' }
  }

  const handleShowDeleteModal = (idx, pid, uname) => {
    postToDelete.current.idx = idx
    postToDelete.current.pid = pid
    postToDelete.current.uname = uname
    setShowDeleteModal(true)
  }

  // customizing Home screen to select post from followers and all
  if (props.route.name === 'HomeStack') {
    useLayoutEffect(() => {
      props.navigation.setOptions({
        headerLeft: () => <HomeHeader openModal={() => setShowModal(true)} />,
      })
    }, [])
  }

  const handleNewPosts = async () => {
    let res
    const key = props.route.params?.search
    const un = props.route.params?.un

    // called when user logs out and he is viewing posts from followers
    // it redirects users to view all posts
    if (!userInfo.user && !fromAll) {
      setFromAll(true)
      setRefresh(!refresh)
    }

    if (fromAll) {
      if (key) {
        res = await getSearchPost(MAX_ID, key, props.route.params.byTitle)
      } else {
        if (un) {
          res = await getUserPosts(MAX_ID, userInfo.token, un)
        } else {
          res = await getAllPost(MAX_ID, userInfo.token)
        }
      }
    } else {
      res = await getFollowingPosts(MAX_ID, userInfo.token)
    }

    if (res.status !== 400) {
      if (notFound) setNotFound(false)
      lastPost.current = res.data[res.data.length - 1].pid
      posts.current = res.data
      morePost.current = true

      setRefresh(!refresh)
    } else {
      // morePost.current = false
      if (!notFound) setNotFound(true)
      setRefresh(!refresh)
    }
  }

  const handlePosts = async isPulled => {
    if (!morePost.current) return

    let res
    const key = props.route.params?.search
    const un = props.route.params?.un

    if (fromAll) {
      if (key) {
        res = await getSearchPost(
          lastPost.current,
          key,
          props.route.params.byTitle
        )
      } else {
        if (un) {
          res = await getUserPosts(lastPost.current, userInfo.token, un)
        } else {
          res = await getAllPost(lastPost.current, userInfo.token)
        }
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

    // if (bm) {
    //   ToastAndroid.show('Added to bookmark', ToastAndroid.SHORT)
    // } else {
    //   ToastAndroid.show('Removed from bookmark', ToastAndroid.SHORT)
    // }
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
      ToastAndroid.show(LoginRequestMsg, ToastAndroid.LONG)
    }
  }

  const handleRefresh = async () => {
    setPull(true)
    morePost.current = true
    lastPost.current = MAX_ID
    posts.current = []
    await handlePosts(true)
    setPull(false)
  }

  const renderItem = itemData => {
    return (
      <Post
        item={itemData.item}
        show={handleShowDeleteModal}
        handleBookMark={handleBookMark}
        index={itemData.index}
        navigation={props.navigation}
        route={props.route}
        home={Boolean(!props.route.params?.un)}
      />
    )
  }

  return notFound ? (
    <>
      <NotResults />
      <SelectModal
        show={showModal}
        closeModal={() => setShowModal(false)}
        handleViewPost={handleViewPost}
        all={fromAll}
      />
    </>
  ) : posts.current.length ? (
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

      {!props.route.params?.un && userInfo.user && (
        <FAB
          style={styles.fab}
          icon='pen-plus'
          // color='grey'
          onPress={() => props.navigation.navigate('CreatePost')}
        />
      )}

      <SelectModal
        show={showModal}
        closeModal={() => setShowModal(false)}
        handleViewPost={handleViewPost}
        all={fromAll}
      />
      <DeleteModal
        show={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
        handleDeletePost={handleDeletePost}
      />
    </View>
  ) : (
    <Loading txt='Getting posts...' />
  )

  // return <Loading txt='Getting posts...' />
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
