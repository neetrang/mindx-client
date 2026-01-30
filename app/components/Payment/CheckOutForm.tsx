"use client";

import {
  useElements,
  useStripe,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { styles } from "@/app/styles/style";

type Props = {
  setOpen: (open: boolean) => void;
  data: any;
  user: any;
};

const CheckoutForm = ({ setOpen, data, user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const socketRef = useRef<Socket | null>(null);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ LẤY refetch để update redux.user sau khi mua
  const { refetch } = useLoadUserQuery({});

  const [createOrder, { data: orderData, error }] =
    useCreateOrderMutation();

  // ✅ Init socket (an toàn)
  useEffect(() => {
    const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI;
    if (!ENDPOINT) return;

    socketRef.current = io(ENDPOINT, {
      transports: ["websocket"],
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
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Thanh toán thất bại");
      setIsLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      createOrder({
        courseId: data._id,
        payment_info: paymentIntent,
      });
    }
  };

  // ✅ SAU KHI ORDER THÀNH CÔNG
  useEffect(() => {
    if (orderData) {
      (async () => {
        await refetch();     // 🔥 update redux.user
        setOpen(false);      // 🔥 đóng modal thanh toán

      socketRef.current?.emit("notification", {
        title: "Đơn hàng mới",
        message: "Một học viên vừa đăng ký khóa học",
        userId: user._id,
      });

        toast.success("Thanh toán thành công 🎉");
        // ❌ KHÔNG redirect ở đây → để user tự bấm “Vào khóa học”
      })();
    }

    if (error && "data" in error) {
      const err: any = error;
      toast.error(err.data?.message || "Đặt hàng thất bại");
      setIsLoading(false);
    }
  }, [orderData, error, refetch, setOpen, user._id]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />

      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span className={`${styles.button} mt-2 !h-[35px]`}>
          {isLoading ? "Đang thanh toán..." : "Thanh toán"}
        </span>
      </button>

      {message && (
        <div className="text-red-500 text-sm pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
