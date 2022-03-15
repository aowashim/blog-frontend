import { useContext, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
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
    postData.current = res.data[0]

    console.log(postData.current)

    setRefresh(!refresh)
  }

  return (
    <Post
      item={postData.current}
      navigation={props.navigation}
      home={Boolean(!props.route.params?.un)}
    />
  )
}

export default SinglePost
