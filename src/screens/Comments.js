import { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import Bookmark from '../components/Bookmark'
import Comment from '../components/Comment'
import ListFooter from '../components/ListFooter'
import Loading from '../components/Loading'
import NotResults from '../components/NotResults'
import { getComments } from '../helpers/Api/comment'
import { MAX_ID } from '../helpers/constants'
import UserContext from '../store/UserContext'

const Comments = props => {
  const data = useRef([])
  const more = useRef(true)
  const [pull, setPull] = useState(false)
  const last = useRef(MAX_ID)
  const [refresh, setRefresh] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    handleNewComments()
  }, [])

  const handleNewComments = async () => {
    const res = await getComments(MAX_ID, props.route.params.pid)

    if (res.status !== 400) {
      last.current = res.data[res.data.length - 1].bid
      data.current = res.data
      more.current = true

      setRefresh(!refresh)
    } else {
      setNotFound(true)
    }
  }

  const handleGetComments = async isPulled => {
    if (!more.current) return

    // if (!isPulled) {
    //   console.log('called')
    // }

    const res = await getComments(last.current, props.route.params.pid)

    if (res.status !== 400) {
      last.current = res.data[res.data.length - 1].bid
      if (isPulled) {
        data.current = res.data
        more.current = true
      } else {
        data.current = [...data.current, ...res.data]
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
    data.current = []
    await handleGetComments(true)
    // await handleNewBookmarks()
    setPull(false)
  }

  const renderItem = itemData => {
    return <Comment item={itemData.item} navigation={props.navigation} />
  }

  return notFound ? (
    <NotResults />
  ) : data.current.length ? (
    <View style={styles.container}>
      <FlatList
        data={data.current}
        renderItem={renderItem}
        keyExtractor={item => item.cid}
        onEndReached={() => handleGetComments(false)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<ListFooter data={more.current} />}
        onRefresh={handleRefresh}
        refreshing={pull}
      />
    </View>
  ) : (
    <Loading txt='Getting Comments...' />
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
})

export default Comments
