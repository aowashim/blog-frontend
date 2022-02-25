import { ScrollView, ToastAndroid, View } from 'react-native'
import { Avatar, Button, Text, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { signUpValidation } from '../helpers/yupValidation'
import { globalStyles } from '../helpers/globalStyles'
import { checkUser, registerUser } from '../helpers/callApi'
import ImagePicker from '../components/ImagePicker'
import { useState } from 'react'
import { pickImage } from '../helpers/pickImage'
import { uploadToCloud } from '../helpers/uploadToCloud'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Loading from '../components/Loading'

const SignUp = props => {
  const [modalPicImage, setModalPicImage] = useState(false)
  const [usernameChecked, setUsernameChecked] = useState(false)
  const [signingUp, setSigningUp] = useState(false)
  const [dp, setDp] = useState('')

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

  const handleImage = async val => {
    setModalPicImage(false)
    const imgUri = await pickImage(val, true)

    if (imgUri) {
      setDp(imgUri)
    }
  }

  const handleCheckUser = async val => {
    if (val) {
      const data = await checkUser(val)
      if (data.status === 200) {
        setUsernameChecked(true)
        ToastAndroid.show(
          'Username available, please proceed...',
          ToastAndroid.LONG
        )
      } else {
        ToastAndroid.show(
          'Username already taken, please try with a different username.',
          ToastAndroid.LONG
        )
      }
    } else {
      ToastAndroid.show('Please enter an username.', ToastAndroid.SHORT)
    }
  }

  return signingUp ? (
    <Loading txt='Signing up...' />
  ) : (
    <ScrollView style={{ marginHorizontal: 10 }}>
      <View style={globalStyles.avatar}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setModalPicImage(true)}
          style={{ marginTop: 10 }}
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
        initialValues={{
          userName: '',
          pwrd: '',
          name: '',
          city: '',
          about: '',
        }}
        validationSchema={signUpValidation}
        onSubmit={(values, action) => {
          if (usernameChecked) {
            handleSignUp(values)
          } else {
            ToastAndroid.show(
              'Please check username before signing up.',
              ToastAndroid.LONG
            )
          }
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
                label='Username'
                placeholder='Enter your username...'
                disabled={usernameChecked ? true : false}
                onChangeText={handleChange('userName')}
                onBlur={handleBlur('userName')}
                value={values.userName}
              />
              {errors.userName && touched.userName && (
                <Text style={globalStyles.errorText}>
                  {touched.userName && errors.userName}
                </Text>
              )}
            </View>

            {!usernameChecked && (
              <Button
                color='orange'
                icon='checkbox-marked-circle-outline'
                disabled={errors.userName ? true : false}
                onPress={() => handleCheckUser(values.userName)}
              >
                Check username
              </Button>
            )}

            <View style={globalStyles.textIn}>
              <TextInput
                label='Password'
                placeholder='Enter your password...'
                onChangeText={handleChange('pwrd')}
                onBlur={handleBlur('pwrd')}
                value={values.pwrd}
              />
              {errors.pwrd && touched.pwrd && (
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
              {errors.name && touched.name && (
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
              {errors.city && touched.city && (
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
              {errors.about && touched.about && (
                <Text style={globalStyles.errorText}>
                  {touched.about && errors.about}
                </Text>
              )}
            </View>

            <Button
              onPress={handleSubmit}
              mode='contained'
              icon='account-arrow-right'
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              Sign Up
            </Button>
          </View>
        )}
      </Formik>

      <ImagePicker
        visible={modalPicImage}
        handleImage={handleImage}
        closeModal={() => setModalPicImage(false)}
      />
    </ScrollView>
  )
}

export default SignUp
