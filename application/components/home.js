let React = require('react-native');
let {NativeModules, NativeAppEventEmitter} = require('react-native');
let AudioPlayerManager = NativeModules.AudioPlayerManager;
let AudioRecorderManager = NativeModules.AudioRecorderManager;
let {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
} = React;

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.props =  {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      stoppedPlaying: false,
      playing: false,
      finished: false
    };
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'blue',}}>
        <View style={{height: 300, backgroundColor: 'red', marginTop: 170}}>
          <TouchableHighlight
            underlayColor='#eee'
            onPress={()=> {
              // TODO
              console.log("RECORDER", NativeModules);
              AudioPlayerManager.play('./en.lproj/english.mp3');
            }}
            >
            <Text>HELLO WORLD</Text>

          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

module.exports = Home;
