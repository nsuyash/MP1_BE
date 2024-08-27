import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header className="shadow sticky-top bg-white">
        <nav className="navbar" style={{ height: "70px" }}>
          <section className="container">
            <div>
              <Link className="navbar-brand" to='/'>
                <img src="/near_market_logo.svg" alt="Logo" className="d-inline-block align-text-top" style={{ height: "60px" }} />
              </Link>
            </div>
            <div className="border rounded" style={{backgroundColor: "#eaf1ea"}}>
              <button style={{ backgroundColor: "#eaf1ea", border: "none" }} className="py-2 px-3">
                <i className="bi bi-search"></i>
              </button>
              <input type="search" placeholder="Search for Products, Category & More" className="pe-2" style={{border: "none", width: "400px", height: "20px", outline: "none", backgroundColor: "#eaf1ea"}}/>
            </div>
            <div className='ms-2'>
              <i className="bi bi-heart pe-4" style={{ fontSize: "1.5rem" }}><sup className="rounded-circle px-1 text-light" style={{fontSize: "10px", backgroundColor: "red", top: "-1rem"}}>0</sup></i>
              <i className="bi bi-cart2" style={{ fontSize: "1.7rem" }}><sup className="rounded-circle px-1 text-light" style={{fontSize: "10px", backgroundColor: "red", top: "-1rem"}}>0</sup></i>
            </div>
          </section>
        </nav>
      </header>
    </>
  );
};

export default Header;
