import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useStripePayment } from '../hooks/useStripePayment';

export default function PayButton({ clientSecret, amount, merchantDisplayName, onSuccess, onError, style }) {
  const { openPaymentSheet, loading } = useStripePayment();

  const handlePress = () => {
    openPaymentSheet(clientSecret, {
      merchantDisplayName,
      onSuccess,
      onError,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.disabled, style]}
      onPress={handlePress}
      disabled={loading}
    >
      {loading
        ? <ActivityIndicator color="#fff" />
        : <Text style={styles.text}>
          {amount ? `Thanh toán ${amount}` : 'Thanh toán'}
        </Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#635BFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabled: { opacity: 0.6 },
  text: { color: '#fff', fontWeight: '700', fontSize: 16 },
});