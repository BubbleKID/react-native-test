import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import ImageUrl from '../assets/images/back-icon.png';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerBackImage: ImageUrl,
        headerTruncatedBackTitle: '',
      }),
    },
    Detail: DetailScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
