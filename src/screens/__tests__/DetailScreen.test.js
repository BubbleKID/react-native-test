import 'react-native';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { DetailScreen } from '../DetailScreen';
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme';

let wrapper, navigation, spy;

beforeEach(()=>{
  spy = jest.spyOn(DetailScreen.prototype, 'componentDidMount');
  navigation = {
    setParams: jest.fn(),
    state: {
      params:{
        id: 123262
      }
    }
  }
  wrapper = shallow(
    <DetailScreen navigation={navigation} />
  );
  
})
it('renders correctly', () => {
  expect(wrapper.length).toEqual(1);
});

it('axios fetch data correctly', async () => {
  const mock = new MockAdapter(axios);
  mock.onGet('https://staging.allfin.com/wordpress/wp-json/wp/v2/posts/123262').reply(200,
    {id: 1, title: {rendered : 'John Smith'}, content: {rendered: 'Well done!'}}
  )
  expect(spy).toHaveBeenCalled();
});

it('_toggleSliderVisible function works correctly', async () => {
  wrapper.setState({ sliderDisplay:false, scrolEnabled: true, bounce: false })
  wrapper.instance()._toggleSliderVisible();
  expect(wrapper.state('sliderDisplay')).toBe(true);
  expect(wrapper.state('scrollEnabled')).toBe(false);
  expect(wrapper.state('bounce')).toBe(true);
});

it('_renderNode function works correctly', async () => {
  const node = {
     name:'img',
     attribs:{
       src: '123'
     }
  };
  const result = wrapper.instance()._renderNode(node, 1);

  expect(result.props.source.uri).toEqual("123");
});
