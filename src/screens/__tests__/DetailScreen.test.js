import 'react-native';
import React from 'react';
import ConnectedDetailScreen, { DetailScreen } from '../DetailScreen';
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme';

it('renders correctly', () => {
  const mockStore = configureStore()
  const initialState = { fontSize: 16 };
  const store = mockStore(initialState)

  const wrapper = shallow(
    <ConnectedDetailScreen store={store} />
  );

  expect(wrapper.length).toEqual(1);
});
