import { createStackNavigator } from '@react-navigation/stack'
import Search from '../screens/Search'

const SearchStack = createStackNavigator()

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name='SearchS' component={Search} />
    </SearchStack.Navigator>
  )
}

export default SearchStackScreen
