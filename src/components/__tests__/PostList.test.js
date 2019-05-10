import 'react-native';
import React from 'react';
import PostList from '../PostList';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

it('renders correctly', () => {
  const tree = renderer.create(<PostList />).toJSON();

  expect(tree).toMatchSnapshot();
});

it(' _renderItem works correctly', ()=>{
  const data = [{id:1,title:{rendered:'123'}},{id:2,title:{rendered:'321'}}];
  const component = shallow(<PostList data={data} />).dive();
  console.log(component)
  //expect(component).toMatchSnapshot();
});
