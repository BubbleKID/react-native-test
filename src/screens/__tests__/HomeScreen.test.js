import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../HomeScreen';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { shallow } from 'enzyme';

it('renders correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('axios fetch data correctly', async () => {
  const spy = jest.spyOn(HomeScreen.prototype, 'componentDidMount');
  const mock = new MockAdapter(axios);
  mock.onGet('https://staging.allfin.com/wordpress/wp-json/wp/v2/posts?page=1&per_page=10').reply(200,
    {id: 1, name: 'John Smith'}
  );
  const wrapper = shallow(<HomeScreen />);
  expect(spy).toHaveBeenCalled();
});

it('axios fetch data error', async () => {
  const spy = jest.spyOn(HomeScreen.prototype, 'componentDidMount');
  const mock = new MockAdapter(axios);
  mock.onGet('https://staging.allfin.com/wordpress/wp-json/wp/v2/posts?page=1&per_page=10').networkError();
  const wrapper = shallow(<HomeScreen />);
  console.log = jest.fn();
  expect(spy).toHaveBeenCalled();
});


