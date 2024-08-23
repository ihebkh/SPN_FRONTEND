'use client';

import { getCarProfitabilityKPI } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface CarProfitabilityChartProps {
  filters: { name: string; value: string | null }[];
}

const CarProfitabilityChart: React.FC<CarProfitabilityChartProps> = ({ filters }) => {
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
        const result = await getCarProfitabilityKPI(params);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching car profitability data:', error);
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

  const carModels = data.map((item: any) => item.car_model);
  const totalRevenues = data.map((item: any) => item.total_revenue);
  const prixAnnuel = data.map((item: any) => item.prix_annuel);
  const profitability = data.map((item: any) => item.profitability);

  const barColors = profitability.map((profit: number) =>
    profit > 0 ? '#5394FF' : profit < 0 ? '#F31D26' : '#FFBC3F'
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={[
          {
            x: carModels,
            y: totalRevenues,
            type: 'bar',
            name: 'Total Revenue',
            marker: {
              color: barColors
            },
            hoverinfo: 'x+y+text'
          },
          {
            x: carModels,
            y: prixAnnuel,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Annual Cost',
            line: {
              color: '#98C4EC',
              width: 2
            },
            marker: {
              size: 8
            }
          }
        ]}
        layout={{
          barmode: 'group',
          xaxis: {
            title: '',
            showticklabels: false
          },
          yaxis: {
            title: 'Amount (CHF)'
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

export default CarProfitabilityChart;
