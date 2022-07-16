/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from '@root/navigation/RootStack';
import {persistedStore, store} from '@root/store';

const App = () => {
  const onReady = () => {
    RNBootSplash.hide({fade: true});
  };
  return (
    <SafeAreaProvider
      initialSafeAreaInsets={{top: 1, left: 2, right: 3, bottom: 4}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <NavigationContainer onReady={onReady}>
            <RootStack />
            <StatusBar />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
