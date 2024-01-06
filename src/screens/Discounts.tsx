import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {discounts} from '../data/data';

const DiscountsScreen = () => {
  return (
    <View style={styles.container}>
      {discounts.map(discount => (
        <Text key={discount.id}>{discount.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {DiscountsScreen};
