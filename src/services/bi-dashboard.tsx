import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getGrowthKPI = async () => {
  try {
    const response = await apiClient.get('/growth_kpi/');

    return response.data;
  } catch (error) {
    console.error('Error fetching growth KPI:', error);
    throw error;
  }
};

export const getChargeKPI = async (params: URLSearchParams) => {
  try {
    const response = await apiClient.get('/charge_kpi/');

    return response.data;
  } catch (error) {
    console.error('Error fetching charge KPI:', error);
    throw error;
  }
};

export const getCarClientsKPI = async (params = {}) => {
  try {
    const response = await apiClient.get('/car_clients_kpi/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching car clients KPI:', error);
    throw error;
  }
};

export const getMostPopularRequests = async (params = {}) => {
  try {
    const response = await apiClient.get('/most_popular_requests/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching most popular requests:', error);
    throw error;
  }
};

export const getFactRequestGain = async (params = {}) => {
  try {
    const response = await apiClient.get('/factrequests/gain', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching fact request gain:', error);
    throw error;
  }
};

export const getBrandGains = async (params = {}) => {
  try {
    const response = await apiClient.get('/brand-gains/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching brand gains:', error);
    throw error;
  }
};

export const getCarRentationRateOvertime = async (params = {}) => {
  try {
    const response = await apiClient.get('/car_rentation_rate_overtime', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching car rentation rate overtime:', error);
    throw error;
  }
};

export const getRequestsPerOffer = async (params = {}) => {
  try {
    const response = await apiClient.get('/requests_per_offer/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching requests per offer:', error);
    throw error;
  }
};

export const getClientsPercentagePerCarTypeAndRequestType = async (params = {}) => {
  try {
    const response = await apiClient.get('/clients_percentage_per_car_type_and_request_type/', {
      params
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching clients percentage per car type and request type:', error);
    throw error;
  }
};

export const getBenchmarkPerformanceByRegion = async (params = {}) => {
  try {
    const response = await apiClient.get('/benchmark_performance_by_region/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching benchmark performance by region:', error);
    throw error;
  }
};

export const getTotalAmountAndPercentageGainPerMonth = async (params = {}) => {
  try {
    const response = await apiClient.get('/total_amount_and_percentage_gain_per_month/', {
      params
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching total amount and percentage gain per month:', error);
    throw error;
  }
};

export const getRevenueByOfferAndDate = async (params = {}) => {
  try {
    const response = await apiClient.get('/revenue_by_offer_and_date/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching revenue by offer and date:', error);
    throw error;
  }
};

export const getMostRevenueGeneratingCountries = async (params = {}) => {
  try {
    const response = await apiClient.get('/most_revenue_generating_countries/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching most revenue generating countries:', error);
    throw error;
  }
};

export const getRevenueOverTimePerBenchmark = async (params = {}) => {
  try {
    const response = await apiClient.get('/revenue_over_time_per_benchmark/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching revenue over time per benchmark:', error);
    throw error;
  }
};

export const getCarProfitabilityKPI = async (params = {}) => {
  try {
    const response = await apiClient.get('/car_profitability_kpi/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching car profitability KPI:', error);
    throw error;
  }
};

export const getProfitTotalAndOtherCharges = async (params = {}) => {
  try {
    const response = await apiClient.get('/profit_total_and_other_charges/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching profit and charges data:', error);
    throw error;
  }
};
export const getTopPickupPlaces = async (params = {}) => {
  try {
    const response = await apiClient.get('/top_pickup_places/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching top pickup places data:', error);
    throw error;
  }
};

export const getTopDropoffPlaces = async (params = {}) => {
  try {
    const response = await apiClient.get('/top_dropoff_places/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching top dropoff places data:', error);
    throw error;
  }
};
export const getMonthlyRevenueAndGain = async (params = {}) => {
  try {
    const response = await apiClient.get('/monthly_revenue_and_gain/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching monthly revenue and gain:', error);
    throw error;
  }
};

export const getCarImage = async (params = {}) => {
  try {
    const response = await apiClient.get('/car/image', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching car image:', error);
    throw error;
  }
};
export const getTotalPrice = async (params = {}) => {
  try {
    const response = await apiClient.get('/total_price/', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching total price:', error);
    throw error;
  }
};

export const FetchSlug = async () => {
  try {
    const response = await apiClient.get('/filters/car-types');

    return response.data;
  } catch (error) {
    console.error('Error fetching total price:', error);
    throw error;
  }
};

export const FetchDates = async () => {
  try {
    const response = await apiClient.get('/filters/dates');

    return response.data;
  } catch (error) {
    console.error('Error fetching total price:', error);
    throw error;
  }
};

export const FetchDests = async () => {
  try {
    const response = await apiClient.get('/filters/dests');

    return response.data;
  } catch (error) {
    console.error('Error fetching total price:', error);
    throw error;
  }
};

