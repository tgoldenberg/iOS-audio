let Home  = require('./application/components/home');
const React   = require('react-native');
let { AppRegistry, NavigatorIOS, StyleSheet, Text, View } = React;

class audioExample extends React.Component{
  render() {
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={{
          component: Home,
          title: 'Home'
        }}
      />
    );
  }
};

let styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

AppRegistry.registerComponent('audioExample', () => audioExample);
