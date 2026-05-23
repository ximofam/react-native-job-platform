import { useState } from 'react';
import { Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

export const useStripePayment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const openPaymentSheet = async (clientSecret, options = {}) => {
    const {
      merchantDisplayName = 'My App',
      onSuccess,
      onError,
    } = options;

    setLoading(true);
    try {
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName,
        paymentIntentClientSecret: clientSecret,
      });

      if (initError) {
        Alert.alert('Lỗi khởi tạo', initError.message);
        onError?.(initError);
        return;
      }

      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        if (paymentError.code !== 'Canceled') {
          Alert.alert('Thanh toán thất bại', paymentError.message);
        }
        onError?.(paymentError);
      } else {
        onSuccess?.();
      }
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể kết nối đến server');
      onError?.(e);
    } finally {
      setLoading(false);
    }
  };

  return { openPaymentSheet, loading };
};