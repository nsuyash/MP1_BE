import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import ProductsCarousel from '../components/ProductsCarousel'
import useFetch from '../useFetch'
import {Link} from 'react-router-dom'


const BestDeals = ({data, brandName}) => {

  return (
    <>
      {
        data && data.filter(item => (item.collectionType === "mobiles&tablets" || item.collectionType === "laptops") && item.features['brand'] === brandName).slice(0,2).map((item, index) => (
          <div className='col-md-2' key={index}>
            <div className='card text-center'>
              <img src={item.productImageUrl} className='card-img-top px-3 pt-3 img-fluid' alt='productImage' />
              <div className='card-body'>
                <span style={{fontSize: "12px", lineHeight: 1}}>{item.modelName}</span>
                <h6>From ₹{(item.mrp - (item.mrp * (item.discount / 100))).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}* <s>{(item.mrp).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</s></h6> 
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}


export default function App() {
  const apiUrl = useFetch("https://mp-1-be-khaki.vercel.app/products")

  return (
    <>
      <div className="bg-dark" style={{height: "5px"}}></div>
      <Header />
      <br />
      <main>     
        <Carousel />
        <section className='my-5 text-center mx-3'>
          <div className='row'>
            {
              [{src: 'discount.svg', route: '/'}, {src: 'mobile&tab.svg', route: '/collection/mobiles&tablets'}, {src: 'laptop.svg', route: '/collection/laptops'}, {src: 'tv&washingMachine.svg', route: '/'}, {src: 'fashion.svg', route: '/'}, {src: 'furniture.svg', route: '/'}].map((category, index) => (
                <div className='col-md-2' key={index}>
                  <Link to={category.route} style={{textDecoration: 'none', color: 'black'}}>
                    <img style={{ width: "150px", height: "150px" }} className='img-fluid' src={`/${category.src}`} alt={`Category-${category.src.slice(0, category.src.length - 4)}`} />
                    <h6>{['Top Offer', 'Mobile & Tab', 'Laptops', 'Tv & Appliances', 'Fashion', 'Furniture'][index]}</h6>
                  </Link>
                </div>
              ))
            }
          </div>
        </section>
        <section className='mb-5 mx-5'>
          <h3 className='mb-4'>Best Deals on Smartphones<span className='float-end' style={{color: "#a9c5a0"}}><i className="bi bi-arrow-right-circle-fill"></i></span></h3>
          <div className='row'>
            {
              apiUrl && apiUrl.data && (
                <>
                  {
                    ['SAMSUNG', 'REDMI', 'Apple'].map((brand, index) => (
                      <BestDeals key={index} data={apiUrl.data} brandName={brand} />
                    ))
                  }
                </>
              )
            }
          </div>
        </section>
        <section className='mx-5 mb-3'>
          <div className='row'>
            {
              ['samsungLimitedOfferCard.gif', 'redmiLimitedOfferCard.gif', 'appleLimitedOfferCard.gif'].map((path, index) => (
                <div className='col-md-4' key={index}>
                  <img src={`/${path}`} className='img-fluid' alt='Limited-Offers-Card' />
                </div>
              ))
            }
          </div>
        </section><br />
        <section className='mb-5 mx-5'>
          <h3 className='mb-4'>Best Deals on Laptops<span className='float-end' style={{color: "#a9c5a0"}}><i className="bi bi-arrow-right-circle-fill"></i></span></h3>
          <div className='row'>
            {
              apiUrl && apiUrl.data && (
                <>
                  {
                    ['ASUS', 'HP', 'Lenovo'].map((brand, index) => (
                      <BestDeals key={index} data={apiUrl.data} brandName={brand} />
                    ))
                  }
                </>
              )
            }
          </div>
        </section>
        <section className='mx-5 mb-3'>
          <div className='row'>
            {
              ['asusLimitedOfferCard.gif', 'lenovoLimitedOfferCard.gif', 'hpLimitedOfferCard.gif'].map((path, index) => (
                <div className='col-md-4' key={index}>
                  <img src={`/${path}`} className='img-fluid' alt='Limited-Offers-Card' />
                </div>
              ))
            }
          </div>
        </section><br />
        <section className='mx-5 mb-5'>
          <img src='/topSellingSmartphone.gif' className='rounded img-fluid' alt='Top Selling Smartphone Offer'/>
        </section>
      </main>
    </>
  )
}
