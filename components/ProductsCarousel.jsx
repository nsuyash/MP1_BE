import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useFetch from '../useFetch';

const ProductsCarousel = () => {
  const [chevronForBrand, setChevronForBrand] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, loading } = useFetch(`https://a5c4ed0d-89f5-43e8-b9c5-bd0b5cefd40e-00-1s34rdmxqcno2.pike.replit.dev/products${location.search}`);
  const filters = data?.filters ? Object.keys(data.filters) : [];

  if(data){
    console.log(data)
  }

  const handleCheckboxChange = (filterCategory, filterItem) => {
    const searchParams = new URLSearchParams(location.search);

    // Check if the current filter item is already in the URL
    const currentFilters = searchParams.get(filterCategory)?.split(',') || [];
    
    if (currentFilters.includes(filterItem)) {
      
      // Remove the filter item if it's already selected
      const updatedFilters = currentFilters.filter(item => item !== filterItem);
      
      if (updatedFilters.length > 0) {
        searchParams.set(filterCategory, updatedFilters.join(','));
      } else {
        searchParams.delete(filterCategory);
      }
    } else {
      // Add the filter item
      currentFilters.push(filterItem);
      searchParams.set(filterCategory, currentFilters.join(','));
    }

    // Update the URL with the new query parameters
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <>
      <div>
        {
          filters.length > 0 ? (
            filters.map((filter, idx) => (
              <div key={idx}>
                <hr style={{ color: "gray" }} />
                <section className='ps-3' style={{ fontSize: "13px" }}>
                  <div onClick={() => setChevronForBrand(!chevronForBrand)} id='pXOINTERSXET'>
                    <p style={{ fontWeight: 500 }}>{filter.toUpperCase()} 
                      <span className='float-end me-2'>
                        {chevronForBrand ? <i className="bi bi-chevron-down"></i> : <i className="bi bi-chevron-up"></i>}
                      </span>
                    </p>
                  </div>
                  <div className='ps-3'>
                    {
                      chevronForBrand && (
                        <div>
                          {
                            data.filters[filter].map((filterItem, index) => (
                              <div key={index}>
                                <label htmlFor={`${filter}-${filterItem}`}>
                                  <input 
                                    type="checkbox" 
                                    id={`${filter}-${filterItem}`} 
                                    onChange={() => handleCheckboxChange(filter(key), filterItem(values))} 
                                    checked={new URLSearchParams(location.search).get(filter)?.split(',').includes(filterItem) || false}
                                  /> 
                                  <span className='ps-2'>{filterItem}</span>
                                </label>
                                <br />
                              </div>
                            ))
                          }
                        </div>
                      )
                    }
                  </div>
                </section>
              </div>
            ))
          ) : loading && <p>Loading...</p>
        }
      </div>
    </>
  );
};

export default ProductsCarousel;
