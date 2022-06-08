import { ActivityIndicator, View } from 'react-native'
import { Subheading } from 'react-native-paper'

const Loading = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={50} color='#10614e' />
      {/* {Boolean(props.txt) && (
        <>
          <Subheading style={{ marginTop: 10, color: 'orange' }}>
            {props.txt}
          </Subheading> */}
      <Subheading style={{ marginTop: 20 }}>
        অনুগ্ৰহ কৰি অপেক্ষা কৰক...
      </Subheading>
      {/* </>
      )} */}
    </View>
  )
}

export default Loading
