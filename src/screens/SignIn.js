import { ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Button, Headline, Text, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { signInValidation } from '../helpers/yupValidation'
import { globalStyles } from '../helpers/globalStyles'

const SignIn = () => {
  return (
    <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
      <View style={styles.avatar}>
        <Avatar.Icon size={60} icon='key' />
      </View>
      <Headline style={{ textAlign: 'center', marginBottom: 15 }}>
        Sign In
      </Headline>
      <Formik
        initialValues={{ email: '', pwrd: '' }}
        validationSchema={signInValidation}
        onSubmit={(values, action) => {
          console.log(values)
          action.resetForm()
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

            <Button onPress={handleSubmit} mode='contained'>
              Sign In
            </Button>
          </View>
        )}
      </Formik>
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
