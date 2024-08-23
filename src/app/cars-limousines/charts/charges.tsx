'use client';

import { getChargeKPI } from '@/services/bi-dashboard';
import React, { useEffect, useState } from 'react';

const ChargeKPI: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();

        const result = await getChargeKPI(params);
        setData(result);
      } catch (error) {
        console.error('Error fetching charge KPI:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const totalChargeStyle = {
    color: data.total_charge > 0 ? '#5394FF' : '#F31D26'
  };

  return (
    <div>
      <p style={totalChargeStyle}>{data.total_charge.toFixed(2)} CHF</p>
    </div>
  );
};

export default ChargeKPI;
