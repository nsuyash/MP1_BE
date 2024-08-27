import {useState} from 'react'
import Header from '../components/Header'
import useFetch from '../useFetch'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'


const ProductsListing = () => {
  const {collectionName} = useParams()
  const location = useLocation();
  const navigate = useNavigate();

  const {data, loading} = useFetch(`https://mp-1-be-khaki.vercel.app/collection/${collectionName}${location.search}`)


  const [wishListChecked, setWishListChecked] = useState([])
  const [chevron, setChevron] = useState([true, true, false, false, false, true])


  const handleCheckboxChange = (filterKey, filterSpecification) => {
    const searchParams = new URLSearchParams(location.search)

    // Checked current filter specification is already in the URL
    const currentFilter = searchParams.get(filterKey)?.split(",") || []

    if(currentFilter.includes(filterSpecification)){

      // Remove the filter item if it's already selected
      const updateCurrentFilters = currentFilter.filter(specification => specification !== filterSpecification)

      if(updateCurrentFilters.length > 0){
        searchParams.set(filterKey, updateCurrentFilters.join(","));
      } else {
        searchParams.delete(filterKey)
      }
      
    } else {
      currentFilter.push(filterSpecification);
      searchParams.set(filterKey, currentFilter.join(","))
    }

    // Update the URL with the new query parameters
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }

  const handleClearAllFilters = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.forEach((_, key) => {
      searchParams.delete(key);
    });
    navigate(`${location.pathname}`);
  }



  const handleWishListChecked = (index) => {
    setWishListChecked((prev) => {
      const updatedList = [...prev];
      updatedList[index] = !updatedList[index];
      return updatedList;
    });
  }

  const handleChevrons = (index) => {
    setChevron((prev) => {
      const updatedChevron = [...prev];
      updatedChevron[index] = !updatedChevron[index]
      return updatedChevron
    })
  }

  return (
    <>
      <Header />
      <main style={{backgroundColor: "#eaf1ea"}}>
        <section className='text-dark pt-1' style={{backgroundColor: '#a9c5a0', fontSize: 14}}>
          <div className=' text-center'>
            <div className='row'> 
              {
                [{category: '50% off', path: '/'}, {category: 'Mobiles & Tablets', path: '/collection/mobiles&tablets'}, {category: 'Laptops', path: '/collection/laptops'}, {category: 'Tv & Appliances', path: '/'}, {category: 'Fashion', path: '/'}, {category: 'Furniture', path: '/'}].map((collectionType, index) => (
                    <div className="h6 col-md-2" key={index}><Link to={collectionType.path} style={{textDecoration: 'none', color: 'black'}}><span className="cXATEGORY">{collectionType.category}</span></Link></div>
                ))
              }               
            </div>
          </div>
        </section>
        <section>
          <div className='row pt-3 ms-1 me-3'>
            <>
                <div className='col-md-3'>
                  {
                    data && data.filters && (
                      <form className='bg-white shadow-sm pt-2'>
                        <p className='mx-3 pt-1'><strong className='h5'>Filters</strong> <span onClick={handleClearAllFilters} className='float-end text-primary pt-1' style={{fontSize: 12, cursor: 'pointer'}}><i className="bi bi-x"></i>CLEAR ALL</span></p>
                        <p style={{fontSize: 13, fontWeight: 500, color: "GrayText"}} className="ps-3"><i className="bi bi-chevron-left" style={{fontSize: 11}}></i> {collectionName}</p>
                        <hr style={{color: "gray"}} />
                        {
                          Object.entries(data['filters']).map(([key, value], index) => (
                            <section key={index}>
                              <div onClick={() => handleChevrons(index)} style={{cursor: 'pointer'}}>
                                <p className="px-3" style={{fontWeight: 500, fontSize: 14}}>{key.split("X").join(" ").toUpperCase()} <span className='float-end me-2'>{chevron[index] ? <i className="bi bi-chevron-down"></i> : <i className="bi bi-chevron-up"></i>}</span></p>
                              </div>
                              {
                                chevron[index] && (
                                  <div className='ms-4'>
                                    {
                                      value.map((specification, index) => (
                                        <div key={index} className='pb-2'>
                                          <label htmlFor={`${specification}-${key}`}><input type='checkbox' id={`${specification}-${key}`} onChange={() => handleCheckboxChange(key, specification)} checked={new URLSearchParams(location.search).get(key)?.split(',').includes(specification) || false} /> <span style={{fontSize: 13}}>{specification}</span></label><br />
                                        </div>
                                      ))
                                    }                                  
                                  </div>
                                )
                              }
                              <hr style={{color: "gray"}} />
                            </section>
                          ))
                        }
                      </form>
                    )
                  }
                </div>
                <div className='bg-white col-md-9'>
                  {
                    loading ? 
                    <div className='d-flex justify-content-center align-items-center bg-opacity-25 bg-white' style={{ height: '500px' }}>
                      <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div> :
                    data && data?.products && data?.products?.length > 0 ? (
                      <>
                        <p className='pt-3 ps-2'>{data?.products?.collectionType?.split("&").join(" & ").toUpperCase()} <small>(Showing 1 – {data && data.products.length} products of {data && data.products.length} products)</small></p>
                        {
                          data.products.map((item, index) => (
                            <div className='row  pb-2' id='itemxlist' key={index}>
                              <hr style={{color: "gray"}} />
                              <div className='col-md-3 ps-4'>
                                <img style={{width: '180px', maxHeight: '250px',objectFit: 'cover', objectPosition: 'top'}} className='img-fluid' src={item.productImageUrl} />
                              </div>
                              <div className='col-md-5'>
                                <div className='ps-3' style={{width: "20rem"}}>
                                  <h6 id='ixTEMNXAME' style={{fontSize: 15}}>{item.modelName} {item.modelSubContent}</h6>
                                  <p style={{fontSize: 13}}><span className='text-bold rounded text-white' style={{padding: '0.2rem 0.5rem 0.2rem 0.5rem', backgroundColor: '#388e3c'}}>{item.rating} ★</span></p>
                                </div>
                                <ul style={{fontSize: 14, width: "20rem"}}>
                                  {item.highlights.map((content, index) => (
                                    <li key={index} style={{color: 'lightgray', paddingTop: '0.3rem'}}><span className='text-dark'>{content}</span></li>
                                  ))}
                                </ul>
                              </div>
                              <div className='col-md-4'>
                                <p>
                                  <span style={{fontSize: 24, fontWeight: 600, lineHeight: 1}}>₹{(item.mrp - (item.mrp * (item.discount / 100))).toFixed(0).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</span><br />
                                  <s>₹{(item.mrp).toFixed(0).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</s> <span className='text-success' style={{fontWeight: 500}}>{item.discount}% off</span><br /><br />
                                  <span className='bg-success text-light py-1 px-2'>Saved upto ₹{(item.mrp * (item.discount / 100)).toFixed(0).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</span>
                                  <sup style={{top: '-4.5rem', right: '-3rem', color: `${wishListChecked[index] ? 'red' : 'lightgray'}`, cursor: 'pointer'}} onClick={() => handleWishListChecked(index)}><i className="bi bi-heart-fill fs-5" ></i></sup>
                                </p><br />
                                <button className='btn btn-dark me-2 btn-sm'>Add to Cart</button>
                                <button className='btn btn-warning btn-sm'>Buy Now</button>
                              </div>
                            </div>
                          ))
                        }
                        <hr style={{color: "gray"}} />
                      </>
                    ) : <div className='text-center py-5 px-5'><img src='/notFound.svg' className='img-fluid' style={{width: 400}} />
                      <p className='fs-2 pt-3'>No such product found.</p></div>
                  }
                </div>
              </>
          </div>
        </section>
      </main>
    </>
  )
}

export default ProductsListing;