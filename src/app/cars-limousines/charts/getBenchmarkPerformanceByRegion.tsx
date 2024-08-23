'use client';

import { getBenchmarkPerformanceByRegion } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface BenchmarPerformanceProps {
  filters: { name: string; value: string | null }[];
}

const BenchmarkPerformanceChart: React.FC<BenchmarPerformanceProps> = ({ filters }) => {
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
        const result = await getBenchmarkPerformanceByRegion(params);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching benchmark performance data:', error);
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

  const regions = data.map((item: any) => item.region);
  const requestCounts = data.map((item: any) => item.request_count);
  const sources = data.map((item: any) => item.source);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={[
          {
            x: regions,
            y: requestCounts,
            type: 'bar',
            text: sources,
            marker: {
              color: '#33E7D2',
              line: {
                color: '#0BC0CF',
                width: 1
              }
            }
          }
        ]}
        layout={{
          xaxis: {
            title: 'Region',
            automargin: true
          },
          yaxis: {
            title: 'Request Count'
          },
          plot_bgcolor: 'transparent',
          paper_bgcolor: 'transparent',
          autosize: true,
          margin: {
            l: 40,
            r: 20,
            b: 100,
            t: 40
          }
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default BenchmarkPerformanceChart;
