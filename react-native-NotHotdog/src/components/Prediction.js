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
          <G fill="white" stroke="white" strokeWidth="4">
              <Circle cx={width/2} cy={height*2/3} r={height/3} />
              <Rect x="0" y="0" width={width} height={rectHeight} />
          </G>
          <G fill={this.state.rects > 0 ? "lime": "red"}>
              <Circle cx={width/2} cy={height*2/3} r={height/3} />
              <Rect x="0" y="0" width={width} height={rectHeight} />
          </G>
          <Image
            x={(width - height/2)/2}
            y={Platform.OS === 'ios' ? 0 - 100 + height/4 : height/3 + height/12 }
            width={height/2}
            height={height/2}
            href={require('./images/hotdog.png')}
          />

          {!(this.state.rects > 0) ?
            <G>
              <G x={width/2} y={height*2/3 - 2} fill="white" rotation="45" stroke="black" strokeWidth="2">
                <Rect x="0" y="-44" width="5" height="90" />
                <Rect x="-44" y="0" width="90" height="5" />
              </G>
              <G x={width/2} y={height*2/3 - 2} fill="white" rotation="45">
                <Rect x="0" y="-44" width="5" height="90" />
                <Rect x="-44" y="0" width="90" height="5" />
              </G> 
            </G>: undefined
          }
        </Svg>
        <Animatable.View style={styles.container} animation="rubberBand" delay={500}>
          <Svg
            height={rectHeight}
            width={width}
          >
            <Text
              fill="yellow"
              stroke="black"
              fontSize="30"
              fontWeight="bold"
              x={width/2}
              y={height/4 + 10}
              textAnchor="middle"
            >
              {this.state.rects.length > 0 ?  this.state.classes : "Nenhum EPI detectado"}
            </Text> 
          </Svg>
        </Animatable.View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
  }
});

export default Prediction;

