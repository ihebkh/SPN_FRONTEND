'use client';
import { FetchDates, FetchDests, FetchSlug } from '@/services/bi-dashboard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Card } from '@/components/ui/cards';
import { CardsContainer } from '@/components/ui/containers';
import FilterNavOverlay from '@/components/ui/filterNav';

import CarClientsKPIChart from '../charts/car_client_kpi';
import CarRentationRateLineChart from '../charts/car_rentation_rate_overtime';
import ChargeKPI from '../charts/charges';
import BenchmarkPerformanceChart from '../charts/getBenchmarkPerformanceByRegion';
import ClientsPercentageChart from '../charts/getClientsPercentagePerCarTypeAndRequestType';
import MonthlyRevenueAndGainCard from '../charts/getMonthlyRevenueAndGain';
import RequestsPerOfferChart from '../charts/getRequestsPerOffer';
import TotalPriceCard from '../charts/getTotalPrice';
import GrowthKPIPage from '../charts/growthkpi';
import MostPopularRequestsChart from '../charts/most_popular_requests';
export default function CarsLimousines() {
  const [showFilter, setShowFilter] = useState(false);
  const [slugs, setSlugs] = useState([]);
  const [start_dates, setStart] = useState([]);
  const [end_dates, setEnd] = useState([]);
  const [dest_codes, setDestinations] = useState([]);
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  const dest_code = searchParams.get('dest_code');

  useEffect(() => {
    const fetchSlugs = async () => {
      try {
        const data = await FetchSlug();
        setSlugs(data);
      } catch (error) {
        console.error('Error fetching slugs:', error);
      }
    };
    const fetchStartDates = async () => {
      try {
        const data = await FetchDates();
        setStart(data);
      } catch (error) {
        console.error('Error fetching date :', error);
      }
    };
    const fetchEndDates = async () => {
      try {
        const data = await FetchDates();
        setEnd(data);
      } catch (error) {
        console.error('Error fetching date :', error);
      }
    };
    const fetchDestinations = async () => {
      try {
        const data = await FetchDests();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching date :', error);
      }
    };

    fetchDestinations();
    fetchStartDates();
    fetchEndDates();
    fetchSlugs();
  }, []);

  const filters = [
    { name: 'slug', value: slug },
    { name: 'start_date', value: start_date },
    { name: 'end_date', value: end_date },
    { name: 'dest_code', value: dest_code }
  ];

  const filterData = [
    {
      title: 'Car Type Slug',
      valueKey: 'slug',
      values: slugs.map((slug) => ({ title: slug, value: slug }))
    },
    {
      title: 'Start Date',
      valueKey: 'start_date',
      values: start_dates.map((start_date) => ({ title: start_date, value: start_date }))
    },
    {
      title: 'End Date',
      valueKey: 'end_date',
      values: end_dates.map((end_date) => ({ title: end_date, value: end_date }))
    },
    {
      title: 'Destination Code',
      valueKey: 'dest_code',
      values: dest_codes.map((dest_code) => ({ title: dest_code, value: dest_code }))
    }
  ];

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section className="relative flex size-full flex-col items-center justify-center">
      <a onClick={toggleFilter} className="bg-blue-500 mb-4 rounded px-4 py-2 text-white">
        <svg className="aspect-square size-7 rotate-90 duration-300" viewBox="0 0 512 512">
          <g>
            <path
              id="Icon_ionic-ios-arrow-forward"
              d="M361.5,255.9l-100-93.2c-6.8-6.2-7.4-16.7-1.2-23.6c0.4-0.4,0.8-0.8,1.2-1.2   c7.6-6.8,19.1-6.8,26.8,0l113.3,105.5c6.8,6.2,7.4,16.8,1.2,23.6c-0.2,0.2-0.4,0.5-0.6,0.7L288.3,374.1c-7.6,6.8-19.2,6.8-26.8,0   c-6.8-6.2-7.4-16.7-1.2-23.6c0.4-0.4,0.8-0.8,1.2-1.2L361.5,255.9z"
            ></path>
            <path
              id="Icon_ionic-ios-arrow-forward-2"
              d="M210.4,255.9l-100-93.2c-6.8-6.2-7.4-16.7-1.2-23.6   c0.4-0.4,0.8-0.8,1.2-1.2c7.6-6.8,19.1-6.8,26.8,0l113.3,105.5c6.8,6.2,7.4,16.8,1.2,23.6c-0.2,0.2-0.4,0.5-0.6,0.7L137.3,374.1   c-7.6,6.8-19.2,6.8-26.8,0c-6.8-6.2-7.4-16.7-1.2-23.6c0.4-0.4,0.8-0.8,1.2-1.2L210.4,255.9z"
              fill="#ACACAC"
            ></path>
          </g>
        </svg>
      </a>

      {showFilter && <FilterNavOverlay overlayInDesktop filterData={filterData} />}

      <CardsContainer>
        <div className="relative grid size-full auto-rows-min grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <Card data={{ title: 'Total Revenue' }}>
            <TotalPriceCard />
          </Card>
          <Card data={{ title: 'Growth KPI' }}>
            <GrowthKPIPage />
          </Card>
          <Card data={{ title: 'Monthly revenue' }}>
            <MonthlyRevenueAndGainCard />
          </Card>
          <Card data={{ title: 'Total Charge' }}>
            <ChargeKPI />
          </Card>
        </div>
        <br></br>
        <div className="relative grid size-full auto-rows-min grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          <Card data={{ title: '% of clients per car type and requests type' }}>
            <CarClientsKPIChart filters={filters} />
          </Card>
          <Card data={{ title: 'Clients Percentage per Car Type and Request Type' }}>
            <ClientsPercentageChart filters={filters} />
          </Card>
          <Card data={{ title: 'Top 10 Benchmark Performances by Region' }}>
            <BenchmarkPerformanceChart filters={filters} />
          </Card>
        </div>
        <br></br>
        <div className="relative grid size-full auto-rows-min grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          <Card data={{ title: 'Most Popular requests' }}>
            <MostPopularRequestsChart filters={filters} />
          </Card>
          <Card data={{ title: 'Car retentation Rate over time' }}>
            <CarRentationRateLineChart filters={filters} />
          </Card>
          <Card data={{ title: 'Requests Per Offer' }}>
            <RequestsPerOfferChart filters={filters} />
          </Card>
        </div>
      </CardsContainer>
    </section>
  );
}
