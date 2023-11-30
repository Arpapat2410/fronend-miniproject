import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const EditPage = () => {
    // ใช้ hook useParams เพื่อดึงค่า id จาก URL
    let { id } = useParams();
    // ใช้ hook useNavigate เพื่อนำทางไปยังหน้าที่ต้องการ
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // สถานะ product เพื่อเก็บข้อมูลผลิตภัณฑ์
    const [product, setProduct] = useState({
        name: "",
        league: "",
        type: "",
        price: "",
        image: "",
    });

    // ฟังก์ชันที่ใช้ในการดึงข้อมูลผลิตภัณฑ์จาก API โดยใช้ id
    const getProduct = async () => {
        setIsLoading(true);
        try { // ส่งคำขอ GET ไปยัง API เพื่อดึงข้อมูลของผลิตภัณฑ์ที่มี id ตามที่ระบุ.
            const response = await axios.get(`${VITE_BACKEND_URL}/api/products/${id}`);
            setProduct({ // หลังจากที่ได้รับข้อมูลจาก API สำเร็จ, ข้อมูลจะถูกนำมาอัปเดตในสถานะ product โดยใช้ setProduct เพื่อแสดงข้อมูลใน UI
                name: response.data.name,
                league: response.data.league,
                type: response.data.type,
                price: response.data.price,
                image: response.data.image,
            })
        } catch (error) {
            toast.error(error.message);
        }
    }

    // ฟังก์ชันที่ใช้ในการส่งคำขอ PUT เพื่ออัปเดตข้อมูลผลิตภัณฑ์
    const updateProduct = async (e) => {
        e.preventDefault(); //ป้องกันการโหลดหน้าใหม่หลังจากกดปุ่มอัปเดต.
        setIsLoading(true);
        try { // ส่งคำขอ PUT ไปยัง API เพื่ออัปเดตข้อมูลผลิตภัณฑ์ที่มี id ตามที่ระบุ โดยใช้ข้อมูลจาก product.
            await axios.put(`${VITE_BACKEND_URL}/api/products/${id}`, product);
            toast.success("Update a product successfully", {
                theme: "colored"
            })
            navigate('/');
        } catch (error) {
            toast.error(error.message, {
                theme: "colored"
            })
        }
    }
    //พื่อดึงข้อมูลของผลิตภัณฑ์เมื่อคอมโพเนนต์ถูกโหลดครั้งแรก นี่จะทำให้ข้อมูลผลิตภัณฑ์ถูกดึงมาแสดงในฟอร์มเมื่อหน้าแก้ไขถูกโหลด
    useEffect(() => {
        getProduct();
    }, [])


    return (
        <div className="card max-w-lg bg-white shadow-lg mx-auto  p-7 rounded mt-8 ">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Update a Product
            </h2>

            <>
                <form onSubmit={updateProduct}>
                    <div className="space-y-2">
                        <div>
                            <label>Name</label>
                            <input type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className="input input-info my-3 w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                        </div>
                        <div>
                            <label>League</label>
                            <input type="text" value={product.league} onChange={(e) => setProduct({ ...product, league: e.target.value })} className="input input-info my-3 w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Quantity" />
                        </div>
                        <div>
                            <label>Type</label>
                            <input type="text" value={product.type} onChange={(e) => setProduct({ ...product, type: e.target.value })} className="input input-info w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Quantity" />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} className="input input-info w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Price" />
                        </div>
                        <div>
                            <label>Image URL</label>
                            <input type="text" value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })} className="input input-info w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL" />
                        </div>
                        <div>
                            <button className=" btn btn-success block w-full mt-6  text-white rounded-xl px-12 py-2 font-bold">Update</button>
                            <Link to="/" className="btn btn-danger w-full mt-2">Cencal</Link>
                        </div>
                    </div>
                </form>
            </>


        </div>
    )
}


export default EditPage;