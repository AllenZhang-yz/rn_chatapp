import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {deviceWidth, deviceHeight} from '../utility/styles/appStyle';

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    zIndex: 1,
    elevation: 2,
    height: deviceHeight,
    width: deviceWidth,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
