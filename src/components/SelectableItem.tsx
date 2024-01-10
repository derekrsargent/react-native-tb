import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {formatNumber} from '../utils';

import type {Item} from '../types';

const SelectableItem = ({item, onPress}: {item: Item; onPress: () => void}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.menuContainer}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.priceText}>{formatNumber(item.price)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    margin: 5,
    marginLeft: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    margin: 5,
  },
});

export {SelectableItem};
