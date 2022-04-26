import axios from 'axios'
import { SERVER } from '../constants'

export const getSearchPost = async (pid, key) => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.get(`${SERVER}/s/post?pid=${pid}&key=${key}`)

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}

export const getSearchUser = async (uid, key) => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.get(`${SERVER}/s/users?uid=${uid}&key=${key}`)

    res.data = val.data
    res.status = val.status
  } catch (error) {
    res.data = error.message
    res.status = error.response.status
  }

  return res
}
