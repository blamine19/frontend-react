import React, { useEffect, useState } from "react"
import axios from "axios"


export default function ProductList() {


    const [products, setProducts] = useState([])

    let n = 1


    useEffect(() => {
        fetchProducts();
    }, [])


    const fetchProducts = async () => {
        await axios.get('http://127.0.0.1:8000/api/products').then(({ data }) => {
            console.log("------------------")
            console.log(JSON.stringify(data))

            setProducts(data)
            console.log("-------fin-----------")
        })
    }

    const deleteProduct = async (id) => {

        console.log("delete")
        await axios.delete('http://127.0.0.1:8000/api/products/' + id)
            .then(({ data }) => {
                console.log(data.message)
                fetchProducts()
            })
            .catch(({ response: { data } }) => {
                console.log(data.message)
            })
    }


    return (
        <div class="container">


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
                                    <td><button type="button" class="btn btn-success" onClick={() => { deleteProduct(row.id) }} >Update</button></td>
                                </tr>
                            )
                            )
                        )
                    }

                </tbody>
            </table>
        </div>

    )

}

