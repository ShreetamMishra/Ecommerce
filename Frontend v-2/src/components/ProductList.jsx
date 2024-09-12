import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    category: '',
    name: '',
    description: '',
    imageUrl: '',
    price: '',
  });

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
        }));
        setProducts(transformedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const email = localStorage.getItem('userEmail');
    setUserEmail(email);

    fetchProducts();
  }, []);

  const handleAddProductClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle product submission (e.g., POST to API)
    console.log('New Product:', newProduct);
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="mt-14 mb-12">
        <div className="container mx-auto">
          {/* Header */}
          <div className="relative flex justify-center items-center mb-10">
            <div className="text-center">
              <h1 className="text-3xl font-bold">All Products</h1>
              <p className="text-xs text-gray-400">
                Browse all available products.
              </p>
            </div>
            {userEmail === 'admin@example.com' && (
              <button
                onClick={handleAddProductClick}
                className="absolute right-0 bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full"
              >
                Add Products
              </button>
            )}
          </div>
          {/* Product Grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal for Adding New Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[500px] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-center w-full">Add New Product</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-black ">X</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-4">
              <div>
                <label className="block font-semibold">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={newProduct.imageUrl}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
