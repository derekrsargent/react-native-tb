import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatNumber} from '../utils';

import type {Item} from '../types';

const RightActions = () => {
  return (
    <View style={styles.leftAction}>
      <Icon name="trash-outline" size={20} color="white" />
    </View>
  );
};

export const SwipeableItem = ({
  item,
  onSwipeFromRight,
}: {
  item: Item;
  onSwipeFromRight: () => void;
}) => {
  return (
    <Swipeable
      renderRightActions={RightActions}
      rightThreshold={0.2}
      onSwipeableOpen={onSwipeFromRight}>
      <View style={styles.listItem}>
        <Text style={styles.ordered}>{item.name}</Text>
        <Text style={styles.priceText}>{formatNumber(item.price)}</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#ff5252',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 3,
    paddingRight: 10,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    height: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ordered: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c2c54',
    marginLeft: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    margin: 5,
  },
});

export {RightActions};
