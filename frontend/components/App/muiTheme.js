import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
  teal500, teal700, teal100, orange500,
  grey900, grey600, grey400, white
} from 'material-ui/styles/colors'

const colors = {
  doctor: {
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: teal500, // #009688
      primary2Color: teal700, // #00796B
      primary3Color: teal100, // #B2DFDB
      accent1Color: orange500, // #FF9800
      textColor: grey900, // #212121
      alternateTextColor: white, // #FFFFFF
      shadowColor: grey600, // #757575
      borderColor: grey400 // #BDBDBD
    }
  },
  patient: {
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: orange500, // #FF9800
      primary2Color: orange500, // #FF9800
      primary3Color: teal100, // #B2DFDB
      accent1Color: teal500, // #009688
      textColor: grey900, // #212121
      alternateTextColor: white, // #FFFFFF
      shadowColor: grey600, // #757575
      borderColor: grey400 // #BDBDBD
    }
  }
}

const muiTheme = () => getMuiTheme(colors.doctor)

export default muiTheme
