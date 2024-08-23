'use client';

import { getClientsPercentagePerCarTypeAndRequestType } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import { Data } from 'plotly.js';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface ClientsPercentageChartProps {
  filters: { name: string; value: string | null }[];
}

const ClientsPercentageChart: React.FC<ClientsPercentageChartProps> = ({ filters }) => {
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
        const result = await getClientsPercentagePerCarTypeAndRequestType(params);
        setData(result.data);
      } catch (err) {
        console.error('Error fetching clients percentage per car type and request type:', err);
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

  const carTypes = [...new Set(data.map((item: any) => item.car_type))];

  const carTypeColors: { [key: string]: string } = {
    BERLIN: '#F31D26',
    EXOTIC: '#FFBC3F',
    LIMOUSINE: '#E879D7',
    SUV: '#0BC0CF',
    VAN: '#5394FF'
  };

  const traces: Data[] = carTypes.map((carType) => ({
    x: data
      .filter((item: any) => item.car_type === carType)
      .map((item: any) => item.client_percentage),
    y: data.filter((item: any) => item.car_type === carType).map((item: any) => item.request_type),
    type: 'bar',
    name: carType,
    orientation: 'h',
    marker: {
      color: carTypeColors[carType] || '#333'
    }
  }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={traces}
        layout={{
          barmode: 'stack',
          xaxis: {
            title: 'Percentage'
          },
          yaxis: {
            title: 'Request Type',
            automargin: true
          },
          plot_bgcolor: 'transparent',
          paper_bgcolor: 'transparent',
          autosize: true,
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

export default ClientsPercentageChart;
