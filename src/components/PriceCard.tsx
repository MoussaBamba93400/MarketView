import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceCardProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  image?: string;
}

export function PriceCard({ name, symbol, price, change, image }: PriceCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4">
        {image && (
          <img src={image} alt={name} className="w-10 h-10 rounded-full" />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <p className="text-gray-500 text-sm">{symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-gray-900">
          ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className={`flex items-center gap-1 mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  );
}