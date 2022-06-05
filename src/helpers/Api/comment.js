import axios from 'axios'
import { SERVER } from '../constants'

export const createComment = async (values, token) => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.post(`${SERVER}/comment`, values, {
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
