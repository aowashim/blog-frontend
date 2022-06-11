import { Modal, Pressable, View } from 'react-native'
import { Button, Divider, Text } from 'react-native-paper'
import { ModalCloseBtnName } from '../helpers/constants'

const DeleteModal = props => {
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
        <Button
          style={{ marginTop: 5 }}
          icon='delete'
          color='white'
          onPress={props.handleDeletePost}
        >
          প'ষ্ট বিলোপ কৰক
        </Button>

        <Button
          style={{ marginBottom: 10 }}
          icon='cancel'
          color='white'
          onPress={props.closeModal}
        >
          {ModalCloseBtnName}
        </Button>
      </View>
    </Modal>
  )
}

export default DeleteModal
