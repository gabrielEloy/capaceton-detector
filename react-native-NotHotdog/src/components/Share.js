import React, {Component} from 'react';
import {
  Platform,
  StyleSheet, 
  View, 
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import Svg,{
  Text as SvgText
} from 'react-native-svg';

import Share from 'react-native-share';

var RNFS = require('react-native-fs');

class ShareResult extends Component {
  constructor(props){
    super(props)
    this.state = {
      classes: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const { rects } = nextProps;
    const classes = this.getNames(rects)
    this.setState({ classes })
    console.log('received Props', rects)
  }

  getNames = (array) => {
    if(array.length > 0){
      let yoyo = []
    for(let prediction of array){
      let name = ''
      switch(prediction.detectedClass){
        case 0: 
          name = 'colete'
          break;
        case 1:
          name = 'óculos'
          break;
        case 2:
          name = 'bota'
          break;
        case 3:
          name = 'capacete'
          break;
        case 6:
          name = 'protetor'
          break;
      }
      yoyo.push(name)
    }
    console.log('yoyo', yoyo)
    return yoyo
    }
    else return;
  }


  onShare(hotdog) {
    var image = hotdog? 'badgehotdog.jpg': 'badgenothotdog.jpg';

    if (Platform.OS === 'ios') {
      var msg = hotdog? "I got “Hotdog!”": "I got “Not hotdog!”";
      let shareImageBase64 = {
        title: msg,
        message: msg,
        url: "file://" + RNFS.MainBundlePath + '/' + image,
        subject: msg
      };

      Share.open(shareImageBase64);
    } else {
      RNFS.existsAssets(image).then((result) =>{
        if (result)
          RNFS.readFileAssets(image, "base64")
            .then((res) => {
              var msg = hotdog? "I got “Hotdog!”": "I got “Not hotdog!”";
              let shareImageBase64 = {
                title: msg,
                message: msg,
                url: "data:image/jpeg;base64," + res,
                subject: msg
              };

              Share.open(shareImageBase64);
            })
            .catch((error) => console.warn(error));
      });
    }
  }

  namesToString = (array) => {
    let finalString = ''
    for(let string of array){
      finalString += (string + ' ')
    }
    return finalString
  }
  showDetected = () => {    
  this.state.rects > 0 ? Alert.alert("EPI's detectados", this.namesToString(this.state.classes)) : Alert.alert('Nenhum EPI detectado')
  }

  render() {
    const {hotdog, onClear} = this.props;
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={onClear}>
            <Text style={styles.text}>Tentar Novamente</Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.button2} onPress={this.showDetected}>
            <Text style={{color: 'white', fontSize: 30}}>+</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    alignSelf: "center",
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    height: 55,
    width: 200,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#00345b',
    marginRight: 20
  },
  button2: {
    height: 55,
    width: 50,
    color: 'white',
    borderColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#00345b',
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  clearButton: {
    height: 60,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default ShareResult;
