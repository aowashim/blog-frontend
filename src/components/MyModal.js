import { useContext } from 'react'
import { Modal, Pressable, View } from 'react-native'
//import AppContext from '../store/AppContext'

const MyModal = props => {
  //const [scheme] = useContext(AppContext)
  const scheme = 'dark'

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      style={{ backgroundColor: 'black' }}
    >
      <Pressable
        onPress={props.onPress}
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
        {props.children}
      </View>
    </Modal>
  )
}

export default MyModal
