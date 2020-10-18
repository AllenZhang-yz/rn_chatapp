import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {deviceWidth, deviceHeight} from '../utility/styles/appStyle';

const Loader = () => {
  let loading = false;
  return loading ? (
    <View style={styles.loaderContainer}>
      <View style={styles.indicator}>
        <ActivityIndicator size="large" animating={loading} color="grey" />
      </View>
    </View>
  ) : null;
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
  indicator: {
    height: 45,
    width: 45,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
