import 'react-native';
import React from 'react';
import PostList from '../PostList';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { TouchableOpacity, FlatList } from 'react-native';

it('renders correctly', () => {
  const tree = renderer.create(<PostList />).toJSON();

  expect(tree).toMatchSnapshot();
});

it(' _renderItem works correctly', ()=>{
  const data = {item:{id:1,type_img_mobile_big: 'aaa', title:{rendered:'123'}}};

  const onPressEvent = jest.fn();
  const navigationEvent = jest.fn();
  const navigation = {
    navigate: navigationEvent
  };
  const wrapper = shallow(<PostList data={data} navigation={navigation} onPress={ onPressEvent }/>);

  wrapper.find(FlatList).first().props().renderItem(data);
  const wrapper2 = shallow (wrapper.find(FlatList).first().props().renderItem(data));
  wrapper2.instance().props.onPress();
  expect(navigationEvent).toHaveBeenCalled();
});
