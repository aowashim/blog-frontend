import axios from 'axios'
//import { SERVER } from '@env'

const SERVER = 'http://10.55.12.133:5000'

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

    res.data = val.data.token
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
      email: values.email,
      pwrd: values.pwrd,
    })

    res.data = val.data.token
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
