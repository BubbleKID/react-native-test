import 'react-native';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ConnectedDetailScreen, { DetailScreen } from '../DetailScreen';
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme';
import { setFontSize } from '../../actions';
import HTMLView from 'react-native-htmlview';

it('renders correctly', () => {
  const mockStore = configureStore()
  const initialState = { fontSize: 16 };
  const store = mockStore(initialState)
  const navigation = {
    setParams: jest.fn(),
    state: {
      params:{
        id: 123262
      }
    }
  }
  const wrapper = shallow(
    <DetailScreen navigation={navigation} />
  );
  expect(wrapper.length).toEqual(1);
});

it('axios fetch data correctly', async () => {
  const spy = jest.spyOn(DetailScreen.prototype, 'componentDidMount');
  const mock = new MockAdapter(axios);
  mock.onGet('https://staging.allfin.com/wordpress/wp-json/wp/v2/posts/123262').reply(200,
    {id: 1, name: 'John Smith'}
  );

  const navigation = {
    setParams: jest.fn(),
    state: {
      params:{
        id: 123262
      }
    }
  }
  const wrapper = shallow(<DetailScreen navigation={navigation} />);
  expect(spy).toHaveBeenCalled();
});

it('_toggleSliderVisible function works correctly', async () => {
  const navigation = {
    setParams: jest.fn(),
    state: {
      params:{
        id: 123262
      }
    }
  }
  const wrapper = shallow(<DetailScreen navigation={navigation} />);

  wrapper.setState({ sliderDisplay:false, scrolEnabled: true, bounce: false })
  wrapper.instance()._toggleSliderVisible();
  expect(wrapper.state('sliderDisplay')).toBe(true);
  expect(wrapper.state('scrollEnabled')).toBe(false);
  expect(wrapper.state('bounce')).toBe(true);
});

it('_renderNode function works correctly', async () => {
  const navigation = {
    setParams: jest.fn(),
    state: {
      params:{
        id: 123262
      }
    }
  }
  const wrapper = shallow(<DetailScreen navigation={navigation} />);
  const node = {
     name:'img',
     attribs:{
       src: '123'
     }
  };

  const result = wrapper.instance()._renderNode(node, 1);
  console.log(result)
  expect(result.props.source.uri).toEqual("123");
});
