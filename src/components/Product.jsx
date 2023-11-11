import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App"
import { useAuthContext } from '../context/AuthContext.jsx';

const Product = ({ product, getProducts }) => {
    // ใช้ hook useAuthContext เพื่อดึงข้อมูลผู้ใช้จาก context
    const { user } = useAuthContext()

    // ฟังก์ชัน deleteProduct ที่ใช้ในการลบผลิตภัณฑ์
    const deleteProduct = async (id) => {
        // ใช้ SweetAlert2 ในการยืนยันการลบ
        const result = await Swal.fire({
            title: 'Are you sure ?',
            text: "Do you really want to delete the product ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        // ถ้าผู้ใช้กด "Yes"
        if (result.isConfirmed) {
            // ส่งคำขอ DELETE ไปยัง API เพื่อลบผลิตภัณฑ์
            try {
                await axios.delete(`${VITE_BACKEND_URL}/api/products/${id}`)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                // เรียกฟังก์ชัน getProducts เพื่อโหลดข้อมูลผลิตภัณฑ์ใหม่
                getProducts()
            } catch (error) {
                // แสดงข้อผิดพลาดในกรณีที่ไม่สามารถลบได้
                toast.error(error.message, {
                    theme: "colored"
                })
            }
        }
    }


    return (

        <div className="card btn-ghost w-78 bg-base-100 shadow-xl">
            <figure><img src={product.image} alt="{product.name}" /></figure>
            <div className="card-body">
                <p className="text-accent-focus">{product.type}</p>
                <h3 className="card-title">{product.name}</h3>
                <h3 className="card-title text-accent mb-3 text-2xl" >${product.price}</h3>

                {user && user.roles.includes("ROLE_ADMIN") && (
                    <div className="card-actions justify-end">
                        <Link to={`/edit/${product._id}`} className="btn btn-active btn-accent">Edit</Link>
                        <button className="btn btn-active btn-secondary" onClick={() => deleteProduct(product._id)}>Delete</button>
                    </div>
                )}
            </div>
        </div>


    )
}

export default Product;