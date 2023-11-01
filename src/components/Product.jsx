import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App"

const Product = ({ product, getProducts }) => {

    const deleteProduct = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure ?',
            text: "Do you really want to delete the product ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        if (result.isConfirmed) {
            try {
                await axios.delete(`${VITE_BACKEND_URL}/api/products/${id}`)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                toast.success("Delete a product successfully", {
                    theme: "colored"
                })
                getProducts()
            } catch (error) {
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
                <p>{product.type}</p>
                <h3 className="card-title">{product.name}</h3>
                <h2>{product.price}</h2>


                <div className="card-actions justify-end">
                    <Link to={`/edit/${product._id}`} className="btn btn-active btn-accent">Edit</Link>
                    <button className="btn btn-active btn-secondary" onClick={() => deleteProduct(product._id)}>Delete</button>
                </div>
            </div>
        </div>


    )
}

export default Product;