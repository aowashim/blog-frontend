import { ScrollView, View } from 'react-native'
import { Avatar, Button, Headline, Text, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { signUpValidation } from '../helpers/yupValidation'
import { globalStyles } from '../helpers/globalStyles'

const SignUp = props => {
  return (
    <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
      <View style={globalStyles.avatar}>
        <Avatar.Icon size={60} icon='account-edit' color='orange' />
      </View>
      {/* <Headline style={{ textAlign: 'center', marginBottom: 15 }}>
        Sign Up
      </Headline> */}
      <Formik
        initialValues={{ email: '', pwrd: '', name: '', city: '', state: '' }}
        validationSchema={signUpValidation}
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
                label='State'
                placeholder='Enter your password...'
                onChangeText={handleChange('state')}
                onBlur={handleBlur('state')}
                value={values.state}
              />
              {errors.state && (
                <Text style={globalStyles.errorText}>
                  {touched.state && errors.state}
                </Text>
              )}
            </View>

            <Button onPress={handleSubmit} mode='contained' icon='account-edit'>
              Sign Up
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}

export default SignUp
