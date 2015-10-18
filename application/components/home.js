let React = require('react-native');
let {NativeModules, NativeAppEventEmitter} = require('react-native');
let AudioPlayerManager = NativeModules.AudioPlayerManager;
let AudioRecorderManager = NativeModules.AudioRecorderManager;
let {AudioRecorder, AudioPlayer} = require('react-native-audio');
let Icon = require('react-native-vector-icons/MaterialIcons');
let Colors = {
  darkBlue: '#0D47A1',
  blue: '#1976D2',
  lightBlue: '#BBDEFB',
};
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
    let recordingClass = this.state.recording ? styles.activeButtonText : styles.buttonText;
    let playRecordingClass = this.state.playing ? styles.activeButtonText : styles.buttonText;

    return (
      <View style={styles.container}>
        <View style={styles.sampleAudio}>
          <Text style={styles.sampleText}>Test Sample</Text>
          <View style={styles.sampleIcons}>
            <TouchableHighlight
              underlayColor='transparent'
              onPress={() => {
                AudioPlayer.play('./en.lproj/english.mp3');
              }}
              >
              <Icon style={styles.play} name="play-arrow" size={30} color="white" />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              onPress={()=> {
                console.log('AUDIO', AudioPlayer);
                AudioPlayer.stop();
              }}
              >
              <Icon style={styles.play} name="stop" size={30} color="white" />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.recordAudio}>
          <Text style={styles.sampleText}>Record Yourself and Compare</Text>
          <View style={styles.sampleIcons}>
            <TouchableHighlight underlayColor='transparent' style={styles.micButton} onPress={()=> {this._record()}}>
              <Icon style={[styles.mic, recordingClass]} name="mic" size={50} color='white' />
            </TouchableHighlight>
            <Text style={styles.micText}>{this.state.currentTime}s</Text>
          </View>
        </View>
        <View style={styles.recordPlayback}>
          <View style={styles.playbackIcons}>
            <TouchableHighlight underlayColor='transparent' onPress={()=> {this._stop()}}>
              <Icon style={styles.play} name="stop" size={30} color='white' />
            </TouchableHighlight>
            <Text style={styles.recordingText}>Stop Recording</Text>
          </View>
          <View style={styles.playbackIcons}>
            <TouchableHighlight underlayColor='transparent' onPress={()=> {this._pause()}}>
              <Icon style={styles.play} name="pause" size={30} color='white' />
            </TouchableHighlight>
            <Text style={styles.recordingText}>Pause Recording</Text>
          </View>
          <View style={styles.playbackIcons}>
            <TouchableHighlight underlayColor='transparent' onPress={()=> {this._play()}}>
              <Icon style={[styles.play, playRecordingClass]} name="play-arrow" size={30} color='white' />
            </TouchableHighlight>
            <Text style={styles.recordingText}>Play Recording</Text>
          </View>
        </View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
  sampleAudio: {
    flexDirection: 'column',
    marginTop: 100,
    marginBottom: 20,
    alignItems: 'center',
  },
  recordAudio: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: .3,
  },
  recordPlayback: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  recordingText: {
    fontSize: 20,
    color: 'white',
    paddingTop: 8,
  },
  sampleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  sampleIcons: {
    flex: 1,
    flexDirection: 'row',
  },
  playbackIcons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  micButton: {
    height: 80,
  },
  play: {
    backgroundColor: Colors.blue,
    height: 40,
    width: 40,
    padding: 4,
    marginRight: 10,
    borderRadius: 4,
  },
  mic: {
    height: 70,
    width: 70,
    backgroundColor: Colors.blue,
    padding: 9,
    borderRadius: 4,
    marginTop: 10,
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: "#fff"
  },
  micText: {
    fontSize: 25,
    color: 'white',
    paddingTop: 30,
    marginLeft: 20,
  },
  button: {
    padding: 20
  },
  disabledButtonText: {
    color: '#eee'
  },
  buttonText: {
    color: "#fff"
  },
  activeButtonText: {
    color: "#B81F00"
  }

});

module.exports = Home;
