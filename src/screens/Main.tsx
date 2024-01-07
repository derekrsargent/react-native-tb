import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {data} from '../data/data';
import {
  calculateAlcoholTax,
  calculateDiscounts,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatNumber,
} from '../utils/utils';
import {RenderSelectableItem, SwipeableItem} from '../components';

import type {RootStackParamList} from '../../App';
import type {NavigationProp} from '@react-navigation/native';
import {Item} from '../types/types';

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

  useEffect(() => {
    if (ordered) {
      const _subtotal = calculateSubtotal(ordered);
      const _total = calculateTotal({
        discountIds: selectedDiscounts,
        ordered,
      });
      setSubtotal(_subtotal);
      setDiscounts(
        calculateDiscounts({
          total: _total,
          discountIds: selectedDiscounts,
        }),
      );
      setTax(calculateTax(_subtotal) + calculateAlcoholTax(ordered));
      setTotal(_total);
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
          <View>
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
  container: {
    flex: 1,
  },
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
  orderContainer: {
    flex: 1,
    paddingLeft: 40,
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
    width: 60,
  },
  categoryHeading: {
    backgroundColor: '#474787',
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
  orderHeading: {
    backgroundColor: '#218c74',
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
});

export {MainScreen};
