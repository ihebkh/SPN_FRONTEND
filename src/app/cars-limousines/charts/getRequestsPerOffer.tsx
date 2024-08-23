'use client';

import { getRequestsPerOffer } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface RequestsPerOfferChartProps {
  filters: { name: string; value: string | null }[];
}

const RequestsPerOfferChart: React.FC<RequestsPerOfferChartProps> = ({ filters }) => {
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
        const result = await getRequestsPerOffer(params);
        if (Array.isArray(result.data)) {
          setData(result.data);
        } else {
          console.error('Unexpected data format:', result);
        }
      } catch (error) {
        console.error('Error fetching requests per offer:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const adjustementTypes = data.map((item: any) => item.adjustement_type);
  const requestCounts = data.map((item: any) => item.request_count);
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

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={[
          {
            x: requestCounts,
            y: adjustementTypes,
            type: 'bar',
            orientation: 'h',
            marker: {
              color: requestCounts,
              colorscale: colorscales as Plotly.ColorScale
            }
          }
        ]}
        layout={{
          xaxis: {
            title: 'Request Count'
          },
          yaxis: {
            title: 'Adjustment Type',
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

export default RequestsPerOfferChart;
