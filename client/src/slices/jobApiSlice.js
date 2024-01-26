import { apiSlice } from "./apiSlice";
const JOB_API = "/api/jobs";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allJobs: builder.query({
      query: () => ({
        url: JOB_API,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Jobs"],
    }),
    getJob: builder.query({
      query: (jobId) => ({
        url: `${JOB_API}/${jobId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `${JOB_API}/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
    createJob: builder.mutation({
      query: (data) => ({
        url: JOB_API,
        method: "POST",
        body: data,
      }),
    }),
    updateJob: builder.mutation({
      query: (data) => ({
        url: `${JOB_API}/${data.jobId}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useAllJobsQuery,
  useGetJobQuery,
  useCreateJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
} = jobApi;
