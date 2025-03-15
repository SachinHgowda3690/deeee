// services/cryptoNewsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptonewsApi = createApi({
  reducerPath: 'cryptonewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://crypto-news16.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', '283d0afcc8msh7eba27cfc6f9263p1a449djsn190691ea0e67');
      headers.set('x-rapidapi-host', 'crypto-news16.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ keyword, page = 0, size = 10 }) => ({
        url: '/news/cointelegraph', // Correct endpoint path
        params: {
          keyword,
          page,
          size,
        },
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptonewsApi;