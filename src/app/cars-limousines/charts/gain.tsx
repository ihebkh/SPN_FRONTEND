'use client';

import { getFactRequestGain } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import { Data } from 'plotly.js';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface FactRequestGainChartProps {
  filters: { name: string; value: string | null }[];
}

const FactRequestGainChart: React.FC<FactRequestGainChartProps> = ({ filters = [] }) => {
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

        const result = await getFactRequestGain(params);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching fact request gain:', error);
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

  const customers = data.map((item: any) => item.customer_name);
  const gains = data.map((item: any) => item.gain);
  const colorscales: [number, string][] = [
    [0, '#5394FF'],
    [0.14, '#0BC0CF'],
    [0.28, '#C7D2F9'],
    [0.42, '#D7E6F0'],
    [0.56, '#33E7D2'],
    [0.7, '#AADBD5'],
    [0.84, '#8EA0D0'],
    [1, '#98C4EC']
  ];

  const traces: Data[] = [
    {
      x: gains,
      y: customers,
      type: 'bar',
      orientation: 'h',
      marker: {
        color: gains,
        colorscale: colorscales as Plotly.ColorScale
      }
    }
  ];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={traces}
        layout={{
          xaxis: {
            title: 'Total Gain'
          },
          yaxis: {
            title: 'Customer',
            automargin: true
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

export default FactRequestGainChart;
