'use client';

import { getCarClientsKPI } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import { Data } from 'plotly.js';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface CarClientsKpiProps {
  filters: { name: string; value: string | null }[];
}

const CarClientsKPIChart: React.FC<CarClientsKpiProps> = ({ filters }) => {
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
        const result = await getCarClientsKPI(params);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching car clients KPI:', error);
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

  const reqTypes = [...new Set(data.map((item: any) => item.req_type))];

  const reqTypeColors: { [key: string]: string } = {
    RENT: '#5394FF',
    TRANSFER: '#0BC0CF',
    DISPOSAL: '#57D989'
  };

  const traces: Data[] = reqTypes.map((reqType) => ({
    x: data.filter((item: any) => item.req_type === reqType).map((item: any) => item.client_count),
    y: data.filter((item: any) => item.req_type === reqType).map((item: any) => item.brand),
    type: 'bar',
    name: reqType,
    orientation: 'h',
    marker: {
      color: reqTypeColors[reqType] || '#333'
    }
  }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={traces}
        layout={{
          barmode: 'stack',
          xaxis: {
            title: 'Client Count'
          },
          yaxis: {
            showticklabels: false
          },
          plot_bgcolor: 'transparent',
          paper_bgcolor: 'transparent',
          autosize: true,
          margin: {
            l: 50,
            r: 50,
            t: 50,
            b: 50
          },
          legend: {
            orientation: 'h',
            x: 0.5,
            xanchor: 'center',
            y: -0.2,
            yanchor: 'top',
            font: {
              size: 12,
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

export default CarClientsKPIChart;
