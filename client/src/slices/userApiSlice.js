import { apiSlice } from "./apiSlice";
const USER_API = "/api/users";

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_API}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_API}/register`,
        method: "POST",
        body: { ...data },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_API}/logout`,
        method: "POST",
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: USER_API,
        method: "PATCH",
        body: data,
      }),
    }),
    updateuserProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_API}/profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: "User",
    }),
  }),
});

export const {
  useLogoutMutation,
  useRegisterMutation,
  useUploadImageMutation,
  useLoginMutation,
  useUpdateuserProfileMutation,
} = userSlice;
