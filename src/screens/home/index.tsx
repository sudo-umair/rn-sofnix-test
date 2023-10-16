import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TProducts } from '@/interfaces/common';
import { getProducts } from '@/api/product';
import ProductItem from '@/components/home/product-item';

const HomeScreen = () => {
  const [products, setProducts] = useState<TProducts>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await getProducts();
        const products = response.data;
        setProducts(products);
      } catch (error) {
        console.warn(error);
      }
    })();
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.productId.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={{ rowGap: 10 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
