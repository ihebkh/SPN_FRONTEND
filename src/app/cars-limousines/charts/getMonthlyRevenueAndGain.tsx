'use client';

import { getMonthlyRevenueAndGain } from '@/services/bi-dashboard';
import React, { useEffect, useState } from 'react';

const MonthlyRevenueAndGainCard: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMonthlyRevenueAndGain();
        setData(result);
      } catch (error) {
        console.error('Error fetching monthly revenue and gain:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const gainStyle = {
    color: data.percentage_gain > 0 ? 'green' : 'red'
  };

  return (
    <div
      style={{
        backgroundColor: 'transparent'
      }}
    >
      <p style={gainStyle}>
        {data.percentage_gain.toFixed(2)}% {data.percentage_gain > 0 ? 'increase' : 'decrease'} from
        previous month
      </p>
      <h1>{data.last_month_total_revenue.toFixed(2)} CHF</h1>
    </div>
  );
};

export default MonthlyRevenueAndGainCard;
