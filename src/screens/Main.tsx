import React, {useState} from 'react';
import {FlatList, Pressable, Text, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {data} from '../data/data';

import type {RootStackParamList} from '../../App';
import type {NavigationProp} from '@react-navigation/native';
import type {Data} from '../data/data';

const RightActions = () => {
  return (
    <View style={styles.leftAction}>
      <Text>Add</Text>
    </View>
  );
};

const SwipeableItem = ({
  text,
  onSwipeFromRight,
}: {
  text: string;
  onSwipeFromRight: () => void;
}) => {
  return (
    <Swipeable
      renderRightActions={RightActions}
      rightThreshold={0.1}
      onSwipeableOpen={onSwipeFromRight}>
      <View style={styles.listItem}>
        <Text>{text}</Text>
      </View>
    </Swipeable>
  );
};

const SelectableItem = ({text}: {text: string}) => {
  return (
    <View>
      <Pressable onPress={() => console.warn('pressed')}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

const MainScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [ordered] = useState<Data[]>(data);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Discounts')}
        style={styles.button}>
        <Text style={styles.buttonText}>Select Discount</Text>
      </Pressable>
      <View style={styles.columns}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <SelectableItem text={item.name} />}
        />
        <FlatList
          data={ordered}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <SwipeableItem
              text={item.name}
              onSwipeFromRight={() => console.warn('swiped right')}
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
