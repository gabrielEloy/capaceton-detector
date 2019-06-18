import React, {Component} from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';

import Svg,{
    Rect,
    G,
    Circle,
    Image,
    Text
} from 'react-native-svg';

import * as Animatable from 'react-native-animatable';



class Prediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotdog: props.hotdog,
      screen: props.screen,
      rects: props.rects,
      classes: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const {hotdog, screen} = nextProps;
    this.setState({ hotdog, screen }); 
  }

  componentWillReceiveProps(nextProps){
    const { rects } = nextProps;
    const classes = this.getNames(rects)
    this.setState({ rects, classes })
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
        case 4:
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


  render() {
    const {hotdog, screen} = this.state;
    
    const width = screen.w;
    const height = 150;
    const rectHeight = height/2 - 10;
    console.log(`image detected: ${this.state.hotdog} / screen position: ${this.state.screen} `)
    return (
      <Animatable.View animation="slideInDown" style={styles.container}>
        <Svg
          height={height + 10}
          width={width}
        >

        </Svg>
        <Animatable.View style={styles.container} animation="rubberBand" delay={500}>
          <Svg
            height={rectHeight}
            width={width}
          >
            <Text
              fill="white"
              stroke="black"
              fontSize="30"
              fontWeight="bold"
              x={width/2}
              y={height/4 - 5}
              textAnchor="middle"
            >
              {this.state.rects.length > 0 ?  "EPI's encontrados" : "Nenhum EPI detectado"}
            </Text> 
          </Svg>
        </Animatable.View>
        <Svg style={{top: 300}}
        height="200"
        width="200">
          <Text
          fill="white"
          stroke="black"
          fontSize="30"
          fontWeight="bold"
          x={width/2}
          y={height/4 - 5}
          textAnchor="middle">blabla</Text>
        </Svg>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    marginTop: 15
  }
});

export default Prediction;

