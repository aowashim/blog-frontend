import { ScrollView, ToastAndroid, View } from 'react-native'
import { Avatar, Button, Text, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { editProfileValidation } from '../helpers/yupValidation'
import { globalStyles } from '../helpers/globalStyles'
import ImagePicker from '../components/ImagePicker'
import { useContext, useState } from 'react'
import { pickImage } from '../helpers/pickImage'
import { uploadToCloud } from '../helpers/uploadToCloud'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Loading from '../components/Loading'
import UserContext from '../store/UserContext'
import { storeData } from '../helpers/asyncStorage'
import { editProfile } from '../helpers/Api/profile'

const EditProfile = props => {
  const userData = props.route.params.userData
  const edit = props.route.params.edit
  const setEdit = props.route.params.setEdit

  const [modalPicImage, setModalPicImage] = useState(false)
  const [signingUp, setSigningUp] = useState(false)
  const [dp, setDp] = useState(userData.dp)
  const { userInfo, setUserInfo } = useContext(UserContext)
  const [isDpChanged, setIsDpChanged] = useState(false)

  const handleSignUp = async values => {
    setSigningUp(true)
    let dpUri = dp
    if (isDpChanged) {
      const data = await uploadToCloud(dp)
      if (!data[0]) {
        console.log('Sign up failed...')
        return
      } else {
        dpUri = data[1]
      }
    }

    const res = await editProfile({ ...values, dp: dpUri }, userInfo.token)

    if (res.status === 200) {
      await storeData('userInfo', { ...res.data, token: userInfo.token })

      setSigningUp(false)
      setEdit(!edit)
      setUserInfo({ ...res.data, token: userInfo.token, user: true })

      ToastAndroid.show('Profile updated successfully...', ToastAndroid.SHORT)
      props.navigation.goBack()
    } else {
      ToastAndroid.show(
        'An error occurred, please try again',
        ToastAndroid.LONG
      )

      setSigningUp(false)
    }
  }

  const handleImage = async val => {
    setModalPicImage(false)
    const imgUri = await pickImage(val, true)

    if (imgUri) {
      setDp(imgUri)
      setIsDpChanged(true)
    }
  }

  return signingUp ? (
    <Loading txt='Updating...' />
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
          name: userData.name,
          city: userData.city,
          about: userData.about,
        }}
        validationSchema={editProfileValidation}
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
              Update
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

export default EditProfile
