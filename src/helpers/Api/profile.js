import axios from 'axios'
import { SERVER } from '../constants'

export const editProfile = async (values, token) => {
  const res = { data: '', status: 200 }
  try {
    const val = await axios.put(`${SERVER}/profile`, values, {
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
