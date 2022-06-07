import { ScrollView, ToastAndroid, View } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'
import { Formik } from 'formik'
import { commentValidation } from '../helpers/yupValidation'
import { globalStyles } from '../helpers/globalStyles'
import { useContext, useState } from 'react'
import { getDate } from '../helpers/getDate'
import UserContext from '../store/UserContext'
import Loading from '../components/Loading'
import { createComment } from '../helpers/Api/comment'

const CreateComment = props => {
  const [posting, setPosting] = useState(false)
  const { userInfo } = useContext(UserContext)

  const handleCreateComment = async content => {
    setPosting(true)

    const cdate = getDate()

    const res = await createComment(
      {
        pid: props.route.params.pid,
        content,
        cdate,
      },
      userInfo.token
    )

    ToastAndroid.show('Comment created successfully.', ToastAndroid.LONG)
    setPosting(false)

    props.navigation.goBack()
  }

  return posting ? (
    <Loading txt='Posting...' />
  ) : (
    <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={commentValidation}
        onSubmit={(values, action) => {
          handleCreateComment(values.comment)
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
            <View style={{ ...globalStyles.textIn, marginTop: 20 }}>
              <TextInput
                label='মন্তব্য'
                placeholder='এটা মন্তব্য লিখক ...'
                onChangeText={handleChange('comment')}
                onBlur={handleBlur('comment')}
                value={values.comment}
              />
              {errors.comment && touched.comment && (
                <Text style={globalStyles.errorText}>
                  {touched.comment && errors.comment}
                </Text>
              )}
            </View>

            <Button
              onPress={handleSubmit}
              mode='contained'
              icon='comment-outline'
              style={{ marginTop: 10 }}
            >
              মন্তব্য দিয়ক
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}

export default CreateComment
