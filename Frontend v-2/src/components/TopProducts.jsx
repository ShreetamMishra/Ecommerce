import React from 'react';
import { FaStar } from 'react-icons/fa'; // Imported FaStar from react-icons


const ProductsData = [
  {
    id: 1,
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRDn3F27jmXAsgZj6exb_Ol-DPTz431kzEx8ocx5HF1QQc8-aEuYArP2I63BMOUIRyQSxBsVYHdVMETQj4KKFw-Zic82TRYJRl91jp52z2yqaoYdmfUekvt",
    title: "Women Ethnic",
    rating: 5.0,
    color: "white",
    aosDelay: "0",
  },
  {
    id: 2,
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRDn3F27jmXAsgZj6exb_Ol-DPTz431kzEx8ocx5HF1QQc8-aEuYArP2I63BMOUIRyQSxBsVYHdVMETQj4KKFw-Zic82TRYJRl91jp52z2yqaoYdmfUekvt",
    title: "Women western",
    rating: 4.5,
    color: "Red",
    aosDelay: "200",
  },
  {
    id: 3,
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRDn3F27jmXAsgZj6exb_Ol-DPTz431kzEx8ocx5HF1QQc8-aEuYArP2I63BMOUIRyQSxBsVYHdVMETQj4KKFw-Zic82TRYJRl91jp52z2yqaoYdmfUekvt",
    title: "Goggles",
    rating: 4.7,
    color: "brown",
    aosDelay: "400",
  },
  {
    id: 4,
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRDn3F27jmXAsgZj6exb_Ol-DPTz431kzEx8ocx5HF1QQc8-aEuYArP2I63BMOUIRyQSxBsVYHdVMETQj4KKFw-Zic82TRYJRl91jp52z2yqaoYdmfUekvt",
    title: "Printed T-Shirt",
    rating: 4.4,
    color: "Yellow",
    aosDelay: "600",
  },
  {
    id: 5,
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRDn3F27jmXAsgZj6exb_Ol-DPTz431kzEx8ocx5HF1QQc8-aEuYArP2I63BMOUIRyQSxBsVYHdVMETQj4KKFw-Zic82TRYJRl91jp52z2yqaoYdmfUekvt",
    title: "Fashion T-Shirt",
    rating: 4.5,
    color: "Pink",
    aosDelay: "800",
  },
];

const TopProducts = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, explicabo?
          </p>
        </div>
        {/* Body */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* Card section */}
            {ProductsData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3 text-center"
              >
                <img
                  src={data.img}
                  alt={data.title}
                  className="h-[220px] w-[150px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.color}</p>
                  <div className="flex justify-center items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
           {/* view all button */}
           <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
              View All Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopProducts;