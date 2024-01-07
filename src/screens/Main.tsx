import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import {data} from '../data/data';
import {
  calculateAlcoholTax,
  calculateDiscounts,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from '../utils/utils';

import type {RootStackParamList} from '../../App';
import type {NavigationProp} from '@react-navigation/native';
import {Category, Item} from '../types/types';

const RightActions = () => {
  return (
    <View style={styles.leftAction}>
      <Icon name="trash-outline" size={20} color="white" />
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
      rightThreshold={0.2}
      onSwipeableOpen={onSwipeFromRight}>
      <View style={styles.listItem}>
        <Text style={styles.ordered}>{item.name}</Text>
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

// TODO: route type
const MainScreen = ({route}: {route: any}) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [ordered, setOrdered] = useState<Item[]>();
  const [subtotal, setSubtotal] = useState(0);
  const [discounts, setDiscounts] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);

  useFocusEffect(
    useCallback(() => {
      setSelectedDiscounts(route?.params?.discountIds);
    }, [route?.params?.discountIds]),
  );

  const handleOnPress = (item: Item) => {
    ordered
      ? setOrdered([...ordered, {...item, id: Date.now()}])
      : setOrdered([{...item, id: Date.now()}]);
  };

  const handleOnSwipeFromRight = (item: Item) => {
    setOrdered(ordered?.filter(el => el.id !== item.id));
  };

  const formatNumber = (number: number) =>
    `$${(Math.round(number * 100) / 100).toFixed(2)}`;

  useEffect(() => {
    if (ordered) {
      const _subtotal = calculateSubtotal(ordered);
      setSubtotal(_subtotal);
      setDiscounts(
        calculateDiscounts({
          subtotal: _subtotal,
          discountIds: selectedDiscounts,
        }),
      );
      setTax(calculateTax(_subtotal) + calculateAlcoholTax(ordered));
      setTotal(
        calculateTotal({subtotal: _subtotal, discountIds: selectedDiscounts}),
      );
    }
  }, [ordered, selectedDiscounts]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Discounts', {discountIds: selectedDiscounts})
          }
          style={styles.button}>
          <Text style={styles.buttonText}>SELECT DISCOUNTS</Text>
        </TouchableOpacity>
        <View style={styles.columns}>
          <View style={styles.container}>
            <FlatList
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => RenderSelectableItem(item, handleOnPress)}
            />
          </View>
          <View style={styles.orderContainer}>
            <Text style={styles.orderHeading}>Ordered</Text>
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
      </View>
      <View style={styles.bill}>
        <View style={styles.primaryTextContainer}>
          <Text style={styles.primaryText}>Subtotal </Text>
          <Text style={styles.primaryText}>Discounts</Text>
          <Text style={styles.primaryText}>Tax</Text>
          <Text style={styles.primaryText}>Total</Text>
        </View>
        <View style={styles.secondaryTextContainer}>
          <Text style={styles.secondaryText}>{formatNumber(subtotal)}</Text>
          <Text style={styles.secondaryText}>{formatNumber(discounts)}</Text>
          <Text style={styles.secondaryText}>{formatNumber(tax)}</Text>
          <Text style={styles.secondaryText}>{formatNumber(total)}</Text>
        </View>
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
  orderContainer: {
    flex: 1,
    paddingLeft: 80,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  bill: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#218c74',
  },
  leftAction: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#ff5252',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  listItem: {
    flex: 1,
    height: 32,
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    margin: 5,
    marginLeft: 0,
  },
  primaryText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'white',
  },
  primaryTextContainer: {
    alignItems: 'flex-end',
  },
  secondaryText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  },
  secondaryTextContainer: {
    marginLeft: 80,
  },
  ordered: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c2c54',
  },
  categoryHeading: {
    backgroundColor: '#474787',
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    padding: 4,
  },
  orderHeading: {
    backgroundColor: '#218c74',
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    padding: 4,
  },
});

export {MainScreen};
