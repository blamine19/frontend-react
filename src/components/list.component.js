import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditProduct from "./edit.component"


export default function ProductList() {


    const [products, setProducts] = useState([])

    let n = 1


    useEffect(() => {
        fetchProducts();
    }, [])


    const fetchProducts = async () => {
        await axios.get('http://127.0.0.1:8000/api/products').then(({ data }) => {

            //console.log(JSON.stringify(data))

            setProducts(data)
        })
    }

    const deleteProduct = async (id) => {

        console.log("delete")
        await axios.delete('http://127.0.0.1:8000/api/products/' + id)
            .then(( response ) => {

                console.log(response.data.message_retour)
                fetchProducts()
            }
            )
            .catch(({ response: { data } }) => {
                console.log(data.message)
            })
    }

    return (
        <div class="container">
            <div class="card" style={{ width: "99%", minHeight: "500px" }}>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length > 0 && (
                                products.map((row, key) => (
                                    <tr key={key}>
                                        <td>{n++}</td>
                                        <td>{row.title}</td>
                                        <td>{row.description}</td>
                                        <td><img width="100px" height="100px" src={`http://127.0.0.1:8000/storage/product/image/${row.image}`} /></td>
                                        <td><button type="button" class="btn btn-danger" onClick={() => { deleteProduct(row.id) }} >Delete</button></td>
                                        <td>
                                            <Link className="btn btn-success mb-2 float-center" to={`/product/edit/${row.id}`}>Edit</Link>
                                        </td>
                                    </tr>
                                )
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )

}

