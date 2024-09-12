import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { FaStar } from 'react-icons/fa';
import Navbar from './Navbar';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [newCategory, setNewCategory] = useState({
    categoryName: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/catgory/list');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategoryClick = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleInputChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle category submission (e.g., POST to API)
    console.log('New Category:', newCategory);
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="container mx-auto">
          <div className="relative flex justify-center items-center mb-24 mt-14">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Best Categories</h1>
              <p className="text-xs text-gray-400">
                Lorem ipsum dolor sit  amet, consectetur adipiscing elit.

              </p>
            </div>
            <button
              onClick={handleAddCategoryClick} // Open modal on click
              className="absolute right-0 bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full"
            >
              Add Category
            </button>
          </div>
          
          {/* Body section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group w-[300px]"
              >
                {/* image section */}
                <div className="h-[100px]">
                  <img
                    src={category.imageUrl}
                    alt={category.categoryName}
                    className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                  />
                </div>
                {/* details section */}
                <div className="p-4 text-center">
                  {/* star rating */}
                  <div className="w-full flex items-center justify-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                  </div>
                  <h1 className="text-xl font-bold">{category.categoryName}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                    {category.description}
                  </p>
                  <button
                    className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <button
              className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md"
            >
              View All
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Adding New Category */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[500px] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-center w-full">Add New Category</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-black ">X</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-4">
              <div>
                <label className="block font-semibold">Category Name</label>
                <input
                  type="text"
                  name="categoryName"
                  value={newCategory.categoryName}
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
                  value={newCategory.description}
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
                  value={newCategory.imageUrl}
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

export default Categories;
