import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Text, TextInput, Button, IconButton } from 'react-native-paper'
import { Formik } from 'formik'
import { postValidation } from '../helpers/yupValidation'
import { globalStyles } from '../helpers/globalStyles'
import { useState } from 'react'
import ImagePicker from '../components/ImagePicker'
import { pickImage } from '../helpers/pickImage'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CreatePost = () => {
  const [dp, setDp] = useState('')
  const [modalPicImage, setModalPicImage] = useState(false)

  const handleSignUp = async values => {
    setSigningUp(true)
    let dpUri = ''
    if (dp) {
      const data = await uploadToCloud(dp)
      if (!data[0]) {
        console.log('Sign up failed...')
        return
      } else {
        dpUri = data[1]
      }
    }

    const res = await registerUser({ ...values, dpUri })
    console.log(res)
    setSigningUp(false)
    setUsernameChecked(false)
  }

  const handleImage = async (val, isDp) => {
    setModalPicImage(false)
    const imgUri = await pickImage(val, false)

    if (imgUri) {
      setDp(imgUri)
    }
  }

  return (
    <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
      <Formik
        initialValues={{ title: '', description: '' }}
        validationSchema={postValidation}
        onSubmit={(values, action) => {
          // handleSignIn(values)
          console.log(values)
          //action.resetForm()
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View>
            <View style={globalStyles.textIn}>
              <TextInput
                label='Title'
                placeholder='Enter title...'
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              {errors.title && touched.title && (
                <Text style={globalStyles.errorText}>
                  {touched.title && errors.title}
                </Text>
              )}
            </View>

            <View style={globalStyles.textIn}>
              <TextInput
                label='Description'
                // mode='outlined'
                placeholder='Enter description...'
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                multiline
                numberOfLines={12}
              />
              {errors.description && touched.description && (
                <Text style={globalStyles.errorText}>
                  {touched.description && errors.description}
                </Text>
              )}
            </View>

            {Boolean(dp) ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setModalPicImage(true)}
              >
                <Image
                  style={{ height: 180, width: '100%', marginBottom: 15 }}
                  source={{
                    uri: dp,
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            ) : (
              <IconButton
                icon='image-plus'
                color='#a2a7b8'
                size={80}
                onPress={() => setModalPicImage(true)}
              />
            )}

            <Button
              onPress={handleSubmit}
              mode='contained'
              icon='login'
              style={{ marginTop: 10 }}
            >
              Post
            </Button>
          </View>
        )}
      </Formik>

      {/* <Button
        onPress={() => setModalPicImage(true)}
        mode='contained'
        icon='login'
        style={{ marginTop: 10 }}
      >
        Image
      </Button> */}

      <ImagePicker
        visible={modalPicImage}
        handleImage={handleImage}
        closeModal={() => setModalPicImage(false)}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
})

export default CreatePost
