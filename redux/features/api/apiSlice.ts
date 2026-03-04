import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  credentials: "include",
});

// 🔥 Auto refresh token
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // nếu access token hết hạn
  if (result?.error?.status === 401) {
    console.log("Access token expired → refreshing...");

    const refreshResult: any = await baseQuery(
      {
        url: "refresh",
        method: "GET",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      console.log("Token refreshed");

      // gọi lại request ban đầu
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userLoggedOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
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

export const { useLoadUserQuery } = apiSlice;