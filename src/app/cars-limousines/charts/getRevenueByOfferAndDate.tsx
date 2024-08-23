'use client';

import { getRevenueByOfferAndDate } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface RevenueByOfferAndDateChartProps {
  filters: { name: string; value: string | null }[];
}

const RevenueByOfferAndDateChart: React.FC<RevenueByOfferAndDateChartProps> = ({ filters }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        filters.forEach((filter) => {
          if (filter.value !== null) {
            params.append(filter.name, filter.value);
          }
        });
        const result = await getRevenueByOfferAndDate(params);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching revenue by offer and date:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <div>No data available</div>;
  }

  const dates = data.map((item: any) => item.date);
  const revenues = data.map((item: any) => item.revenue);
  const offerCodes = data.map((item: any) => item.offer_code);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={[
          {
            x: dates,
            y: revenues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
            line: { shape: 'linear' },
            text: offerCodes,
            hoverinfo: 'x+y+text'
          }
        ]}
        layout={{
          xaxis: {
            title: 'Date'
          },
          yaxis: {
            title: 'Revenue (CHF)'
          },
          plot_bgcolor: 'transparent',
          paper_bgcolor: 'transparent',
          autosize: true
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default RevenueByOfferAndDateChart;
