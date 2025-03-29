import React, { useState } from 'react';
import PropertySearchBar from '../../components/PropertySearchBar';
import PropertyListings2 from '../../components/Propety-listings2';

const PropertyPublic = () => {
  const [filters, setFilters] = useState({
    searchType: 'rent',
    propertyType: 'All Types',
    keyword: '',
    page: 1,
  });
  return (
    <div>
      <PropertySearchBar
        filters={filters}
        setFilters={setFilters}
      />
      <PropertyListings2
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default PropertyPublic;