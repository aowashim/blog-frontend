import { ScrollView, View } from 'react-native'
import { Avatar, Button, IconButton, Text, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { signUpValidation } from '../helpers/yupValidation'
import { globalStyles } from '../helpers/globalStyles'
import { registerUser } from '../helpers/callApi'
import MyModal from '../components/MyModal'
import { useState } from 'react'
import { pickImage } from '../helpers/pickImage'
import { uploadToCloud } from '../helpers/uploadToCloud'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SignUp = props => {
  const [modalPicImage, setModalPicImage] = useState(false)
  const [dp, setDp] = useState('')

  const handleSignUp = async values => {
    const data = await uploadToCloud(dp)
    if (data[0]) {
      const res = await registerUser({ ...values, dp: data[1] })
      console.log(res)
    } else {
      console.log('Sign up failed...')
    }
  }

  const handleImage = async (val, isDp) => {
    setModalPicImage(false)
    const imgUri = await pickImage(val, isDp)

    if (imgUri) {
      setDp(imgUri)
    }
  }

  return (
    <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
      <View style={globalStyles.avatar}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setModalPicImage(true)}
        >
          {dp ? (
            <Avatar.Image size={100} source={{ uri: dp }} />
          ) : (
            <Avatar.Icon
              size={100}
              icon='account-edit'
              style={{ backgroundColor: '#333333' }}
            />
          )}
        </TouchableOpacity>
        <Text style={{ marginTop: 5, color: 'grey' }}>Profile picture</Text>
      </View>

      <Formik
        initialValues={{ email: '', pwrd: '', name: '', city: '', about: '' }}
        validationSchema={signUpValidation}
        onSubmit={(values, action) => {
          handleSignUp(values)
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
                label='Email'
                placeholder='Enter your email...'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && (
                <Text style={globalStyles.errorText}>
                  {touched.email && errors.email}
                </Text>
              )}
            </View>

            <View style={globalStyles.textIn}>
              <TextInput
                label='Password'
                placeholder='Enter your password...'
                onChangeText={handleChange('pwrd')}
                onBlur={handleBlur('pwrd')}
                value={values.pwrd}
              />
              {errors.pwrd && (
                <Text style={globalStyles.errorText}>
                  {touched.pwrd && errors.pwrd}
                </Text>
              )}
            </View>

            <View style={globalStyles.textIn}>
              <TextInput
                label='Name'
                placeholder='Enter your name...'
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors.name && (
                <Text style={globalStyles.errorText}>
                  {touched.name && errors.name}
                </Text>
              )}
            </View>

            <View style={globalStyles.textIn}>
              <TextInput
                label='City'
                placeholder='Enter your city...'
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.city}
              />
              {errors.city && (
                <Text style={globalStyles.errorText}>
                  {touched.city && errors.city}
                </Text>
              )}
            </View>

            <View style={globalStyles.textIn}>
              <TextInput
                label='About'
                placeholder='Enter about yourself...'
                multiline={true}
                onChangeText={handleChange('about')}
                onBlur={handleBlur('about')}
                value={values.about}
              />
              {errors.about && (
                <Text style={globalStyles.errorText}>
                  {touched.about && errors.about}
                </Text>
              )}
            </View>

            <Button
              onPress={handleSubmit}
              mode='contained'
              icon='account-arrow-right'
              style={{ marginTop: 10 }}
            >
              Sign Up
            </Button>
          </View>
        )}
      </Formik>

      <MyModal
        visible={modalPicImage}
        onPress={() => setModalPicImage(false)}
        onRequestClose={() => setModalPicImage(false)}
      >
        <Button
          style={{ marginTop: 5 }}
          icon='camera'
          color='white'
          onPress={() => handleImage('c', true)}
        >
          camera
        </Button>
        <Button
          icon='folder-image'
          color='white'
          onPress={() => handleImage('g', true)}
        >
          gallery
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          icon='cancel'
          color='white'
          onPress={() => setModalPicImage(false)}
        >
          Cancel
        </Button>
      </MyModal>
    </ScrollView>
  )
}

export default SignUp
