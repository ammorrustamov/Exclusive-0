import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../server/Product.js';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Kechirasiz, mahsulot topilmadi!</h2>
        <p>ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ display: 'flex', gap: '40px', padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} style={{ width: '80px', height: '80px', backgroundColor: '#f5f5f5', padding: '5px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={product.image} alt="thumb" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
        <div style={{ width: '450px', height: '500px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
          <img src={product.image} alt={product.title || product.name} style={{ width: '90%', objectFit: 'contain' }} />
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
          {product.title || product.name}
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '15px 0' }}>
          <span style={{ color: '#FFAD33' }}>
            {"★".repeat(product.rating || 5)}{"☆".repeat(5 - (product.rating || 5))}
          </span>
          <span style={{ color: 'gray', fontSize: '14px' }}>
            ({product.reviews || 0} Reviews) | <span style={{ color: '#00FF66' }}>In Stock</span>
          </span>
        </div>

        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>${product.price}</h2>
        
        <p style={{ fontSize: '14px', borderBottom: '1px solid #ccc', paddingBottom: '24px', lineHeight: '1.6', color: '#333' }}>
          {product.description || "Ushbu mahsulot yuqori sifatli materiallardan tayyorlangan bo'lib, sizning kundalik ehtiyojlaringiz uchun mukammal tanlovdir."}
        </p>

        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '18px' }}>Colours:</span>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#A0BCE0', cursor: 'pointer', border: '2px solid black' }}></div>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#E07575', cursor: 'pointer' }}></div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '18px' }}>Size:</span>
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <button 
                key={size} 
                style={{ 
                  width: '40px', height: '40px',
                  border: '1px solid #ccc', 
                  background: size === 'M' ? '#DB4444' : 'white', 
                  color: size === 'M' ? 'white' : 'black', 
                  borderRadius: '4px', cursor: 'pointer', fontWeight: '500'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
          <div style={{ display: 'flex', border: '1px solid #808080', borderRadius: '4px', overflow: 'hidden' }}>
            <button style={{ padding: '10px 15px', border: 'none', background: 'white', cursor: 'pointer', fontSize: '20px' }}>-</button>
            <span style={{ padding: '10px 25px', borderLeft: '1px solid #808080', borderRight: '1px solid #808080', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>1</span>
            <button style={{ padding: '10px 15px', border: 'none', background: '#DB4444', color: 'white', cursor: 'pointer', fontSize: '20px' }}>+</button>
          </div>
          
          <button style={{ backgroundColor: '#DB4444', color: 'white', border: 'none', padding: '10px 48px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', fontSize: '16px' }}>
            Buy Now
          </button>
          
          <button style={{ border: '1px solid #ccc', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', cursor: 'pointer', background: 'white' }}>
            ❤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;