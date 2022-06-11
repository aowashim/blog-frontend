import axios from 'axios'
import { SERVER } from '../constants'

export const deletePost = async (pid, token) => {
  try {
    const val = await axios.delete(
      `${SERVER}/post`,

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
