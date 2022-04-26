import { Formik } from 'formik'
import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import SearchCatgModal from '../components/SearchCatgModal'
import { globalStyles } from '../helpers/globalStyles'
import { searchValidation } from '../helpers/yupValidation'
import UserContext from '../store/UserContext'

const Search = props => {
  const [searchOption, setSearchOption] = useState('Post by title')
  const [showModal, setShowModal] = useState(false)
  const { userInfo } = useContext(UserContext)

  const handleSearchOption = option => {
    setSearchOption(option)
    setShowModal(false)
  }

  const handleSearchResult = key => {
    if (searchOption === 'Post by title') {
      props.navigation.push('PostStack', {
        search: key,
        // un: userInfo.uname,
        un: 'yes',
        title: `Results for '${key}'`,
      })
    } else if (searchOption === 'People by name') {
      props.navigation.push('FollowerStack', {
        tn: 'sr',
        key,
        title: `Results for '${key}'`,
      })
    }
  }

  return (
    <View style={styles.container}>
      <Button
        icon='chevron-down-circle'
        color='orange'
        onPress={() => setShowModal(true)}
        style={styles.optionBtn}
      >
        {searchOption}
      </Button>

      <SearchCatgModal
        show={showModal}
        closeModal={() => setShowModal(false)}
        handleSearchOption={handleSearchOption}
      />

      <Formik
        initialValues={{ searchQuery: '' }}
        validationSchema={searchValidation}
        onSubmit={(values, action) => {
          handleSearchResult(values.searchQuery)
          // action.resetForm()
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
                label='Query'
                placeholder='Enter your query...'
                onChangeText={handleChange('searchQuery')}
                onBlur={handleBlur('searchQuery')}
                value={values.searchQuery}
              />
              {errors.searchQuery && touched.searchQuery && (
                <Text style={globalStyles.errorText}>
                  {touched.searchQuery && errors.searchQuery}
                </Text>
              )}
            </View>

            <Button
              onPress={handleSubmit}
              mode='contained'
              icon='shield-search'
              style={styles.searchBtn}
            >
              Search
            </Button>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  optionBtn: {
    marginTop: 10,
    marginBottom: 20,
  },
  searchBtn: {
    marginTop: 10,
    // marginHorizontal: 30,
  },
})

export default Search
