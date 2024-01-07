import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Category} from '../types/types';
import {SelectableItem} from '../components';

import type {Item} from '../types/types';

let prevCategory = Category.Alcohol;

const RenderSelectableItem = (item: Item, onPress: (item: Item) => void) => {
  if (item.category !== prevCategory) {
    prevCategory = item.category;
    return (
      <View style={{marginTop: prevCategory !== Category.Appetizers ? 20 : 0}}>
        <Text style={styles.categoryHeading}>{Category[prevCategory]}</Text>
        <SelectableItem item={item} onPress={() => onPress(item)} />
      </View>
    );
  } else {
    return <SelectableItem item={item} onPress={() => onPress(item)} />;
  }
};

const styles = StyleSheet.create({
  categoryHeading: {
    backgroundColor: '#474787',
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
});

export {RenderSelectableItem};
