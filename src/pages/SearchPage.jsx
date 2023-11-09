import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import { Link } from 'react-router-dom';


export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/api/products/search?term=${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
        // ดักข้อผิดพลาดที่เกิดขึ้น
        // ตัวอย่าง: ถ้า error.response มีข้อมูล, ให้ใช้ error.response.data และแสดงใน console
        if (error.response) {
          console.error("Error response from server:", error.response.data);
        } else {
          console.error("Error during API call:", error.message);
        }
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='container mx-auto mt-16 w-[60%]'>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className='block w-80'><img src="https://img.pptvhd36.com/thumbor/2023/06/14/08c849e.jpg" alt="Album" /></figure>

        <div className="card-body">
          <span className="text-3xl text-center mt-10 mb-5">Search to FOOTBALLSHOP</span>
          <span className="text-sm text-center mb-3">Type to search for what you want.</span>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-success  my-4 w-full"
          />
          <div className="card-actions justify-end">
            <Link to="/" className="btn">Cancel</Link>
            <button className="btn btn-success" onClick={handleSearch}>Search</button>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchPage;
