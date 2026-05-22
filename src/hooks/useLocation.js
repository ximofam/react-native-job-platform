import { useState } from 'react';
import { getCitiesApi, getDistrictsApi } from '../apis/services/locationService';

export default function useLocations() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const loadCities = async () => {
    try {
      setLoadingCities(true);

      const data = await getCitiesApi();

      setCities(data);
    } finally {
      setLoadingCities(false);
    }
  };

  const loadDistricts = async (cityId) => {
    try {
      setLoadingDistricts(true);

      const data = await getDistrictsApi(cityId);

      setDistricts(data);
    } finally {
      setLoadingDistricts(false);
    }
  };

  return {
    cities,
    districts,
    loadingCities,
    loadingDistricts,
    loadCities,
    loadDistricts,
  };
}