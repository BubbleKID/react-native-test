import React from 'react';
import {
  Text, View, Image, TouchableWithoutFeedback, Button, Dimensions, ScrollView, StyleSheet, Slider,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import moment from 'moment';
import 'moment/min/moment-with-locales';
import 'moment/locale/zh-cn';
import { connect } from 'react-redux';
import { setFontSize } from '../actions';

export class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      date: '',
      title: '',
      body: '',
      sliderDisplay: false,
      scrollEnabled: true,
      bounce: true,
    });
    this._toggleSliderVisible = this._toggleSliderVisible.bind(this);
    this.props.navigation.setParams({ sliderVisible: this._toggleSliderVisible });
  }

  componentDidMount() {
    moment.locale('zh-cn');
    axios.get('https://staging.allfin.com/wordpress/wp-json/wp/v2/posts/' + this.props.navigation.state.params.id)
      .then((response) => {
        this.setState({
          date: moment(response.data.date).format('LLL'),
          title: response.data.title.rendered,
          body: response.data.content.rendered,
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  _toggleSliderVisible = () => {
    this.setState({
      sliderDisplay: !this.state.sliderDisplay,
      scrollEnabled: !this.state.scrollEnabled,
      bounce: !this.state.bounce,
    });
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Button
          onPress={() => navigation.getParam('sliderVisible')()}
          title="A"
          color="#555"
        />
      ),
    }
  };

  _renderNode(node, index, siblings, parent, defaultRender){
    if (node.name === 'img'){
      const a = node.attribs
      const { width } = Dimensions.get('window');
      return(
          <Image source={{uri:a.src}} key={index} resizeMode={'cover'} style={{ width:width-20, height:240}} />
      )
    }
  }

  _createStyleSheet() {
    return StyleSheet.create({
      p: {
        color: '#2c2c2c',
        lineHeight: 30,
        fontSize: this.props.fontSize,
      }
    });
  }

  render(){
    const { date, title, body } = this.state;
    const { dispatch } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView scrollEnabled={this.state.scrollEnabled} bounce={this.state.bounce}>
          <TouchableWithoutFeedback
            onPress={ ()=> this.setState({
              sliderDisplay: false,
              scrollEnabled: true,
            })}
          >
          <View >
            <View style={{padding:10}}>
              <Text style={{fontSize: this.props.fontSize + 4, fontWeight: 'bold',marginBottom:10, lineHeight:35}}>{title}</Text>
              <Text style={{fontSize: this.props.fontSize - 4, color: '#808080'}}>{date}</Text>
            </View>
            <HTMLView
              value={body}
              onLinkPress={(url) => alert('click link', url)}
              stylesheet={this._createStyleSheet()}
              style={{padding:10}}
              renderNode={this._renderNode}
              addLineBreaks={false}
            />
          </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {
          this.state.sliderDisplay &&
          <Slider style={styles.slider}
            minimumValue={10}
            maximumValue={32}
            value={this.props.fontSize}
            step={1}
            onValueChange={(val) => dispatch(setFontSize(val))}
          />
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efeff4',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
  }
});

const mapStateToProps = state => ({
  fontSize: state.fontSize
});

export default connect(mapStateToProps)(DetailScreen);
