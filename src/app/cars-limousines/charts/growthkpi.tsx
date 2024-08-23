'use client';

import { getGrowthKPI } from '@/services/bi-dashboard';
import React, { useEffect, useState } from 'react';

const GrowthKPI: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getGrowthKPI();
        setData(result);
      } catch (error) {
        console.error('Error fetching growth KPI:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const growthStyle = {
    color: data.growth_2024 > 0 ? 'green' : 'red'
  };

  return (
    <div>
      <p style={growthStyle}>{data.growth_2024.toFixed(2)}% from last year</p>
      <h1>{data.gain_2024.toFixed(3)} CHF</h1>
    </div>
  );
};

export default GrowthKPI;
