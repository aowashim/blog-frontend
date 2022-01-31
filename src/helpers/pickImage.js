import * as ImagePicker from 'expo-image-picker'

export const pickImage = async (val, isDp) => {
  let options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.5,
  }
  if (isDp) {
    options = { ...options, aspect: [1, 1] }
  }

  if (val === 'g') {
    const data = await ImagePicker.launchImageLibraryAsync({ ...options })
    if (!data.cancelled) return data.uri
  } else {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()

    if (granted) {
      const data = await ImagePicker.launchCameraAsync({ ...options })
      if (!data.cancelled) return data.uri
    }
  }
}
