let React = require('react-native');
let {NativeModules, NativeAppEventEmitter} = require('react-native');
let AudioPlayerManager = NativeModules.AudioPlayerManager;
let AudioRecorderManager = NativeModules.AudioRecorderManager;
let {AudioRecorder, AudioPlayer} = require('react-native-audio');
let Icon = require('react-native-vector-icons/MaterialIcons');
let {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
  ScrollView,
} = React;

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state =  {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      stoppedPlaying: false,
      playing: false,
      finished: false
    };
  }
  componentDidMount(){
    AudioRecorder.prepareRecordingAtPath('/test.caf');
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
    };
    AudioRecorder.onFinished = (data) => {
      this.setState({finished: data.finished});
      console.log(`Finished recording: ${data.finished}`);
    }
  }

  _renderButton(title, onPress, active){
    let style = (active) ? styles.activeButtonText : styles.buttonText
    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>
          {title}
        </Text>
      </TouchableHighlight>
    )
  }

  _pause(){
    if (this.state.recording)
      AudioRecorder.pauseRecording();
    else if (this.state.playing)
      AudioPlayer.pausePlaying();
  }

  _stop(){
    if (this.state.recording) {
      AudioRecorder.stopRecording();
      this.setState({stoppedRecording: true, recording: false});
    } else if (this.state.playing) {
      AudioRecorder.stopPlaying();
      this.setState({playing: false, stoppedPlaying: true});
    }
  }

  _record(){
    AudioRecorder.startRecording();
    this.setState({recording: true, playing: false});
  }

  _play(){
    if (this.state.recording) {
      this._stop();
      this.setState({recording: false});
    }
    AudioRecorder.playRecording();
    this.setState({playing: true});
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.controls}>
          <Icon name="pause" size={30} color="white" />
          <Icon name="play-arrow" size={30} color="white" />
          <Icon name="stop" size={30} color="white" />
          <Icon name="mic" size={30} color="white" />
          <Icon name="equalizer" size={30} color="white" />
          <Icon name="mic-off" size={30} color="white" />
          <Icon name="volume-down" size={30} color="white" />
          {this._renderButton("RECORD", () => {this._record()}, this.state.recording )}
          {this._renderButton("STOP", () => {this._stop()} )}
          {this._renderButton("PAUSE", () => {this._pause()} )}
          {this._renderButton("PLAY", () => {this._play()}, this.state.playing )}
          <Text style={styles.progressText}>{this.state.currentTime}s</Text>
        </View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b608a",
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: "#fff"
  },
  button: {
    padding: 20
  },
  disabledButtonText: {
    color: '#eee'
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  },
  activeButtonText: {
    fontSize: 20,
    color: "#B81F00"
  }

});

module.exports = Home;
