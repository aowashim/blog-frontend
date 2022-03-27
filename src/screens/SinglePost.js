import { useContext, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
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
    <View style={{ marginHorizontal: 5 }}>
      <Post
        item={postData.current[0]}
        navigation={props.navigation}
        home={Boolean(!props.route.params?.un)}
      />
    </View>
  ) : (
    <Loading txt='Getting post...' />
  )
}

export default SinglePost
