import axios from 'axios';
import axiosRetry from 'axios-retry';

const baseURL = import.meta.env.VITE_API_BASE_URL?.trim() || '/api';

export const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(httpClient, {
  retries: 1,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error),
});
