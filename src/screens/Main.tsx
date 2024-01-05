import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  );
};

export {MainScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
