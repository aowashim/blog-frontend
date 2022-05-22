import { ScrollView, ToastAndroid, View } from 'react-native'
import { Avatar, Button, Text, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { signUpValidation } from '../helpers/yupValidation'
import { globalStyles } from '../helpers/globalStyles'
import { checkUser, registerUser } from '../helpers/callApi'
import ImagePicker from '../components/ImagePicker'
import { useContext, useState } from 'react'
import { pickImage } from '../helpers/pickImage'
import { uploadToCloud } from '../helpers/uploadToCloud'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Loading from '../components/Loading'
import UserContext from '../store/UserContext'
import { storeData } from '../helpers/asyncStorage'

const SignUp = props => {
  const [modalPicImage, setModalPicImage] = useState(false)
  const [usernameChecked, setUsernameChecked] = useState(false)
  const [signingUp, setSigningUp] = useState(false)
  const [dp, setDp] = useState('')
  const { setUserInfo } = useContext(UserContext)

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

    if (res.status === 200) {
      await storeData('userInfo', res.data)

      setSigningUp(false)
      setUserInfo({ ...res.data, user: true })
      return
    } else if (res.status === 400) {
      ToastAndroid.show('অবৈধ username বা পাছৱৰ্ড', ToastAndroid.LONG)
    } else {
      ToastAndroid.show(
        'এটা ত্ৰুটি ঘটিছে, অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক',
        ToastAndroid.LONG
      )
    }

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
        ToastAndroid.show('Username উপলব্ধ ...', ToastAndroid.LONG)
      } else {
        ToastAndroid.show(
          'এইটো username উপলব্ধ নহয়, অনুগ্ৰহ কৰি অন্য় এটা username প্ৰৱিষ্ট কৰক',
          ToastAndroid.LONG
        )
      }
    } else {
      ToastAndroid.show('অনুগ্ৰহ কৰি username প্ৰৱিষ্ট কৰক', ToastAndroid.SHORT)
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
        <Text style={{ marginTop: 5, color: 'grey' }}>প্ৰ’ফাইল ফটো</Text>
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
              'ছাইন আপ কৰাৰ আগতে username পৰীক্ষা কৰক',
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
                placeholder='Username প্ৰৱিষ্ট কৰক ...'
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
                Username পৰীক্ষা কৰক
              </Button>
            )}

            <View style={globalStyles.textIn}>
              <TextInput
                label='পাছৱৰ্ড'
                placeholder='পাছৱৰ্ড প্ৰৱিষ্ট কৰক ...'
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
                label='নাম'
                placeholder='নাম প্ৰৱিষ্ট কৰক ...'
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
                label='নগৰ'
                placeholder='নগৰ প্ৰৱিষ্ট কৰক ...'
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
                label='আপোনাৰ বিষয়ে'
                placeholder='আপোনাৰ বিষয়ে লিখক ...'
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
              ছাইন আপ কৰক
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
