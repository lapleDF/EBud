import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Home = () => {
  console.log('home');
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
});
