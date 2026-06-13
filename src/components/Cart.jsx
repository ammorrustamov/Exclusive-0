import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/ShopSlice';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, ShoppingBag, XCircle, Star, LogOut, X } from 'lucide-react';
import "./Cart.css";
import qr from "../assets/QR.png"; 
import google from "../assets/GooglePlay.png";
import apple from "../assets/AppStore.png";
import { deleteCart } from "../server/Cart";
const Cart = () => {

  //
  const handleDelete = async (id) => {
  try {
    await deleteCart(id);
    dispatch(removeFromCart(id));
  } catch (error) {
    console.log(error);
  }
};
  //
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.shop.cart);
    const wishlistLength = useSelector(state => state.shop.wishlist.length);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    return (
        <div className='cart-page'>
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
                             </span>
                         </Link>
                           
                           <span className="badge">0</span>
                         </button>
                         
                         <button className="icon-link" aria-label="Cart">
                            <Link to={'/Cart'}>
                           <ShoppingCart size={24} strokeWidth={1.5} />
                            
                             <span>
                             </span>
                         </Link>
                           <span className="badge">0</span>
                         </button>
                   <div className="user-menu-wrapper">
                {/* Qizil profil tugmasi */}
                <div className="profile-trigger">
                  <User size={20} color="white" />
                </div>
          
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
                <div className="breadcrumb">
                    <Link to="/">Home</Link> / <span>Cart</span>
                </div>

                {cartItems.length < 1 ? (
                    <div className="empty-cart">
                        <p>Savatda mahsulotlar yo'q</p>
                        <Link to="/" className="return-btn">Do'konga qaytish</Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-table">
                            <div className="table-header">
                                <span>Product</span>
                                <span>Price</span>
                                <span>Quantity</span>
                                <span>Subtotal</span>
                            </div>

                            {cartItems.map((item) => (
                                <div className="table-row" key={item.id}>
                                    <div className="product-info">
                                        <div className="img-wrapper">
                                            <img src={item.image} alt={item.title} />
<button
  className="remove-item"
  onClick={() => handleDelete(item.id)}
>
  <X size={12} />
</button>
                                        </div>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className="price">${item.price}</div>
                                    <div className="quantity">
                                        <input type="number" defaultValue={item.quantity || 1} min="1" />
                                    </div>
                                    <div className="subtotal">${item.price * (item.quantity || 1)}</div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-actions">
                            <Link to="/" className="secondary-btn">Return To Shop</Link>
                            <button className="secondary-btn">Update Cart</button>
                        </div>

                        <div className="cart-bottom">
                            <div className="coupon-section">
                                <input type="text" placeholder="Coupon Code" />
                                <button className="primary-btn">Apply Coupon</button>
                            </div>

                            <div className="cart-total-card">
                                <h3>Cart Total</h3>
                                <div className="total-row">
                                    <span>Subtotal:</span>
                                    <span>${subtotal}</span>
                                </div>
                                <div className="total-row">
                                    <span>Shipping:</span>
                                    <span>Free</span>
                                </div>
                                <div className="total-row final">
                                    <span>Total:</span>
                                    <span>${subtotal}</span>
                                </div>
                                <button className="primary-btn checkout">Process to checkout</button>
                            </div>
                        </div>
                    </>
                )}
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
};

export default Cart;