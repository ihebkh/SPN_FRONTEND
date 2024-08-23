'use client';

import { getBrandGains } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface BrandGainsProps {
  filters: { name: string; value: string | null }[];
}

const BrandGainsChart: React.FC<BrandGainsProps> = ({ filters }) => {
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
        const result = await getBrandGains(params);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching brand gains:', error);
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

  const brands = data.map((item: any) => item.brand);
  const gains = data.map((item: any) => item.total_gain);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={[
          {
            x: brands,
            y: gains,
            type: 'bar',
            marker: {
              color: '#0BC0CF',
              line: {
                color: 'rgba(255, 255, 255, 1.0)',
                width: 2
              }
            }
          }
        ]}
        layout={{
          xaxis: {
            title: 'Brand',
            showticklabels: false
          },
          yaxis: {
            title: 'Total Gain (CHF)'
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

export default BrandGainsChart;
