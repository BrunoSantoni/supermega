import { StyleSheet, Dimensions } from 'react-native'
import Color from '../../constants/colors'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  background: {
    position: 'absolute',
    flex: 1,
    resizeMode: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  container: {
      flex: 1,
      alignItems: 'center'
  },

  pic: {
    borderRadius: 8,
    width: 100,
    height: 100,
    marginTop: 15,
  },

  selectPic: {
    backgroundColor: '#A9A9A9',
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputSection: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#FFF',
    marginVertical: 10,
    backgroundColor: Color.darkBg,
  },

  inputIcon: {
    padding: 10,
  },

  input: {
    width: '90%',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    color: 'white',
  },

  confirmButton: {
    backgroundColor: Color.darkBg,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },

})
