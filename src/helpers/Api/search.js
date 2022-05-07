import axios from 'axios'
import { SERVER } from '../constants'

export const getSearchPost = async (pid, key, byTitle) => {
  const res = { data: '', status: 200 }
  try {
    const val = byTitle
      ? await axios.get(`${SERVER}/s/post?pid=${pid}&key=${key}`)
      : await axios.get(`${SERVER}/s/post/catg?pid=${pid}&key=${key}`)

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const getSearchUser = async (uid, key, byName) => {
  const res = { data: '', status: 200 }
  try {
    const val = byName
      ? await axios.get(`${SERVER}/s/users?uid=${uid}&key=${key}`)
      : await axios.get(`${SERVER}/s/users/un?uid=${uid}&key=${key}`)

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}
