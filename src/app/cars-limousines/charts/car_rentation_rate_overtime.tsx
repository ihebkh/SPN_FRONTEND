'use client';

import { getCarRentationRateOvertime } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface CarRateProps {
  filters: { name: string; value: string | null }[];
}

const CarRentationRateLineChart: React.FC<CarRateProps> = ({ filters }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        filters.forEach((filter) => {
          if (filter.value !== null) {
            params.append(filter.name, filter.value);
          }
        });
        const result = await getCarRentationRateOvertime(params);
        setData(result.data.data);
      } catch (error) {
        console.error('Error fetching car rentation rate overtime:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data.length) {
    return <div>No data available</div>;
  }

  const quarters = data.map((item: any) => item.quarter);
  const rates = data.map((item: any) => item.rate);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={[
          {
            x: quarters,
            y: rates,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#98C4EC' },
            line: { shape: 'linear' }
          }
        ]}
        layout={{
          xaxis: {
            title: 'Quarter',
            autorange: 'reversed'
          },
          yaxis: { title: 'Rentation Rate (%)' },
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

export default CarRentationRateLineChart;
