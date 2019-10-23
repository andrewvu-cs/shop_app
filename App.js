import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen';

export default function App() {
  return (
      <ProductsOverviewScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
