import axios from 'axios'
//import { SERVER } from '@env'

const SERVER = 'http://10.55.9.85:5000'

export const registerUser = async values => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.post(`${SERVER}/user/signup`, {
      userName: values.userName,
      name: values.name,
      city: values.city,
      about: values.about,
      pwrd: values.pwrd,
      dp: values.dpUri,
    })

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const userSignIn = async values => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.post(`${SERVER}/user/signin`, {
      userName: values.userName,
      pwrd: values.pwrd,
    })

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const checkUser = async un => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.get(`${SERVER}/user/check?un=${un}`)

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const getUserInfo = async (token, self, un) => {
  const res = { data: '', status: 200 }
  try {
    let val

    if (self) {
      val = await axios.get(`${SERVER}/profile`, {
        headers: {
          'x-auth-token': token,
        },
      })
    } else {
      val = await axios.get(`${SERVER}/profile/view?id=${token}&un=${un}`)
    }

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const getAllPost = async (lastPost, token) => {
  const res = { data: '', status: 200 }
  try {
    let val
    if (token) {
      val = await axios.get(`${SERVER}/post/auth?id=${lastPost}`, {
        headers: {
          'x-auth-token': token,
        },
      })
    } else {
      val = await axios.get(`${SERVER}/post/all?id=${lastPost}`)
    }

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const getUserPosts = async (lastPost, token, un) => {
  const res = { data: '', status: 200 }
  try {
    let val
    if (token) {
      val = await axios.get(
        `${SERVER}/post/user/auth?id=${lastPost}&un=${un}`,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
    } else {
      val = await axios.get(`${SERVER}/post/user?id=${lastPost}&un=${un}`)
    }

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const getFollowingPosts = async (lastPost, token) => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.get(
      `${SERVER}/post/auth/following?id=${lastPost}`,
      {
        headers: {
          'x-auth-token': token,
        },
      }
    )

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const createPost = async (values, token) => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.post(`${SERVER}/post`, values, {
      headers: {
        'x-auth-token': token,
      },
    })

    res.data = val.data.token
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const addBookMark = async (pid, token, title) => {
  try {
    const val = await axios.post(
      `${SERVER}/bookmark/`,
      {
        pid,
        title,
      },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    )
    return val.status
  } catch (error) {
    return error.response.status
  }
}

export const rmvBookMark = async (pid, token) => {
  try {
    const val = await axios.delete(
      `${SERVER}/bookmark/`,

      {
        headers: {
          'x-auth-token': token,
        },
        data: {
          pid,
        },
      }
    )
    return val.status
  } catch (error) {
    return error.response.status
  }
}

export const getBookmarks = async (token, last) => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.get(`${SERVER}/bookmark?id=${last}`, {
      headers: {
        'x-auth-token': token,
      },
    })

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const getSinglePost = async (token, pid) => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.get(`${SERVER}/post/auth/one?id=${pid}`, {
      headers: {
        'x-auth-token': token,
      },
    })

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const getFollowers = async (un, id) => {
  // console.log(un)
  const res = { data: '', status: 200 }
  try {
    const val = await axios.get(`${SERVER}/f/follower?id=${id}&un=${un}`)

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const getFollowing = async (un, id) => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.get(`${SERVER}/f/following?id=${id}&un=${un}`)

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const addFollowing = async (token, fn) => {
  try {
    const val = await axios.post(
      `${SERVER}/f/add`,
      {
        fn,
      },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    )
    return val.status
  } catch (error) {
    return error.response.status
  }
}

export const removeFollowing = async (token, fn) => {
  try {
    const val = await axios.delete(`${SERVER}/f/remove`, {
      headers: {
        'x-auth-token': token,
      },
      data: {
        fn,
      },
    })
    return val.status
  } catch (error) {
    // console.log(error.response.data)
    return error.response.status
  }
}
