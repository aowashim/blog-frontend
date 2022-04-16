import { Modal, Pressable, View } from 'react-native'
import { Button, Divider, Text } from 'react-native-paper'

const SearchCatgModal = props => {
  const scheme = 'dark'

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.show}
      onRequestClose={props.closeModal}
      style={{ backgroundColor: 'black' }}
    >
      <Pressable
        onPress={props.closeModal}
        style={{
          backgroundColor:
            scheme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(31, 31, 31, 0.4)',
          width: '100%',
          height: '100%',
        }}
      ></Pressable>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: scheme === 'dark' ? '#1f1f1f' : '#dbd7d7',
          width: '100%',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          paddingTop: 10,
          paddingBottom: 5,
        }}
      >
        <Text style={{ textAlign: 'center', marginBottom: 8, fontSize: 14 }}>
          Select search option
        </Text>
        <Divider
          style={{
            backgroundColor: 'grey',
            marginHorizontal: 20,
          }}
        />
        <Button
          style={{ marginTop: 5 }}
          color='white'
          onPress={() => props.handleSearchOption('Post by title')}
        >
          Post by title
        </Button>
        <Button
          color='white'
          onPress={() => props.handleSearchOption('Post by category')}
        >
          Post by category
        </Button>
        <Button
          color='white'
          onPress={() => props.handleSearchOption('People by name')}
        >
          People by name
        </Button>
        <Button
          color='white'
          onPress={() => props.handleSearchOption('People by username')}
        >
          People by username
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          color='white'
          onPress={props.closeModal}
        >
          Cancel
        </Button>
      </View>
    </Modal>
  )
}

export default SearchCatgModal
