import { useContext } from 'react'
import { Modal, Pressable, View } from 'react-native'
import { Button } from 'react-native-paper'
//import AppContext from '../store/AppContext'

const ImagePicker = props => {
  //const [scheme] = useContext(AppContext)
  const scheme = 'dark'

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={props.visible}
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
        <Button
          style={{ marginTop: 5 }}
          icon='camera'
          color='white'
          onPress={() => props.handleImage('c')}
        >
          camera
        </Button>
        <Button
          icon='folder-image'
          color='white'
          onPress={() => props.handleImage('g')}
        >
          gallery
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          icon='cancel'
          color='white'
          onPress={props.closeModal}
        >
          Cancel
        </Button>
      </View>
    </Modal>
  )
}

export default ImagePicker
