import { ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Button, Subheading, Text, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { signInValidation } from '../helpers/yupValidation'
import { globalStyles } from '../helpers/globalStyles'
import { userSignIn } from '../helpers/callApi'
import Loading from '../components/Loading'
import { useState } from 'react'

const SignIn = props => {
  const [signingIn, setSigningIn] = useState(false)

  const handleSignIn = async values => {
    setSigningIn(true)
    const data = await userSignIn(values)
    console.log(data)
    setSigningIn(false)
  }

  return signingIn ? (
    <Loading txt='Signing In...' />
  ) : (
    <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
      <View style={globalStyles.avatar}>
        <Avatar.Icon size={60} icon='login' color='orange' />
      </View>
      <Formik
        initialValues={{ userName: '', pwrd: '' }}
        validationSchema={signInValidation}
        onSubmit={(values, action) => {
          handleSignIn(values)
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

            <Button
              onPress={handleSubmit}
              mode='contained'
              icon='login'
              style={{ marginTop: 10 }}
            >
              Sign In
            </Button>
          </View>
        )}
      </Formik>
      <Subheading style={{ textAlign: 'center', marginTop: 40 }}>
        Don't have an account?
      </Subheading>
      <Button
        onPress={() => props.navigation.navigate('SignUp')}
        color='orange'
        icon='account-edit'
      >
        Create Now
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
})

export default SignIn
