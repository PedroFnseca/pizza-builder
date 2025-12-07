import { QueryClient, focusManager } from '@tanstack/react-query';
import { AppState } from 'react-native';

export const CACHE_TIMES = {
  longStaleTime: 10 * 60 * 1000,  // 10 minutes
  longGcTime: 60 * 60 * 1000,     // 1 hour
  shortStaleTime: 30 * 1000,      // 30 seconds
  shortGcTime: 5 * 60 * 1000,     // 5 minutes
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: CACHE_TIMES.shortStaleTime,
      gcTime: CACHE_TIMES.shortGcTime,
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
  },
});

export const setupFocusManager = () => {
  const listener = AppState.addEventListener('change', (status) => {
    focusManager.setFocused(status === 'active');
  });

  return () => listener.remove();
};
