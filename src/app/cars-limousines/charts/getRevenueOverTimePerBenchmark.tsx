'use client';

import { getRevenueOverTimePerBenchmark } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface RevenueOverTimeBubbleChartProps {
  filters: { name: string; value: string | null }[];
}

const RevenueOverTimeBubbleChart: React.FC<RevenueOverTimeBubbleChartProps> = ({ filters }) => {
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
        const result = await getRevenueOverTimePerBenchmark(params);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching revenue over time:', error);
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

  const sources = Array.from(new Set(data.map((item: any) => item.source)));
  const maxRevenue = Math.max(...data.map((item: any) => item.total_revenue));
  const plotData = sources.map((source: string) => {
    const sourceData = data.filter((item: any) => item.source === source);

    return {
      x: sourceData.map((item: any) => item.date),
      y: sourceData.map((item: any) => item.total_revenue),
      mode: 'markers',
      marker: {
        size: sourceData.map((item: any) => (item.total_revenue / maxRevenue) * 100),
        sizemode: 'area',
        sizeref: (2.0 * Math.max(...sourceData.map((item: any) => item.total_revenue))) / 100 ** 2,
        sizemin: 4
      },
      text: sourceData.map(
        (item: any) => `Source: ${item.source}, Revenue: $${item.total_revenue.toLocaleString()}`
      ),
      hoverinfo: 'text',
      name: source
    };
  });

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={plotData}
        layout={{
          xaxis: {
            title: 'Date',
            type: 'date'
          },
          yaxis: {
            title: 'Revenue ($)',
            type: 'linear'
          },
          showlegend: true,
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

export default RevenueOverTimeBubbleChart;
