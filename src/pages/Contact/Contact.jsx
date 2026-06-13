import React, { useState } from 'react';
import "./Contact.css";
import { Phone, Mail, Search, Heart, ShoppingCart, } from 'lucide-react';
import { Link } from 'react-router-dom';
import qr from "../../assets/QR.png"; 
import google from "../../assets/GooglePlay.png";
import apple from "../../assets/AppStore.png";
import { User, ShoppingBag, XCircle, Star, LogOut } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";

const BOT_TOKEN = "8469473869:AAHGSZKX-ysT4NzPz0M1Wiv1inYVeUBpoPA";
const CHAT_ID = "8513337432"; 

const Contact = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const sendMessage = async (e) => {
    e.preventDefault();

    const text = `
📩 New Contact Message

👤 Name: ${form.name}
📧 Email: ${form.email}
📞 Phone: ${form.phone}

📝 Message:
${form.message}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text
        })
      });

      alert("Message Telegramga yuborildi ✅");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      alert("Xatolik yuz berdi ❌");
    }
  };

  return (
    <>
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
         <span style={{ marginLeft: "5px", fontWeight: "500" }}>Contact</span>
       </div>

      {/* CONTACT */}
      <div className="contact-container">

        {/* LEFT */}
        <div className="contact-info">
          <div>
            <Phone /> <b>Call To Us</b>
            <p>+8801611112222</p>
          </div>
          <hr />
          <div>
            <Mail /> <b>Write To Us</b>
            <p>customer@exclusive.com</p>
            <p>support@exclusive.com</p>
          </div>
        </div>

        {/* FORM */}
        <form className="contact-form" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Your Name *"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Your Email *"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="tel"
            placeholder="Your Phone *"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            required
          />

          <textarea
            placeholder="Your Message"
            rows="6"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
          />

          <button type="submit" className="send-btn">
            Send Message
          </button>
        </form>
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




    </>
  );
};

export default Contact;
