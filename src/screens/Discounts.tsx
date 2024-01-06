import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {discounts} from '../data/data';

import type {RootStackParamList} from '../../App';
import type {NavigationProp} from '@react-navigation/native';

const DiscountsScreen = ({route}: {route: any}) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>(
    route?.params?.discountIds || [],
  );

  const handleOnPress = (id: number) => {
    if (!selectedDiscounts.includes(id)) {
      setSelectedDiscounts([...selectedDiscounts, id]);
    } else {
      setSelectedDiscounts([
        ...selectedDiscounts.filter(discountId => discountId !== id),
      ]);
    }
  };

  useEffect(() => {
    navigation.setParams({discountIds: selectedDiscounts});
  }, [navigation, selectedDiscounts]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Main', {discountIds: selectedDiscounts})
        }>
        <Text>Click me</Text>
      </TouchableOpacity>
      {discounts.map(discount => (
        <TouchableOpacity
          key={discount.id}
          onPress={() => handleOnPress(discount.id)}
          style={styles.discount}>
          <Text style={styles.text}>{discount.name}</Text>
          {selectedDiscounts.includes(discount.id) && (
            <Icon name="checkmark-circle" size={30} color="#26A65B" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    margin: 10,
  },
  discount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export {DiscountsScreen};
