//import { CLOUDINAR_API, UPLOAD_PRESET, CLOUD_NAME } from '@env'
const CLOUDINAR_API = 'https://api.cloudinary.com/v1_1/aowashim/image/upload'
const UPLOAD_PRESET = 'hfr2ipiz'
const CLOUD_NAME = 'aowashim'

export const uploadToCloud = async file => {
  const formData = new FormData()
  let data
  let success = false

  const exTn1 = file.split('.').pop()

  formData.append('file', {
    uri: file,
    type: `image/${exTn1}`,
    name: `image.${exTn1}`,
  })
  formData.append('upload_preset', `${UPLOAD_PRESET}`)
  formData.append('cloud_name', `${CLOUD_NAME}`)

  try {
    let response = await fetch(`${CLOUDINAR_API}`, {
      method: 'POST',
      body: formData,
    })
    data = await response.json()
    success = true
    return [success, data.secure_url]
  } catch (err) {
    return [success, err.message]
  }
}
