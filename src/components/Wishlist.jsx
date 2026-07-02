import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../redux/ShopSlice';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart,  Trash2, Eye } from 'lucide-react';
import "./Wishlist.css";
import { User, ShoppingBag, XCircle, Star, LogOut } from 'lucide-react';
import { deleteLike } from "../server/like";
import qr from "../assets/QR.png"; 
import google from "../assets/GooglePlay.png";
import apple from "../assets/AppStore.png";

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.shop.wishlist);

    return (
        <div className='wishlist-page'>
           <div className="Navbar">
               <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!   <span>ShopNow</span></p>
               <button className='en'>English</button>
             </div>
       <nav className="header-nav">
                 <div className='ul-div '>
       
       <h1 className='ex'>
         Exclusive
       </h1>
       <ul>
         <li>
       <Link to={"/"}>Home</Link>
         </li>
           <li>
        <Link to={"/Contact"}>Contact</Link>
         </li>
           <li>
         <Link  to={"/About"}>About</Link>
         </li>
           <li>
       <Link to={"/SignUp"}>Sign Up</Link>
         </li>
       </ul>
       
             </div>
       
             <div className="search-container">
               <input 
                 type="text" 
                 placeholder="What are you looking for?" 
                 className="search-input"
               />
               <Search className="search-icon" size={20} strokeWidth={1.5} />
           
             </div>
       
             <div className="nav-icons">
               <button className="icon-link" aria-label="Wishlist">
                       <Link to={'/Wishlist'}>
                         <Heart size={24} strokeWidth={1.5} />
             
                  
                   <span>
                       {/* {Wishlistlength}/ */}
                   </span>
               </Link>
                 
                 <span className="badge">0</span>
               </button>
               
               <button className="icon-link" aria-label="Cart">
                  <Link to={'/Cart'}>
                 <ShoppingCart size={24} strokeWidth={1.5} />
                  
                   <span>
                       {/* {cartlength} */}
                   </span>
               </Link>
                 <span className="badge">0</span>
               </button>
         <div className="user-menu-wrapper">
      {/* Qizil profil tugmasi */}
      <div className="profile-trigger">
        <User size={20} color="white" />
      </div>

      {/* Hoverda chiqadigan menyu */}
      <div className="dropdown-container">
        <div className="dropdown-content">
          <a href="/account" className="menu-item">
            <User size={18} /> <span>Manage My Account</span>
          </a>
          <a href="/orders" className="menu-item">
            <ShoppingBag size={18} /> <span>My Order</span>
          </a>
          <a href="/cancellations" className="menu-item">
            <XCircle size={18} /> <span>My Cancellations</span>
          </a>
          <a href="/reviews" className="menu-item">
            <Star size={18} /> <span>My Reviews</span>
          </a>
          <a href="/logout" className="menu-item">
            <LogOut size={18} /> <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
           
             </div>
           </nav>
            <main className="container">
                <section className="wishlist-section">
                    <div className="section-header">
                        <h3>Wishlist ({wishlistItems.length})</h3>
                        <button className="secondary-btn">Move All To Bag</button>
                    </div>
                    <div className="product-grid">
                        {wishlistItems.map((item) => (
                            <div className="product-card" key={item.id}>
                                <div className="card-image">
                                    {item.discount && <span className="discount-tag">-{item.discount}%</span>}
<button
  className="action-btn delete"
  onClick={async () => {
    try {
      await deleteLike(item.id);
      dispatch(removeFromWishlist(item.id));
    } catch (error) {
      console.log("Delete Like Error:", error);
    }
  }}
>
  <Trash2 size={18} />
</button>
                                    <img src={item.image} alt={item.title} />
                                    <button className="add-to-cart-btn">
                                        <ShoppingCart size={18} /> Add To Cart
                                    </button>
                                </div>
                                <div className="card-info">
                                    <h4>{item.title}</h4>
                                    <div className="price-tag">
                                        <span className="current-price">${item.price}</span>
                                        {item.oldPrice && <span className="old-price">${item.oldPrice}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Just For You Section */}
                <section className="recommendation-section">
                    <div className="section-header">
                        <div className="title-block">
                            <div className="red-rect"></div>
                            <h3>Just For You</h3>
                        </div>
                        <button className="secondary-btn">See All</button>
                    </div>
                    <div className="product-grid">
                    </div>
                </section>
            </main>

     <footer className="footer">
          <div className="footer-container">
    
            <div className="footer-col">
              <h3>Exclusive</h3>
              <h4>Subscribe</h4>
              <p>Get 10% off your first order</p>
    
              <div className="subscribe-box">
                <input type="email" placeholder="Enter your email" />
                {/* <img src={send} alt="send" /> */}
              </div>
            </div>
    
            <div className="footer-col">
              <h3>Support</h3>
              <p>111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.</p>
              <p>exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
    
            <div className="footer-col">
              <h3>Account</h3>
            
                <li>My Account</li>
                <li>Login / Register</li>
                <li>Cart</li>
                <li>Wishlist</li>
                <li>Shop</li>
             
            </div>
    
            <div className="footer-col">
              <h3>Quick Link</h3>
         
                <li>Privacy Policy</li>
                <li>Terms Of Use</li>
                <li>FAQ</li>
                <li>Contact</li>
           
            </div>
    
      
            <div className="footer-col">
              <h3>Download App</h3>
              <span className="save-text">Save $3 with App New User Only</span>
    
              <div className="app-box">
                <img src={qr} alt="qr" className="qr" />
                <div className="stores">
                  <img src={google} alt="google play" />
                  <img src={apple} alt="app store" />
                </div>
              </div>
    
           
            </div>
    
          </div>
    
          <div className="footer-bottom">
            © Copyright Rimel 2022. All right reserved
          </div>
        </footer>
        </div>
    );
}

export default Wishlist;