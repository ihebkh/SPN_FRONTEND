'use client';

import { getTotalPrice } from '@/services/bi-dashboard';
import React, { useEffect, useState } from 'react';

const TotalPriceKPI: React.FC<{ start_date?: string; end_date?: string }> = ({
  start_date,
  end_date
}) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = { start_date, end_date };
        const result = await getTotalPrice(params);
        setData(result);
      } catch (error) {
        console.error('Error fetching total price:', error);
      }
    };
    fetchData();
  }, [start_date, end_date]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.total_price.toFixed(2)} CHF</h1>
    </div>
  );
};

export default TotalPriceKPI;
