'use client';

import { getMostPopularRequests } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface MostPopularRequestsChartProps {
  filters: { name: string; value: string | null }[];
}

const MostPopularRequestsChart: React.FC<MostPopularRequestsChartProps> = ({ filters }) => {
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
        const result = await getMostPopularRequests(params);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching most popular requests:', error);
        setError('Error fetching data');
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

  const requestTypes = data.map((item: any) => item.request_type);
  const requestCounts = data.map((item: any) => item.request_count);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={[
          {
            labels: requestTypes,
            values: requestCounts,
            type: 'pie',
            insidetextorientation: 'radial',
            marker: {
              colors: ['#98C4EC', '#0BC0CF', '#E879D7', '#FFBC3F', '#F31D26']
            }
          }
        ]}
        layout={{
          autosize: true,
          plot_bgcolor: 'transparent',
          paper_bgcolor: 'transparent',
          legend: {
            orientation: 'h',
            x: 0.5,
            xanchor: 'center',
            y: -0.2,
            yanchor: 'top',
            font: {
              size: 8,
              color: '#333'
            }
          }
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default MostPopularRequestsChart;
