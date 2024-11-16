import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

interface ChartProps {
  data: { time: string; value: number }[];
  title: string;
}

export function Chart({ data, title }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: '#ffffff' },
          textColor: '#333',
        },
        grid: {
          vertLines: { color: '#f0f0f0' },
          horzLines: { color: '#f0f0f0' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 300,
      });

      const lineSeries = chart.addLineSeries({
        color: '#2563eb',
        lineWidth: 2,
      });

      lineSeries.setData(data);

      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div ref={chartContainerRef} />
    </div>
  );
}