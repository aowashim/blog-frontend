import { useContext, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import Loading from '../components/Loading'
import Post from '../components/Post'
import { addBookMark, getSinglePost, rmvBookMark } from '../helpers/callApi'
import UserContext from '../store/UserContext'

const SinglePost = props => {
  const { userInfo } = useContext(UserContext)
  const postData = useRef('')
  const [refresh, setRefresh] = useState(false)
  const [bookmarkControl, setBookmarkControl] = useState(true)

  useEffect(() => {
    handlePostData()
  }, [bookmarkControl])

  const handlePostData = async () => {
    const res = await getSinglePost(userInfo.token, props.route.params.pid)
    postData.current = res.data

    setRefresh(!refresh)
  }

  const handleBookMark = async (id, bm, index, title) => {
    if (userInfo.user) {
      if (Boolean(bm)) {
        const status = await rmvBookMark(id, userInfo.token)

        if (status === 200) {
          setBookmarkControl(!bookmarkControl)
        }
      } else {
        const status = await addBookMark(id, userInfo.token, title)

        if (status === 200) {
          setBookmarkControl(!bookmarkControl)
        }
      }
    } else {
      ToastAndroid.show('Please sign in to bookmark', ToastAndroid.LONG)
    }
  }

  return postData.current.length ? (
    <ScrollView>
      <View style={{ marginHorizontal: 5, marginTop: 10 }}>
        <Post
          item={postData.current[0]}
          navigation={props.navigation}
          handleBookMark={handleBookMark}
          home={Boolean(!props.route.params?.un)}
        />

        {/* create comment */}
        <Button
          onPress={() =>
            props.navigation.navigate('CreateComment', {
              pid: postData.current[0].pid,
            })
          }
          // mode='contained'
          icon='comment-outline'
          color='orange'
          style={{ marginTop: 30 }}
        >
          মন্তব্য দিয়ক
        </Button>

        {/* view comments */}
        <Button
          onPress={() =>
            props.navigation.navigate('ViewComments', {
              pid: postData.current[0].pid,
            })
          }
          // mode='contained'
          icon='comment-eye-outline'
          color='orange'
          style={{ marginTop: 10 }}
        >
          পূৰ্বৰ মন্তব্যসমূহ চাওক
        </Button>
      </View>
    </ScrollView>
  ) : (
    <Loading txt='Getting post...' />
  )
}

export default SinglePost
