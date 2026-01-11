import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    /* ===== LẤY TẤT CẢ ĐƠN HÀNG ===== */
    getAllOrders: builder.query({
      query: () => ({
        url: "get-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    /* ===== LẤY STRIPE PUBLISHABLE KEY ===== */
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "payment/stripepublishablekey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    /* ===== TẠO PAYMENT INTENT ===== */
    createPaymentIntent: builder.mutation({
      query: (amount: number) => ({
        url: "payment",
        method: "POST",
        body: { amount }, // số tiền VND, backend sẽ *100
        credentials: "include" as const,
      }),
    }),

    /* ===== TẠO ĐƠN HÀNG ===== */
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "create-order",
        method: "POST",
        body: {
          courseId,
          payment_info, 
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

/* ===== EXPORT HOOKS ===== */
export const {
  useGetAllOrdersQuery,
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
} = ordersApi;
