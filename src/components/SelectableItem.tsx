import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {formatNumber} from '../utils/utils';

import type {Item} from '../types/types';

const SelectableItem = ({item, onPress}: {item: Item; onPress: () => void}) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{`${item.name} (${formatNumber(
          item.price,
        )})`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    width: 170,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    margin: 5,
    marginLeft: 0,
  },
});

export {SelectableItem};
