import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import { setSearchQuery } from "../../redux/ShopSlice.js";
import { BsCart2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { User, ShoppingBag, XCircle, Star, LogOut } from 'lucide-react';
import iphone from"../../assets/iphone.png"
import Categores from"../../assets/Categores.png"
import { IoIosPhonePortrait } from "react-icons/io";
import { BsSmartwatch } from "react-icons/bs";
import { getProducts, createProduct as createProductApi } from "../../server/Product.js";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { CiCamera } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";
import { LuGamepad } from "react-icons/lu";
// import image1 from"../../assets/image1.png"
// import image2 from"../../assets/image2.png"
import qr from "../../assets/QR.png"; 
import google from "../../assets/GooglePlay.png";
import apple from "../../assets/AppStore.png";
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, } from 'lucide-react';
import { Cart } from '../../redux/ShopSlice.js';
import { Wishlist } from '../../redux/ShopSlice.js';
import { toast } from "react-toastify";
import { Pagination } from 'swiper/modules';
import '../../i18n.js'; 
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from "swiper/react";
import ProductSwiper from '../ProductSwiper.jsx';
import { createLike } from "../../server/like";
import { addToCart } from "../../server/Cart.js";
import axios from "axios";
import { getCategories } from "../../server/Category";
import { getImgs } from "../../server/img.js";

const HomePage = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  if (storedUser && token) {
    setIsLoggedIn(true);
    setUser(JSON.parse(storedUser));
  }
}, []);

const [images, setImages] = useState([]);
useEffect(() => {
  axios.get("http://localhost:3000/img")
    .then((res) => setImages(res.data))
    .catch((err) => console.log(err));
}, []);


const [categories, setCategories] = useState([]);
const [backendProducts, setBackendProducts] = useState([]);
  //
const [days, setDays] = useState(3);
const [hours, setHours] = useState(23);
const [minutes, setMinutes] = useState(19);
const [seconds, setSeconds] = useState(56);



const [showModal, setShowModal] = useState(false);
const [showLoginModal, setShowLoginModal] = useState(false);
const [loginUsername, setLoginUsername] = useState("");
const [loginPassword, setLoginPassword] = useState("");

const [customProduct, setCustomProduct] = useState({
  title: "",
  price: "",
  oldPrice: "",
  image: "",
  rating: "",
});

const [customProducts, setCustomProducts] = useState([]);

useEffect(() => {
  loadCategories();
  loadProducts();
}, []);

const loadCategories = async () => {
  try {
    const res = await getCategories();
    setCategories(res.data);
  } catch (error) {
    console.log(error);
  }
};

