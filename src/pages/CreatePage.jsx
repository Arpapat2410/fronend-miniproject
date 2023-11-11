import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";
import Swal from 'sweetalert2'
import * as loadingData from '../loading/football1.json'
import Loading from "../components/Loading";
import { Link } from "react-router-dom";


const CreatePage = () => {

    const [ name , setName ] = useState("") 
    const [league, setLeague] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState('')
    const navigate = useNavigate()
    
    // ฟังก์ชันสำหรับบันทึกผลิตภัณฑ์
    const saveProduct = async(e) => {
        e.preventDefault();
        // ตรวจสอบว่าข้อมูลถูกกรอกครบหรือไม่
        if ( name === "" || league==="" || type ==="" || price ==="" || image ===""){
            alert('Please fill out all input completely');
            return;
        } 
        try {
            setIsLoading(true)
            // ส่งคำขอ POST ไปยัง API เพื่อสร้างผลิตภัณฑ์
            const res =  await axios.post(`${VITE_BACKEND_URL}/api/products`, 
            {name:name , league:league , type:type ,price:price , image:image })
            Swal.fire(
                'Good job!',
                'Create a successful product!',
                'success'
            )
            setIsLoading(false)
            navigate("/")
        } catch (error) {
            toast.error(error.message, {
                theme: "colored"
              })
            setIsLoading(false)
        }
    }

    // เรียกใช้ฟังก์ชัน saveProduct และส่งอ็อบเจกต์ที่มีข้อมูลเป็นค่าว่างเพื่อล้างข้อมูลในฟอร์ม
    const handleClear = (e) => {
        saveProduct({
          name: "",
          league: "",
          type: "",
          price: "",
          image: "",
        })
        setError(false);
      }

    return (
        <div className="card max-w-lg bg-white shadow-lg mx-auto  p-7 rounded mt-8 ">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Create a Product
            </h2>
            <form onSubmit={saveProduct}>
                <div className="space-y-2 ">
                    <div card-body >
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}className="input input-accent my-2 w-full " placeholder="Enter Name" />
                    </div>
                    <div>
                        <label>league</label>
                        <input type="text" value={league} onChange={(e) => setLeague(e.target.value)}className="input input-accent my-2 w-full " placeholder="Enter League" />
                    </div>
                    <div>
                        <label>type</label>
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)}className="input input-accent my-3 w-full " placeholder="Enter Type" />
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}className="input input-accent my-3 w-full " placeholder="Enter Price" />
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)}className="input input-accent my-3 w-full " placeholder="Enter Image URL" />
                    </div>
                    { !isLoading && ( <button className="btn btn-accent block w-full mt-6  text-white rounded-xl px-12 py-2 font-bold ">Create a Product</button>)}     
                    <Link to="" className="btn btn-danger w-full" onClick={handleClear}>Cencal</Link>    
                </div>
            </form>
        </div>
    )
}


export default CreatePage;