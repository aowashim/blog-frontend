import { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Bookmark from '../components/Bookmark'
import ListFooter from '../components/ListFooter'
import Loading from '../components/Loading'
import {
  addBookMark,
  getAllPost,
  getBookmarks,
  getSinglePost,
  getUserPosts,
  rmvBookMark,
} from '../helpers/callApi'
import UserContext from '../store/UserContext'

const Bookmarks = props => {
  const bookmarks = useRef([])
  const more = useRef(true)
  const [pull, setPull] = useState(false)
  const last = useRef(99999)
  const [refresh, setRefresh] = useState(false)
  const { userInfo } = useContext(UserContext)

  useEffect(() => {
    handleNewBookmarks()
  }, [])

  const handleNewBookmarks = async () => {
    const res = await getBookmarks(userInfo.token, 99999)

    if (res.status !== 400) {
      last.current = res.data[res.data.length - 1].bid
      bookmarks.current = res.data
      more.current = true

      setRefresh(!refresh)
    } else {
      // more.current = false
      setRefresh(!refresh)
    }
  }

  const handleViewPost = async pid => {
    props.navigation.navigate('SinglePost', { pid })
  }

  const handleGetBookmarks = async isPulled => {
    if (!more.current) return

    // if (!isPulled) {
    //   console.log('called')
    // }

    const res = await getBookmarks(userInfo.token, last.current)

    if (res.status !== 400) {
      last.current = res.data[res.data.length - 1].bid
      if (isPulled) {
        bookmarks.current = res.data
        more.current = true
      } else {
        bookmarks.current = [...bookmarks.current, ...res.data]
      }
      setRefresh(!refresh)
    } else {
      more.current = false
      setRefresh(!refresh)
    }
  }

  //   const changePostData = (index, bm) => {
  //     bookmarks.current[index].bm = bm
  //     setRefresh(!refresh)

  //     if (bm) {
  //       ToastAndroid.show('Added to bookmark', ToastAndroid.SHORT)
  //     } else {
  //       ToastAndroid.show('Removed from bookmark', ToastAndroid.SHORT)
  //     }
  //   }

  //   const handleBookMark = async (id, bm, index, title) => {
  //     if (userInfo.user) {
  //       if (Boolean(bm)) {
  //         const status = await rmvBookMark(id, userInfo.token)

  //         if (status === 200) {
  //           changePostData(index, 0)
  //         }
  //       } else {
  //         const status = await addBookMark(id, userInfo.token, title)

  //         if (status === 200) {
  //           changePostData(index, 1)
  //         }
  //       }
  //     } else {
  //       ToastAndroid.show('Please sign in to bookmark', ToastAndroid.LONG)
  //     }
  //   }

  const handleRefresh = async () => {
    setPull(true)
    more.current = true
    last.current = 99999
    bookmarks.current = []
    await handleGetBookmarks(true)
    // await handleNewBookmarks()
    setPull(false)
  }

  const renderItem = itemData => {
    return <Bookmark item={itemData.item} handleViewPost={handleViewPost} />
  }

  return bookmarks.current.length ? (
    <View style={styles.container}>
      <FlatList
        data={bookmarks.current}
        renderItem={renderItem}
        keyExtractor={item => item.pid}
        onEndReached={() => handleGetBookmarks(false)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<ListFooter data={more.current} />}
        onRefresh={handleRefresh}
        refreshing={pull}
      />
    </View>
  ) : (
    <Loading txt='Getting bookmarks...' />
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
})

export default Bookmarks
