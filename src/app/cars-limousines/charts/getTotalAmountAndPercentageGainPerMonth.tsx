'use client';

import { getTotalAmountAndPercentageGainPerMonth } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface TotalAmountAndPercentageGainChartProps {
  filters: { name: string; value: string | null }[];
}

const TotalAmountAndPercentageGainChart: React.FC<TotalAmountAndPercentageGainChartProps> = ({
  filters
}) => {
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
        const result = await getTotalAmountAndPercentageGainPerMonth(params);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching total amount and percentage gain per month:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <div>No data available</div>;
  }

  const months = data.map((item) => `${item.year}-${String(item.month).padStart(2, '0')}`);
  const totalAmounts = data.map((item) => item.total_amount);
  const percentageGains = data.map((item) => item.percentage_gain);

  return (
    <div>
      <Plot
        data={[
          {
            x: months,
            y: totalAmounts,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Total Amount',
            line: { color: 'blue' }
          },
          {
            x: months,
            y: percentageGains,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Percentage Gain',
            yaxis: 'y2',
            line: { color: 'green' }
          }
        ]}
        layout={{
          title: 'Total Amount and Percentage Gain Per Month',
          xaxis: { title: 'Month' },
          yaxis: { title: 'Total Amount', side: 'left' },
          yaxis2: {
            title: 'Percentage Gain',
            overlaying: 'y',
            side: 'right',
            tickformat: '%'
          },
          plot_bgcolor: 'transparent',
          paper_bgcolor: 'transparent'
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default TotalAmountAndPercentageGainChart;
