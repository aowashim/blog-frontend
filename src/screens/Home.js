import { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Button, Headline, Paragraph, Text } from 'react-native-paper'
import ListFooter from '../components/ListFooter'
import Post from '../components/Post'
import { getAllPost } from '../helpers/callApi'

const Home = () => {
  const posts = useRef([])
  const morePost = useRef(true)
  const [pull, setPull] = useState(false)
  const lastPost = useRef(99999)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    handlePosts(false)
  }, [])

  const handlePosts = async isPulled => {
    if (!morePost.current) return

    const res = await getAllPost(lastPost.current)

    if (res.status !== 400) {
      lastPost.current = res.data[9].pid
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

  const handleRefresh = async () => {
    setPull(true)
    morePost.current = true
    lastPost.current = 99999
    await handlePosts(true)
    setPull(false)
  }

  const renderItem = itemData => {
    return <Post item={itemData.item} />
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
    </View>
  ) : (
    <View style={styles.container}>
      <Button onPress={() => handlePosts(false)}>CLick</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
})

export default Home
