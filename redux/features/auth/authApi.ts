import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
};

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type SocialAuthData = {
  email: string;
  name: string;
  avatar: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Đăng ký
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
          userRegistration({
            activationToken: result.data.activationToken,
          })
        );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // Kích hoạt tài khoản
    activation: builder.mutation({
      query: ({ activation_token, activation_code }: { activation_token: string; activation_code: string }) => ({
        url: "activate-user",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),

    // Login
    login: builder.mutation({
      query: (data: LoginData) => ({
        url: "login",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user,
              accessToken: result.data.accessToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // Social login
    socialAuth: builder.mutation({
      query: (data: SocialAuthData) => ({
        url: "social-auth",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user,
              accessToken: result.data.accessToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // Logout
    logOut: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutQuery,
} = authApi;
