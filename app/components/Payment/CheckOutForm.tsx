'use client';

import {
  useElements,
  useStripe,
  PaymentElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';

import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import { styles } from '@/app/styles/style';

type Props = {
  setOpen: any;
  data: any;
  user: any;
};

const CheckoutForm = ({ setOpen, data, user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const socketRef = useRef<Socket | null>(null);

  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadUser, setLoadUser] = useState(false);

  const [createOrder, { data: orderData, error }] =
    useCreateOrderMutation();

  useLoadUserQuery(undefined, {
    skip: !loadUser,
  });

  // ✅ Init socket SAFELY
  useEffect(() => {
    const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI;

    if (!ENDPOINT) return;

    socketRef.current = io(ENDPOINT, {
      transports: ['websocket'],
      withCredentials: true,
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message || 'Payment failed');
      setIsLoading(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      setIsLoading(false);
      createOrder({
        courseId: data._id,
        payment_info: paymentIntent,
      });
    }
  };

  // ✅ Emit notification ONLY after order success
  useEffect(() => {
    if (orderData) {
      setLoadUser(true);

      socketRef.current?.emit('notification', {
        title: 'New Order',
        message: `You have a new order from ${data.course.name}`,
        userId: user._id,
      });

      router.push(`/course-access/${data._id}`);
    }

    if (error && 'data' in error) {
      const err: any = error;
      toast.error(err.data?.message || 'Order failed');
    }
  }, [orderData, error, data._id, router, user._id]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />

      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span className={`${styles.button} mt-2 !h-[35px]`}>
          {isLoading ? 'Paying...' : 'Pay now'}
        </span>
      </button>

      {message && (
        <div className="text-[red] font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
