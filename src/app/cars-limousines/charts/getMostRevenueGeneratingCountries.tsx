'use client';

import { getMostRevenueGeneratingCountries } from '@/services/bi-dashboard';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface MostRevenueGeneratingCountriesChartProps {
  filters: { name: string; value: string | null }[];
}

const MostRevenueGeneratingCountriesChart: React.FC<MostRevenueGeneratingCountriesChartProps> = ({
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
        const result = await getMostRevenueGeneratingCountries(params);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]); // Add filters as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <div>No data available</div>;
  }

  const countries = data.map((item: any) => item.country);
  const revenues = data.map((item: any) => item.total_revenue);
  const sizes = revenues.map((rev: number) => rev / 50000);
  const hoverTexts = revenues.map(
    (rev: number, index: number) => `${countries[index]}: $${rev.toLocaleString()}`
  );

  const customColorscale: [number, string][] = [
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
            type: 'scattergeo',
            mode: 'markers',
            locations: ['FRA', 'DEU', 'ITA', 'ESP', 'CHE', 'AUT', 'BEL', 'GRC', 'PRT', 'HUN'],
            marker: {
              size: sizes,
              color: revenues,
              cmin: Math.min(...revenues),
              cmax: Math.max(...revenues),
              colorscale: customColorscale,
              line: {
                color: '#333',
                width: 1
              },
              opacity: 0.8
            },
            text: hoverTexts,
            hoverinfo: 'text',
            name: 'Revenue Data'
          }
        ]}
        layout={{
          autosize: true,
          geo: {
            scope: 'world',
            resolution: 50,
            showland: true,
            landcolor: '#E5ECF6',
            showocean: true,
            oceancolor: '#b0d0ff',
            showrivers: true,
            rivercolor: '#9fd4ff',
            showcountries: true,
            countrycolor: '#a0a0a0',
            showlakes: true,
            lakecolor: '#9fd4ff',
            bgcolor: '#F5F7FA',
            projection: {
              type: 'mercator'
            }
          },
          margin: { t: 0, b: 0, l: 0, r: 0 },
          paper_bgcolor: 'transparent'
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default MostRevenueGeneratingCountriesChart;
