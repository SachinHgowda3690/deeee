import {configureStore} from '@reduxjs/toolkit'

import { cryptoApi } from '../services/cryptoApi'
import { cryptonewsApi } from '../services/cryptonewsApi'

export const store = configureStore({
    reducer: {
      // Add your reducers here
      [cryptoApi.reducerPath]: cryptoApi.reducer,
      [cryptonewsApi.reducerPath]: cryptonewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(cryptoApi.middleware)
        .concat(cryptonewsApi.middleware), // ✅ Fix: Include cryptoNewsApi middleware
  });
  