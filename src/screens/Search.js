import { Formik } from 'formik'
import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text, TextInput } from 'react-native-paper'
import SearchCatgModal from '../components/SearchCatgModal'
import { SearchCatg } from '../helpers/constants'
import { globalStyles } from '../helpers/globalStyles'
import { searchValidation } from '../helpers/yupValidation'
import UserContext from '../store/UserContext'

const searchTitle = 'ৰ বাবে সন্ধানৰ ফলাফলসমূহ'

const Search = props => {
  const [searchOption, setSearchOption] = useState(SearchCatg['pt'])
  const [showModal, setShowModal] = useState(false)
  const { userInfo } = useContext(UserContext)

  const handleSearchOption = option => {
    setSearchOption(SearchCatg[option])
    setShowModal(false)
  }

  const handleSearchResult = key => {
    if (searchOption === SearchCatg['pt']) {
      props.navigation.push('PostStack', {
        search: key,
        un: 'yes',
        byTitle: true,
        title: `'${key}'${searchTitle}`,
      })
    } else if (searchOption === SearchCatg['pc']) {
      props.navigation.push('PostStack', {
        search: key,
        un: 'yes',
        byTitle: false,
        title: `'${key}'${searchTitle}`,
      })
    } else if (searchOption === SearchCatg['un']) {
      props.navigation.push('FollowerStack', {
        tn: 'sr',
        key,
        byName: true,
        title: `'${key}'${searchTitle}`,
      })
    } else {
      props.navigation.push('FollowerStack', {
        tn: 'sr',
        key,
        byName: false,
        title: `'${key}'${searchTitle}`,
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
          <ScrollView>
            <View style={globalStyles.textIn}>
              <TextInput
                label='সন্ধান'
                placeholder='কিবা এটা প্ৰৱিষ্ট কৰক ...'
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
              সন্ধান কৰক
            </Button>
          </ScrollView>
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
