import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from './Navbar';
import Footer from './Footer';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/product/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const transformedData = data.map(product => ({
          id: product.id,
          img: product.imageURL,
          title: product.name,
          rating: 0, 
          price: product.price,
          color: '', 
          aosDelay: '0' 
        }));
        setProducts(transformedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-14 mb-12">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 className="text-3xl font-bold">All Products</h1>
            <p className="text-xs text-gray-400">
              Browse all available products.
            </p>
          </div>
          {/* Body */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
              {/* Card section */}
              {products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="space-y-3 text-center">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-[220px] w-[150px] object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{product.title}</h3>
                    <h3 className="font-semibold">₹{product.price}</h3>
                    <div className="flex justify-center items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      {/* <span>{4 || 'No rating info'}</span> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductList;
