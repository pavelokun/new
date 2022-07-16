import React, {PropsWithChildren} from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {CombinedState, PreloadedState} from 'redux';
import {NoInfer} from '@reduxjs/toolkit/dist/tsHelpers';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import {RootState, storeCreator} from '@root/store';

export const renderWithProviders = (
  ui: React.ReactElement<any>,
  {
    preloadedState,
    store = storeCreator({preloadedState}),
    ...renderOptions
  }: {
    preloadedState?: PreloadedState<CombinedState<NoInfer<RootState>>>;
    store?: ReturnType<typeof storeCreator>;
  } = {},
) => {
  const Wrapper: React.FC = ({
    children,
  }: PropsWithChildren<{}>): JSX.Element => {
    const onReady = () => {
      RNBootSplash.hide({fade: true});
    };
    return (
      <SafeAreaProvider
        initialSafeAreaInsets={{top: 1, left: 2, right: 3, bottom: 4}}>
        <Provider store={store}>
          <NavigationContainer onReady={onReady}>
            {children}
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    );
  };

  return render(ui, {wrapper: Wrapper, ...renderOptions});
};
