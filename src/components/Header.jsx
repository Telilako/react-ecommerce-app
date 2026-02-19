import logoWhite from '../assets/images/logo-white.png';
import mobileLogoWhite from '../assets/images/mobile-logo-white.png';
import searchIcon from '../assets/images/icons/search-icon.png';
import cartIcon from '../assets/images/icons/cart-icon.png';
import {NavLink,useNavigate, useSearchParams} from 'react-router';
import {useState,useEffect} from 'react';
import './Header.css';
export function Header({cart}){
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";
   const [search, setSearch] = useState(searchFromUrl);
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity+=cartItem.quantity;
  }) 

  useEffect(() => {
    setSearch(searchFromUrl);
  },[searchFromUrl]);
  const handleSearch = (event) => {
    event.preventDefault();
    if(search) {
      navigate(`/?search=${search}`);
    } else{
      navigate("/");
    }
  }
  return(
  <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo"
              src= {logoWhite} />
            <img className="mobile-logo"
              src= {mobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
         <form onSubmit= {handleSearch}>
           <input value= {search} onChange ={(event) =>{
            setSearch(event.target.value)
          }} className="search-bar" type="text" placeholder="Search" />

          <button onClick = { () =>{
              navigate(`/?search=${search}`)
            }} className="search-button">
            <img className="search-icon" src= {searchIcon} />
          </button>
         </form>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src= {cartIcon}/>
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </ NavLink>
        </div>
      </div>
  )
}