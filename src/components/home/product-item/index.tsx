import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProductItemProps } from '@/interfaces/components';
import { IProductDetails, TTimerStatus } from '@/interfaces/common';
import { getProductDetails } from '@/api/product';
import { formatTime } from '@/helpers';

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [details, setDetails] = useState<IProductDetails>();
  const [timer, setTimer] = useState<number>(product.timeInSeconds);
  const [timerStatus, setTimerStatus] = useState<TTimerStatus>('RUNNING');

  useEffect(() => {
    const timerSubscription = setInterval(() => {
      if (timerStatus === 'RUNNING') {
        if (timer <= 0) {
          clearInterval(timerSubscription);
          setTimerStatus('COMPLETED');
          fetchProductDetails();
        } else {
          setTimer((t) => Math.max(0, t - 1));
        }
      }
    }, 1000);

    return () => clearInterval(timerSubscription);
  }, [timerStatus, timer]);

  const fetchProductDetails = async () => {
    try {
      const response = await getProductDetails(product.productId);
      const productDetails = response.data;
      setDetails(productDetails);
    } catch (error) {
      console.warn('error', error);
    }
  };

  const resetTimer = () => {
    setTimer(product.timeInSeconds);
  };

  const pauseTimer = () => {
    setTimerStatus('PAUSED');
  };
  const resumeTimer = () => {
    setTimerStatus('RUNNING');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.id}>Product ID: {product.productId}</Text>
        {timerStatus !== 'COMPLETED' && (
          <Text style={styles.timer}>{formatTime(timer)}</Text>
        )}
      </View>
      {timerStatus !== 'COMPLETED' ? (
        <View style={styles.buttonsRow}>
          {timerStatus === 'PAUSED' ? (
            <Button title='RESUME' onPress={resumeTimer} />
          ) : (
            <Button title='PAUSE' onPress={pauseTimer} />
          )}
          <Button title='RESET' onPress={resetTimer} />
        </View>
      ) : (
        <View style={styles.detailsRow}>
          <Text style={styles.details}>
            Product Name: {details?.productName ?? 'Loading...'}
          </Text>
          <Text style={styles.details}>
            Price: {details?.price ?? 'Loading...'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.6,
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 6,
    justifyContent: 'space-between',
    padding: 10,
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  id: {
    fontSize: 14,
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    columnGap: 10,
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
