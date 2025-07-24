// store/context/StockContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { getStoreSocket } from '@/lib/socket';

interface StockUpdate {
  productId: string;
  newStock: number;
}

interface StockContextValue {
  connect: () => void;
  disconnect: () => void;
  getStockFor: (productId: string) => number | undefined;
  subscribe: (
    productId: string,
    callback: (newStock: number) => void
  ) => () => void;
}

const StockContext = createContext<StockContextValue | null>(null);

export function StockProvider({ children }: { children: ReactNode }) {
  const [latest, setLatest] = useState<Record<string, number>>({});
  const socket = getStoreSocket();

  const connect = useCallback(() => {
    if (!socket.connected) socket.connect();
  }, [socket]);

  const disconnect = useCallback(() => {
    if (socket.connected) socket.disconnect();
  }, [socket]);

  useEffect(() => {
    const handler = (u: StockUpdate) => {
      setLatest(prev => ({ ...prev, [u.productId]: u.newStock }));
    };
    socket.on('stockUpdate', handler);
    return () => {
      socket.off('stockUpdate', handler);
    };
  }, [socket]);

  const getStockFor = useCallback(
    (productId: string) => latest[productId],
    [latest]
  );

  const subscribe = useCallback(
    (productId: string, cb: (newStock: number) => void) => {
      // call immediately if we already have a value
      if (latest[productId] !== undefined) {
        cb(latest[productId]);
      }
      // subscribe to future updates
      const handler = (u: StockUpdate) => {
        if (u.productId === productId) cb(u.newStock);
      };
      socket.on('stockUpdate', handler);
      return () => {
        socket.off('stockUpdate', handler);
      };
    },
    [latest, socket]
  );

  return (
    <StockContext.Provider
      value={{ connect, disconnect, getStockFor, subscribe }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStockContext() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error('Must be inside StockProvider');
  return ctx;
}
