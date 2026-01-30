import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({

    // 1. refresh token
    refreshToken: builder.mutation({
      query: () => ({
        url: "refresh",
        method: "GET",
      }),
    }),

    // 2. load user
    loadUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: data.accessToken,
              user: data.user,
            })
          );
        } catch {
          dispatch(userLoggedOut());
        }
      },
    }),
  }),
});

export const {
  useRefreshTokenMutation,
  useLoadUserQuery,
} = apiSlice;
