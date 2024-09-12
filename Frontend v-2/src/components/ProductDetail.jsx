import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [wishlistString, setWishlistString] = useState("Add to Wishlist");
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/`);
        const products = response.data;
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
          // Assuming you have a way to fetch categories, modify as needed
          // Here we just set a placeholder category for demonstration
          const foundCategory = { id: foundProduct.categoryId, categoryName: 'Example Category' }; // Fetch this from your API or set it directly
          setCategory(foundCategory);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToWishlist = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/wishlist/add`, {
        id: product.id,
        token
      });
      if (response.status === 201) {
        setIsAddedToWishlist(true);
        setWishlistString("Added to Wishlist");
      }
    } catch (err) {
      console.error('Error adding to wishlist:', err);
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please log in first!");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/cart/add`, {
        productId: product.id,
        quantity,
        token
      });
      if (response.status === 201) {
        alert("Product added to the cart!");
        // refresh nav bar or other UI updates
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const handleShowCart = () => {
    navigate('/cart');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <Navbar />
      <div className="mt-14 mb-12">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xs text-gray-400">Product details</p>
          </div>
          {/* Body */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 w-full">
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
            <div className="md:w-2/3 w-full mt-4 md:mt-0 md:pl-8">
              <h4 className="text-xl font-semibold">{product.name}</h4>
              <h6 className="text-md italic">{category?.categoryName || 'Category'}</h6>
              <h6 className="text-xl font-bold">₹{product.price}</h6>
              <p className="mt-2 text-gray-600">{product.description}</p>

              <div className="flex flex-row justify-between mt-4">
                <div className="input-group w-1/3 p-0">
                  <span className="input-group-text">Quantity</span>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-control"
                  />
                </div>

                <button
                  type="button"
                  className="btn bg-yellow-400 text-black ml-4"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>

              <div className="flex mt-4">
                <button
                  className={`btn ${isAddedToWishlist ? 'bg-gray-500' : 'bg-gray-300'} text-white mr-4`}
                  onClick={handleAddToWishlist}
                >
                  {wishlistString}
                </button>
                <button
                  className="btn bg-gray-800 text-white"
                  onClick={handleShowCart}
                >
                  Show Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
