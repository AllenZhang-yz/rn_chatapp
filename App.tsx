import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import Loader from './src/components/Loader';

const App = () => {
  return (
    <>
      <Navigation />
      <Loader />
    </>
  );
};

export default App;
