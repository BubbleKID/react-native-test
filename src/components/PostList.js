import React from 'react';
import {
  Text, View, Image, TouchableOpacity, FlatList, ScrollView, StyleSheet,
} from 'react-native';
const defaultImage = require('../assets/images/news.png');

const PostListScreen = (props) => {
  const _renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      key={index}
      style={styles.item}
      onPress={() => props.navigation.navigate('Detail', { id: item.id })}
    >
      <Image
        source={item.type_img_mobile_big != null ? { uri: item.type_img_mobile_big } : defaultImage} 
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        <Text
          key={item.id}
          style={styles.text}
        >
          {item.title.rendered}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const { postData } = props;
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={postData}
        renderItem={_renderItem}
        style={styles.flatList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 75,
    height: 50,
    marginRight: 10,
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
  },
  item: {
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  flatList: {
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  }
});

export default PostListScreen;
