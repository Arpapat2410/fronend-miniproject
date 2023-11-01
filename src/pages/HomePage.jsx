import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";
import * as loadingData from '../loading/football1.json'
import Loading from "../components/Loading";
import Categories from "../components/Categories";

const HomePage = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [allCategories, setAllCategories] = useState([''])
    


    const getProducts = async () => {
        try {
          const response = await axios.get(`${VITE_BACKEND_URL}/api/products`);
          console.log(response.data);
          setProducts(response.data);
          setAllCategories(['All', ...new Set(response.data.map(item => item.league))]); // ตั้งค่า allCategories ด้วยข้อมูลหมวดหมู่
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }

    useEffect(() => {
        setIsLoading(true);
        getProducts()
    }, [])

    const filterItem = async (league) => {
        try {
          if (league === 'All') {
            getProducts(); 
          } else {
            const newItems =  products.filter(item => item.league === league);
            setProducts(newItems); 
          }
        } catch (error) {
          console.log(error);
        }
      }

    return (
        <div>
          {isLoading ? (
            <Loading animation={loadingData} />
          ) : (
            <>
              <div>
                <div className="carousel w-full">
                  <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://bestiebrand.com/wp-content/uploads/2023/08/v92f8pvXTjqHSGeiDAXxN7-2.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href="#slide4" className="btn btn-circle">❮</a>
                      <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                  </div>
                  <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4V4AQkt1ydWVbd20Wf9C2GEZyq67OxFuHexNrGkW9fCYWBDNhAE.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href="#slide1" className="btn btn-circle">❮</a>
                      <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                  </div>
                </div>
                <div>
                    <Categories allCategories={allCategories} filterItems={filterItem}/>
                </div>
                <div>
                  <Link to="/create" className="btn btn-warning">
                    Create a Product
                  </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                  {products.map((product, index) => (
                    <Product key={index} product={product} getProducts={getProducts} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      );
                  }
      
export default HomePage;