const loadProducts = async () => {
  try {
    const res = await getProducts();
    setBackendProducts(res.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
//
  //
  const savedProducts =
    JSON.parse(localStorage.getItem("customProducts")) || [];

  setCustomProducts(savedProducts);
}, []);
const handleView = (productId) => {
  navigate(`/product/${productId}`);
};

const handleInputChange = (e) => {
  setCustomProduct({
    ...customProduct,
    [e.target.name]: e.target.value,
  });
};

const handleLoginSubmit = (e) => {
  e.preventDefault();

  if (loginUsername === "admin" && loginPassword === "admin2010") {
    const adminUser = { id: 1, username: "admin", email: "admin@example.com" };
    setIsLoggedIn(true);
    setUser(adminUser);
    localStorage.setItem('user', JSON.stringify(adminUser));
    localStorage.setItem('token', 'admin-token');
    setShowLoginModal(false);
    setLoginUsername("");
    setLoginPassword("");
    alert("Admin bulib kirdingiz");
    return;
  }

  alert("Foydalanuvchi nomi yoki parol xato");
};

const handleDelete = (id) => {
  const updatedProducts = customProducts.filter(
    (item) => item.id !== id
  );

  setCustomProducts(updatedProducts);

  localStorage.setItem(
    "customProducts",
    JSON.stringify(updatedProducts)
  );

  toast.success("Mahsulot o'chirildi 🗑");
};
const handleCreateProduct = async () => {
  try {
    const newProduct = {
      title: customProduct.title,
      price: customProduct.price,
      oldPrice: customProduct.oldPrice,
      image: customProduct.image,
      rating: customProduct.rating,
    };

    const response = await createProductApi(newProduct);
    const createdProduct = response.data;

    setBackendProducts((prevProducts) => [...prevProducts, createdProduct]);

    const updatedProducts = [...customProducts, {
      id: createdProduct.id,
      ...newProduct,
    }];

    setCustomProducts(updatedProducts);

    localStorage.setItem(
      "customProducts",
      JSON.stringify(updatedProducts)
    );

    toast.success("Mahsulot qo'shildi ✅");

    setCustomProduct({
      title: "",
      price: "",
      oldPrice: "",
      image: "",
      rating: "",
    });

    setShowModal(false);
  } catch (error) {
    console.log(error);
    toast.error("Xatolik yuz berdi ❌");
  }
};

const handleAddToCart = async (product) => {
  if (!user) {
    toast.error("Cartga qo'shish uchun avval login qiling");
    return;
  }

  try {
    dispatch(
      Cart({
        ...product,
        quantity: 1,
      })
    );

    await addToCart({
      user_id: user.id,
      product_id: Number(product.id),
      title: product.title || product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    });

    toast.success("Cartga qo'shildi 🛒");
  } catch (error) {
    console.log(error);
    toast.error("Cartga qo'shib bo'lmadi");
  }
};
  //
//
const handleLike = async (product) => {
  if (!user) {
    toast.error("Like qo'shish uchun avval login qiling");
    return;
  }

  console.log("LIKE BOSILDI", product);

  try {
    const res = await createLike({
      user_id: user.id,
      product_id: Number(product.id),
      title: product.title || product.name,
      image: product.image,
      price: product.price,
    });

    console.log("LIKE SUCCESS:", res);
    toast.success("Like qo'shildi ❤️");
  } catch (error) {
    console.error("LIKE ERROR:", error.response?.data || error);
    toast.error("Like qo'shilmadi");
  }
};

  ///
const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

const query = useSelector((state) => state.shop.searchQuery) || "";
  const cartlength = useSelector((state) => state.shop.cart.length);
  const Wishlistlength = useSelector((state) => state.shop.wishlist.length);


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

const filteredProducts1 = backendProducts.filter(item => 
  (item.title || item.name || "").toLowerCase().includes(query.toLowerCase())
);
``
const filteredProducts2 = backendProducts.filter(item => 
  (item.title || item.name || "").toLowerCase().includes(query.toLowerCase())
);

const filteredProducts3 = backendProducts.filter(item => 
  (item.title || item.name || "").toLowerCase().includes(query.toLowerCase())
);

 
  
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setSeconds(59);

        if (minutes > 0) {
          setMinutes(minutes - 1);
        } else {
          setMinutes(59);

          if (hours > 0) {
            setHours(hours - 1);
          } else {
            setHours(23);

            if (days > 0) {
              setDays(days - 1);
            }
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, minutes, hours, days]);

  return (
    <div>
      <div className="Navbar">
        <p>{t("*Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!")}   <span>ShopNow</span></p>
<div className="language-switcher">
  <button className="lang-btn" onClick={() => changeLanguage('uz')}>UZ</button>
  <button className="lang-btn" onClick={() => changeLanguage('en')}>EN</button>
  <button className="lang-btn" onClick={() => changeLanguage('ru')}>RU</button>
</div>

      {/* Matnlarni chiqarish */}
      {/* <h1>{t('welcome')}</h1>
      <p>{t('description')}</p> */}
      </div>
<nav className="header-nav">
          <div className='ul-div '>

<h1 className='ex'>
{t("Exclusive")}
</h1>
<ul>
  <li>
<Link to={"/"}>{t("Home")}</Link>
  </li>
    <li>
 <Link to={"/Contact"}>{t("Contact")}</Link>
  </li>
    <li>
  <Link  to={"/About"}>{t("About")}</Link>
  </li>
    {!isLoggedIn && (
    <li>
{/* <Link to={"/SignUp"}>{t("Sign Up")}</Link> */}
  </li>
    )}
</ul>

      </div>

      <div className="search-container">
          
     <input 
  type="text" 
  placeholder={t("What are you looking for?")}
  className="search-input"
  value={query} 
  onChange={(e) => dispatch(setSearchQuery(e.target.value))} 
/>
        <Search className="search-icon" size={20} strokeWidth={1.5} />
    
      </div>

      <div className="nav-icons">
        <button className="icon-link" aria-label="Wishlist">
                <Link to={'/Wishlist'}>
                  <Heart size={24} strokeWidth={1.5}
                  
                  />
      
           
            <span>
                {Wishlistlength}
            </span>
        </Link>
          
          <span className="badge">0</span>
        </button>
        
        <button className="icon-link" aria-label="Cart">
           <Link to={'/Cart'}>
          <ShoppingCart size={24} strokeWidth={1.5} />
           
            <span>
                {cartlength}
            </span>
        </Link>
          <span className="badge">0</span>
        </button>
     
    <div className="user-menu-wrapper">
      <div className="profile-trigger">
        <User size={20} color="white" />
      </div>

      <div className="dropdown-container">
        <div className="dropdown-content">
          {isLoggedIn ? (
            <>
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
              <a href="http://localhost:3000/swagger" className="menu-item" target="_blank" rel="noreferrer">
                <ShoppingCart size={18} /> <span>API Swagger</span>
              </a>
              <button 
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  setIsLoggedIn(false);
                  setUser(null);
                  navigate('/');
                }}
                className="menu-item" 
                style={{background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left'}}
              >
                <LogOut size={18} /> <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="menu-item signin-menu-item"
                onClick={() => navigate('/SignUp')}
              >
                <span>Sign In</span>
              </button>
              <button
                type="button"
                className="menu-item login-menu-item"
                onClick={() => setShowLoginModal(true)}
              >
                <span>Login</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
      </div>
    </nav>
<hr />
<div className='p-dev'>
  <div>

<h3>{t("Woman’s Fashion")}</h3>
<h3>{t("Men’s Fashion")}</h3>
<h3>{t("Electronics")}</h3>
<h3>{t("Home & Lifestyle")}</h3>
<h3>{t("Medicine")}</h3>
<h3>{t("Sports & Outdoor")}</h3>
<h3>{t("Baby’s & Toys")}</h3>
<h3>{t("Groceries & Pets")}</h3>
<h3>{t("Health & Beauty")}</h3>

  </div>
  
  <div>
    <ProductSwiper/>
  </div>
       
</div>


<div className="category-header">
  <div className="header-left">
    <div className="subtitle-container">
      <div className="red-rect"></div>
      <span className="subtitle">{t("Categories")}</span>
    </div>
    <h2 className="title">{t("Top Categories")}</h2>
  </div>
  
  <div className="header-right">
    <button className="nav-btn" aria-label={t("Previous")}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
    <button className="nav-btn" aria-label={t("Next")}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
</div>

<div className="flash">
  <h2>{t("Flash Sales")}</h2>

  <div className="time">
    <div>
      <p>{t("Days")}</p>
      <h3>{days}</h3>
    </div>

    <span>:</span>

    <div>
      <p>{t("Hours")}</p>
      <h3>{hours}</h3>
    </div>

    <span>:</span>

    <div>
      <p>{t("Minutes")}</p>
      <h3>{minutes}</h3>
    </div>

    <span>:</span>

    <div>
      <p>{t("Seconds")}</p>
      <h3>{seconds}</h3>
    </div>
  </div>
</div>




<div className='card-wrapper'> 
  {filteredProducts1.length > 0 ? (
    filteredProducts1.map(item => (
      <div className='card-div' key={item.id}>
        <div className='card-img-container'>
          <span className='discount-badge'>-40%</span>
          <div className='card-icons'>
            <div className='icon-circle'   onClick={() => {
    dispatch(Wishlist(item));
    handleLike(item);
  }}
  //  onClick={() => dispatch(Wishlist(item))}
   >❤</div>
            <div className='icon-circle' onClick={() => handleView(item.id)}>👁</div>
          </div>
          <img className='card-img' src={item.image} alt={item.title} />
          <button className='add-to-cart' onClick={() => { dispatch(Cart(item))
    handleAddToCart(item);

          }}>Add To Cart</button>
        </div>

        <div className='card-info'>
          <h3 className='card-title'>{item.title}</h3>
          <div className='price-row'>
            <p className='card-price'>${item.price}</p>
            <p className='old-price'>$160</p>
          </div>
          <div className='rating'>
            <span className='stars'>★★★★★</span>
            <span className='rating-count'>(88)</span>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="not-found-container">
      <XCircle size={60} color="#db4444" strokeWidth={1} />
      <h3>{t("No Products Found")}</h3>
      <p>{t("Try searching for something else or check your spelling.")}</p>
      <button className="btn-all" onClick={() => dispatch(setSearchQuery(""))}>
        {t("Clear Search")}
      </button>
    </div>
  )}
  {
customProducts.map(item => (
  <div className='card-div' key={item.id}>
    <div className='card-img-container'>
      <span className='discount-badge'>-40%</span>

      <div className='card-icons'>
        <div
          className='icon-circle'
          onClick={() => {
            dispatch(Wishlist(item));
            handleLike(item);
          }}
        >
          ❤
        </div>

        <div
          className='icon-circle'
          onClick={() => handleDelete(item.id)}
        >
          🗑
        </div>
      </div>

      <img
        className='card-img'
        src={item.image}
        alt={item.title}
      />

          <button className='add-to-cart' onClick={() => { dispatch(Cart(item))
    handleAddToCart(item);

          }}>Add To Cart</button>
    </div>

    <div className='card-info'>
      <h3 className='card-title'>{item.title}</h3>

      <div className='price-row'>
        <p className='card-price'>${item.price}</p>
        <p className='old-price'>${item.oldPrice}</p>
      </div>

      <div className='rating'>
        <span className='stars'>★★★★★</span>
        <span className='rating-count'>
          ({item.rating})
        </span>
      </div>
    </div>
  </div>
))
}
</div>
<button
  className='btn-all'
  onClick={() => setShowModal(true)}
>
  {t("View All Products")}
</button>

<hr style={{
  marginBottom: "50px"
}} />

<div className="category-header">
  <div className="header-left">
    <div className="subtitle-container">
      <div className="red-rect"></div>
      <span className="subtitle">{t("This Month")}</span>
    </div>
    <h2 className="title">{t("Browse By Category")}</h2>
  </div>
  
  <div className="header-right">
    <button className="nav-btn" aria-label={t("Previous")}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
    <button className="nav-btn" aria-label={t("Next")}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
</div>


<div className="div-icon">
  {categories.map((item) => (
    <div className="div-icon-titel" key={item.id}>
      <img
        src={item.image}
        alt={item.name}
        className="icon"
      />

      <h2>{item.name}</h2>
    </div>
  ))}
</div>


<hr />

<div className="category-header">
  <div className="header-left">
    <div className="subtitle-container">
      <div className="red-rect"></div>
      <span className="subtitle">{t("Categories")}</span>
    </div>
    <h2 className="title">{t("Best Selling Products")}</h2>
  </div>
  
  <div className="header-right">
    <button className='nimadir'>{t("View All")}</button>
  </div>
</div>


<div className='category-header' >
  {
   filteredProducts2.map(item => (
      <div className='card-div' key={item.id}>
        <div className='card-img-container'>
          <span className='discount-badge'>-40%</span>
          
          <div className='card-icons'>
            <div className='icon-circle'     onClick={() => {
    dispatch(Wishlist(item));
    handleLike(item);
  }}>❤</div>
            <div className='icon-circle'
            // onClick={() => handleView2(item.id)}
              >👁</div>
          </div>
          <img className='card-img' src={item.image} alt={item.title} />
          <button className='add-to-cart'  onClick={() => {dispatch(Cart(item))
    handleAddToCart(item);

          }
        
        }>Add To Cart</button>
        </div>

        <div className='card-info'>
          <h3 className='card-title'>{item.name}</h3>
          <div className='price-row'>
            <p className='card-price'>${item.price}</p>
            <p className='old-price'>$160</p>
          </div>
          <div className='rating'>
            <span className='stars'>★★★★★</span>
            <span className='rating-count'>(88)</span>
          </div>
        </div>
        
      </div>
    ))
  }
  </div>

    <img className='imagela' src={Categores} alt="chiqdimi" />

<div className="category-header">
  <div className="header-left">
    <div className="subtitle-container">
      <div className="red-rect"></div>
      <span className="subtitle">{t("Categories")}</span>
    </div>
    <h2 className="title">{t("Explore Our Products")}</h2>
  </div>
  
  <div className="header-right">
    <button className="nav-btn" aria-label={t("Previous")}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
    <button className="nav-btn" aria-label={t("Next")}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
</div>




    <div className='category-header-nima' >
  {
   filteredProducts3.map(item => (
      <div className='card-div' key={item.id}>
        <div className='card-img-container'>
          <span className='discount-badge'>-40%</span>
          <div className='card-icons'>
            <div className='icon-circle'    onClick={() => {
    dispatch(Wishlist(item));
    handleLike(item);
  }}>❤</div>
            <div className='icon-circle'
            // onClick={() => handleView3(item.id)}
            >👁</div>
          </div>
          <img className='card-img' src={item.image} alt={item.title} />
          <button className='add-to-cart'  onClick={() => dispatch(Cart(item))}>Add To Cart</button>
        </div>

        <div className='card-info'>
          <h3 className='card-title'>{item.name}</h3>
          <div className='price-row'>
            <p className='card-price'>${item.price}</p>
            <p className='old-price'>$160</p>
          </div>
          <div className='rating'>
            <span className='stars'>★★★★★</span>
            <span className='rating-count'>(88)</span>
          </div>
        </div>
        
      </div>
    ))
  }
  </div>

<button className='btn-all'>
  {t("View All Products")}
</button>

<div className="category-header">
  <div className="header-left">
    <div className="subtitle-container">
      <div className="red-rect"></div>
      <span className="subtitle">{t("Featured")}</span>
    </div>
    <h2 className="title">{t("New Arrival")}</h2>
  </div>
  
  <div className="header-right">
    <button className="nav-btn" aria-label={t("Previous")}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
    <button className="nav-btn" aria-label={t("Next")}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
</div>



    <div className="images-grid">
      {images.map((item) => (
        <div className="image-card" key={item.id}>
          <img
            className="image-thumb"
            src={
              item.image && item.image.startsWith("http")
                ? item.image
                : item.image
                ? `https://${item.image}`
                : iphone
            }
            alt={item.title || 'Image'}
          />
          <div className="image-meta">
            <h4 className="image-title">{item.title}</h4>
          </div>
        </div>
      ))}
    </div>


 <div className="services-container">

  <div className="service-card">
    <div className="icon-wrapper">
      <div className="icon-circle-outer">
        <div className="icon-circle-inner">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        </div>
      </div>
    </div>
    <h3 className="service-title">{t("FREE AND FAST DELIVERY")}</h3>
    <p className="service-desc">{t("Free delivery for all orders over $140")}</p>
  </div>

  <div className="service-card">
    <div className="icon-wrapper">
      <div className="icon-circle-outer">
        <div className="icon-circle-inner">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
          </svg>
        </div>
      </div>
    </div>
    <h3 className="service-title">{t("24/7 CUSTOME  R SERVICE")}</h3>
    <p className="service-desc">{t("Friendly 24/7 customer support")}</p>
  </div>

  <div className="service-card">
    <div className="icon-wrapper">
      <div className="icon-circle-outer">
        <div className="icon-circle-inner">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <polyline points="9 12 11 14 15 10"></polyline>
          </svg>
        </div>
      </div>
    </div>
    <h3 className="service-title">{t("MONEY BACK GUARANTEE")}</h3>
    <p className="service-desc">{t("We return money within 30 days")}</p>
  </div>

</div>

<footer className="footer">
  <div className="footer-container">

    <div className="footer-col">
      <h3>{t("Exclusive")}</h3>
      <h4>{t("Subscribe")}</h4>
      <p>{t("Get 10% off your first order")}</p>

      <div className="subscribe-box">
        <input type="email" placeholder={t("Enter your email")} />
      </div>
    </div>

    <div className="footer-col">
      <h3>{t("Support")}</h3>
      <p>{t("Address")}</p>
      <p>{t("Email")}</p>
      <p>{t("Phone")}</p>
    </div>

    <div className="footer-col">
      <h3>{t("Account")}</h3>
      <li>{t("My Account")}</li>
      <li>{t("Login / Register")}</li>
      <li>{t("Cart")}</li>
      <li>{t("Wishlist")}</li>
      <li>{t("Shop")}</li>
    </div>

    <div className="footer-col">
      <h3>{t("Quick Link")}</h3>
      <li>{t("Privacy Policy")}</li>
      <li>{t("Terms Of Use")}</li>
      <li>{t("FAQ")}</li>
      <li>{t("Contact")}</li>
    </div>

    <div className="footer-col">
      <h3>{t("Download App")}</h3>
      <span className="save-text">{t("Save $3 with App New User Only")}</span>

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
    {t("Copyright")}
  </div>
</footer>
{
  showLoginModal && (
    <div className="cart-modal login-modal">
      <div className="cart-form login-form">
        <button
          type="button"
          className="login-close"
          onClick={() => {
            setShowLoginModal(false);
            setLoginUsername("");
            setLoginPassword("");
          }}
        >
          ×
        </button>
        <div className="login-head">
          <h2 className="login-heading">Admin Sign In</h2>
          <p className="login-subtitle">Username: admin / Password: admin2010</p>
        </div>
        <form onSubmit={handleLoginSubmit} className="login-form-inner">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <div className="login-actions">
            <button type="submit" className="btn-all login-submit">
              Login
            </button>
            <button
              type="button"
              className="btn-all login-cancel"
              onClick={() => {
                setShowLoginModal(false);
                setLoginUsername("");
                setLoginPassword("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
{
  showModal && (
    <div className="cart-modal">
      <div className="cart-form">

        <h2>New Product</h2>

        <input
          name="title"
          placeholder="HAVIT HV-G92 Gamepad"
          value={customProduct.title}
          onChange={handleInputChange}
        />

        <input
          name="price"
          placeholder="120"
          value={customProduct.price}
          onChange={handleInputChange}
        />

        <input
          name="oldPrice"
          placeholder="160"
          value={customProduct.oldPrice}
          onChange={handleInputChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={customProduct.image}
          onChange={handleInputChange}
        />

        <input
          name="rating"
          placeholder="88"
          value={customProduct.rating}
          onChange={handleInputChange}
        />

        <button onClick={handleCreateProduct}>
          Add Product
        </button>

      </div>
    </div>
  )
}
  </div>
  )
}
export default HomePage;