import { useContext, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import Loading from '../components/Loading'
import Post from '../components/Post'
import { getSinglePost } from '../helpers/callApi'
import UserContext from '../store/UserContext'

const SinglePost = props => {
  const { userInfo } = useContext(UserContext)
  const postData = useRef('')
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    handlePostData()
  }, [])

  const handlePostData = async () => {
    const res = await getSinglePost(userInfo.token, props.route.params.pid)
    postData.current = res.data

    setRefresh(!refresh)
  }

  return postData.current.length ? (
    <ScrollView>
      <View style={{ marginHorizontal: 5 }}>
        <Post
          item={postData.current[0]}
          navigation={props.navigation}
          home={Boolean(!props.route.params?.un)}
        />

        {/* create comment */}
        <Button
          onPress={() =>
            props.navigation.navigate('CreateComment', {
              name: postData.current[0].name,
              pid: postData.current[0].pid,
            })
          }
          // mode='contained'
          icon='comment-outline'
          color='orange'
          style={{ marginTop: 30 }}
        >
          মন্তব্য় দিয়ক
        </Button>

        {/* view comments */}
        <Button
          onPress={() => {}}
          // mode='contained'
          icon='comment-eye-outline'
          color='orange'
          style={{ marginTop: 10 }}
        >
          পূৰ্বৰ মন্তব্য়সমূহ চাওক
        </Button>
      </View>
    </ScrollView>
  ) : (
    <Loading txt='Getting post...' />
  )
}

export default SinglePost
