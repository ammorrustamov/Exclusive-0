import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Heart, ShoppingCart,  } from 'lucide-react';
import { CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { RiLinkedinLine } from "react-icons/ri";
import oqbola from"../../assets/oqbola.png"
import opa from"../../assets/opa.png"
import sariq from"../../assets/sariq.png"
import qr from "../../assets/QR.png"; 
import google from "../../assets/GooglePlay.png";
import apple from "../../assets/AppStore.png";
import "./About.css"
import o from"../../assets/o.png"
import icon from"../../assets/icon.png"
import d from"../../assets/d.png"
import s from"../../assets/s.png"
import x from"../../assets/x.png"
import { User, ShoppingBag, XCircle, Star, LogOut } from 'lucide-react';

const About = () => {
  return (
    <div>
      <div className="Navbar">
        <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!   <spam>ShopNow</spam></p>
        <button className='en'>English</button>
      </div>

      <nav className="header-nav">
        <div className='ul-div '>
          <h1 className='ex'>Exclusive</h1>

          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/Contact"}>Contact</Link></li>
            <li><Link to={"/About"}>About</Link></li>
            <li><Link to={"/SignUp"}>Sign Up</Link></li>
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
            <Heart size={24} strokeWidth={1.5} />
            <span className="badge">0</span>
          </button>
          
          <button className="icon-link" aria-label="Cart">
            <ShoppingCart size={24} strokeWidth={1.5} />
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
    
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        marginLeft: "100px", 
        marginTop: "80px"
      }}>
        <span style={{ color: "#00000080" }}>Home /</span>
        <span style={{ marginLeft: "5px", fontWeight: "500" }}>About</span>
      </div>
    
      <div className='dis'>
        <div className='Our'>
          <h2>Our Story</h2>
          <h4 className='nimadir77'>
            Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. 
          </h4>
          <h4>
            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
          </h4>
        </div>

        <div className='div-img'>
          <img src={o} alt="chiqmadimi mol" />
        </div>
      </div>

      <div className='bilmadim'>
        <div className='div-iconlar'> 
          <img className='icon-img' src={icon} alt="chq" />
          <h2>10.5k</h2>
          <p>Sallers active our site</p>
        </div>

        <div className='div-iconlar'> 
          <img className='icon-img' src={d} alt="chq" />
          <h2>33k</h2>
          <p>Mopnthly Produduct Sale</p>
        </div>

        <div className='div-iconlar'> 
          <img className='icon-img' src={s} alt="chq" />
          <h2>45.5k</h2>
          <p>Customer active in our site</p>
        </div>

        <div className='div-iconlar'> 
          <img className='icon-img' src={x} alt="chq" />
          <h2>25k</h2>
          <p>Anual gross sale in our site</p>
        </div>
      </div>
    
      <div className='kata-div'>
        <div className='tom'>
          <img className='oqbola' src={oqbola} alt="" />
          <h2>Tom Cruise</h2>
          <p>Founder & Chairman</p>
          <CiTwitter />
          <IoLogoInstagram />
          <RiLinkedinLine />
        </div>

        <div className='tom'>
          <img className='oqbola' src={opa} alt="" />
          <h2>Emma Watson</h2>
          <p>Managing Director</p>
          <CiTwitter />
          <IoLogoInstagram />
          <RiLinkedinLine />
        </div>

        <div className='tom'>
          <img className='oqbola' src={sariq} alt="" />
          <h2>Will Smith</h2>
          <p>Managing Director</p>
          <CiTwitter />
          <IoLogoInstagram />
          <RiLinkedinLine />
        </div>
      </div>
    
      <div className="services-container">
        <div className="service-card">
          <div className="icon-wrapper">
            <div className="icon-circle-outer">
              <div className="icon-circle-inner">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              </div>
            </div>
          </div>
          <h3 className="service-title">FREE AND FAST DELIVERY</h3>
          <p className="service-desc">Free delivery for all orders over $140</p>
        </div>

        <div className="service-card">
          <div className="icon-wrapper">
            <div className="icon-circle-outer">
              <div className="icon-circle-inner">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
              </div>
            </div>
          </div>
          <h3 className="service-title">24/7 CUSTOMER SERVICE</h3>
          <p className="service-desc">Friendly 24/7 customer support</p>
        </div>

        <div className="service-card">
          <div className="icon-wrapper">
            <div className="icon-circle-outer">
              <div className="icon-circle-inner">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
              </div>
            </div>
          </div>
          <h3 className="service-title">MONEY BACK GUARANTEE</h3>
          <p className="service-desc">We return money within 30 days</p>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h3>Exclusive</h3>
            <h4>Subscribe</h4>
            <p>Get 10% off your first order</p>

            <div className="subscribe-box">
              <input type="email" placeholder="Enter your email" />
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
  )
}

export default About
