import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";
import * as loadingData from '../loading/football1.json'
import Loading from "../components/Loading";
import Categories from "../components/Categories";

const HomePage = () => {

  // ใช้ state เพื่อเก็บข้อมูลผลิตภัณฑ์ที่ดึงมาจาก backend
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allCategories, setAllCategories] = useState(['']) //สร้าง state allCategories ที่ใช้เก็บข้อมูลทุกหมวดหมู่ของผลิตภัณฑ์

  const getProducts = async () => {
    try { //ส่งคำขอ GET ไปยัง API ของ backend เพื่อดึงข้อมูลผลิตภัณฑ์.
      const response = await axios.get(`${VITE_BACKEND_URL}/api/products`);
      console.log(response.data);
      setProducts(response.data); // อัปเดต state products ด้วยข้อมูลผลิตภัณฑ์ที่ได้รับ.
      //อัปเดต state allCategories โดยนำข้อมูลหมวดหมู่มาจากข้อมูลผลิตภัณฑ์ที่ได้รับ และใช้ Set เพื่อลบค่าที่ซ้ำกัน และเพิ่มค่า 'All' เข้าไป.
      setAllCategories(['All', ...new Set(response.data.map(item => item.league))]); // ตั้งค่า allCategories ด้วยข้อมูลหมวดหมู่
      setIsLoading(false); 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getProducts() //เรียกใช้ฟังก์ชัน getProducts เพื่อดึงข้อมูลผลิตภัณฑ์.
  }, []) //[]: นำมาใช้เพื่อบอกว่า useEffect นี้ต้องทำงานเพียงครั้งเดียวเมื่อ component ถูก render ครั้งแรก.

  const filterItem = async (league) => {
    try {
      if (league === 'All') {
        getProducts();
      } else { //filter เพื่อเลือกเฉพาะผลิตภัณฑ์ที่มีหมวดหมู่ตรงกับที่เลือก และจากนั้นจะอัปเดต state products ด้วยผลลัพธ์ที่ได้
        const newItems = products.filter(item => item.league === league);
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
              </div>
            </div>
            <div >
              <Categories allCategories={allCategories} filterItems={filterItem} />
            </div>

            <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5 w-[80%]">
              {products.map((product, index) => (
                <Product key={index} product={product} getProducts={getProducts} />
              ))}
            </div>
          </div>
        </>
      )}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </div>

  );
}

export default HomePage;