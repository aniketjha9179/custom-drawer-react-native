/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Drawer from './src/components/Drawer';
import Header from './src/components/Header';
import {message} from './src/data/data';
import Message from './src/components/Message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const active = useSharedValue(false);
  const drawerWidth = useSharedValue(1000);
  const drawerTranslateX = useSharedValue(-drawerWidth.value);

  const animatedStyle = useAnimatedStyle(() => {
    const containerTranslateX = interpolate(
      drawerTranslateX.value,
      [-drawerWidth.value, 0],
      [0, 100],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateX: containerTranslateX}],
    };
  });

  return (
    <>
    <SafeAreaProvider>
      <StatusBar hidden={false} />
      <GestureHandlerRootView style={{flex: 1}}>
        <Drawer
          active={active}
          translateX={drawerTranslateX}
          drawerWidth={drawerWidth}
        />
        <Animated.View style={[styles.container, animatedStyle]}>
          <Header active={active} />
          <FlatList
            data={message}
            renderItem={({item, index}) => {
              return <Message item={item} key={index} />;
            }}
          />
        </Animated.View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d2733',
  },
});