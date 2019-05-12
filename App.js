import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { createAppContainer } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import detailReducer from './src/reducers'

const AppContianer = createAppContainer(AppNavigator);
const store = createStore(detailReducer);

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <AppContianer />
      </Provider>
    );
  }
}
