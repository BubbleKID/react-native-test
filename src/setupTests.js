import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'react-native';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });