const React         = require('react-native');

let {
  AsyncStorage,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
} = React;

class Home extends React.Component{
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'blue',}}>
        <View style={{height: 300, backgroundColor: 'red', marginTop: 170}}>
          <Text>HELLO WORLD</Text>
        </View>
      </View>
    );
  }
};

module.exports = Home;
