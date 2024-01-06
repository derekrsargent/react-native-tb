import React, {useState} from 'react';
import {FlatList, TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {data} from '../data/data';

import type {RootStackParamList} from '../../App';
import type {NavigationProp} from '@react-navigation/native';
import type {Item} from '../data/data';

const RightActions = () => {
  return (
    <View style={styles.leftAction}>
      <Text>Delete</Text>
    </View>
  );
};

const SwipeableItem = ({
  item,
  onSwipeFromRight,
}: {
  item: Item;
  onSwipeFromRight: () => void;
}) => {
  return (
    <Swipeable
      renderRightActions={RightActions}
      rightThreshold={0.1}
      onSwipeableOpen={onSwipeFromRight}>
      <View style={styles.listItem}>
        <Text>{item.name}</Text>
      </View>
    </Swipeable>
  );
};

const SelectableItem = ({item, onPress}: {item: Item; onPress: () => void}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const MainScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [ordered, setOrdered] = useState<Item[]>();

  const handleOnPress = (item: Item) => {
    ordered
      ? setOrdered([...ordered, {...item, id: Date.now()}])
      : setOrdered([{...item, id: Date.now()}]);
  };

  const handleOnSwipeFromRight = (item: Item) => {
    setOrdered(ordered?.filter(el => el.id !== item.id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Discounts')}
        style={styles.button}>
        <Text style={styles.buttonText}>Select Discount</Text>
      </TouchableOpacity>
      <View style={styles.columns}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <SelectableItem item={item} onPress={() => handleOnPress(item)} />
          )}
        />
        <FlatList
          data={ordered}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <SwipeableItem
              item={item}
              onSwipeFromRight={() => handleOnSwipeFromRight(item)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'flex-end',
  },
  buttonText: {
    color: '#51A0D5',
    fontWeight: '700',
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
  columns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leftAction: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  listItem: {
    flex: 1,
    height: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    margin: 10,
    marginLeft: 0,
  },
});

export {MainScreen};
