'use client';

import { useStockContext } from '@/context/stock-context';
import { useEffect, useState } from 'react';

interface StockBadgeProps {
  productId: string;
  initialStock: number;
}

export default function StockBadge({
  productId,
  initialStock,
}: StockBadgeProps) {
  const { connect, disconnect, getStockFor, subscribe } = useStockContext();
  const [stock, setStock] = useState<number>(initialStock);

  useEffect(() => {
    // ensure socket is live
    connect();

    // override initialStock if context already has a newer value
    const existing = getStockFor(productId);
    if (existing !== undefined) setStock(existing);

    // subscribe for live updates
    const unsubscribe = subscribe(productId, latest => {
      setStock(latest);
    });

    return () => {
      unsubscribe();
      // optionally tear down global socket if nobody else is using it
      disconnect();
    };
  }, [connect, disconnect, getStockFor, subscribe, productId]);

  return (
    <span
      className={`inline-block px-2 py-1 text-sm font-medium rounded ${
        stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {stock > 0 ? `${stock} in stock` : 'Out of stock'}
    </span>
  );
}
