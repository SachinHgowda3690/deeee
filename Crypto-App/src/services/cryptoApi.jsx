import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Headers
const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '283d0afcc8msh7eba27cfc6f9263p1a449djsn190691ea0e67',
};

// Base URL
const baseUrl = 'https://coinranking1.p.rapidapi.com';

// Function to Create API Request
const createRequest = (url) => ({ url });

// Crypto API Definition
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      Object.entries(cryptoApiHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) =>
        createRequest(`/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=${count}&offset=0`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) =>
        createRequest(`/coin/${coinId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`),

      
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&${timePeriod}`),

      

      
    }),
    getExchanges: builder.query({
      query: () =>
        createRequest(`/exchanges?referenceCurrencyUuid=yhjMzLPhuIDl&limit=50&offset=0&orderBy=24hVolume&orderDirection=desc`),

      

      
    }),
  }),
});

// Hook Export
export const { useGetCryptosQuery , useGetCryptoDetailsQuery ,useGetCryptoHistoryQuery,useGetExchangesQuery} = cryptoApi;
