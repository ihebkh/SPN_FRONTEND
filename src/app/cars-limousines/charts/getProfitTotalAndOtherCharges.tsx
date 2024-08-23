'use client';

import { getProfitTotalAndOtherCharges } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface ProfitChargesChartProps {
  filters: { name: string; value: string | null }[];
}

const ProfitChargesChart: React.FC<ProfitChargesChartProps> = ({ filters }) => {
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
        const result = await getProfitTotalAndOtherCharges(params);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching profit and charges data:', error);
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

  const months = data.map((item: any) => item.month);
  const totalRevenues = data.map((item: any) => item.total_revenue);
  const totalProfits = data.map((item: any) => item.total_profit);
  const otherCharges = data.map((item: any) => item.other_charges);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={[
          {
            x: months,
            y: totalRevenues,
            type: 'bar',
            name: 'Total Revenue',
            marker: {
              color: totalProfits.map((profit: number) =>
                profit > 0 ? '#33E7D2' : profit === 0 ? '#FFBC3F' : '#F31D26'
              )
            }
          },
          {
            x: months,
            y: totalProfits,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Total Profit',
            line: {
              color: '#5394FF',
              width: 2
            },
            marker: {
              size: 8
            }
          },
          {
            x: months,
            y: otherCharges,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Other Charges',
            line: {
              color: 'red',
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
            title: 'Month',
            automargin: true,
            showticklabels: false
          },
          yaxis: {
            title: 'Amount (CHF)'
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

export default ProfitChargesChart;
