import React from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import axios from 'axios';
import PostList from '../components/PostList';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      postData: [],
    });
  }

  componentDidMount() {
    axios.get('https://staging.allfin.com/wordpress/wp-json/wp/v2/posts?page=1&per_page=10')
      .then((response) => {
        this.setState({ postData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { postData } = this.state;
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <PostList {...this.props} postData={postData} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeff4',
  },
});
