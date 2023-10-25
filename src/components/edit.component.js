import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";




export default function EditProduct() {

    /********* amine belh */


    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')


    const [products, setProducts] = useState([])

    const changeHandler = (e) => {

        const { name, value, files } = e.target;


        if (name)
            console.log("Mlih")

        setImage(e.target.files[0]);
        console.log(e.target)
        console.log(e.target.files)
    }

    const { id } = useParams('id')


    useEffect(() => {
        fetchProducts()
    }, [])


    const fetchProducts = async () => {
        await axios.get('http://127.0.0.1:8000/api/products/' + id).then(({ data }) => {

            const { title, description } = data.product

            setTitle(title)
            setDescription(description)
        })
    }


    const updateProduct = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('title', title)
        formData.append('description', description)        
        formData.append('image', image)

        formData.append('_method', 'PATCH')

        try {         
            const response = await axios.post('http://127.0.0.1:8000/api/products/' + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for sending FormData
                },
            });


            // Handle success, e.g., show a success message
            console.log('Data successfully updated:\n', response.data);

        } catch (error) {
            // Handle error, e.g., show an error message
            console.error('Error updating data:', error);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="conl-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title"> Edit Form </h3>
                            <hr>
                            </hr>
                            <div className="form-wrapper">
                                <form onSubmit={updateProduct}>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input type="text" className="form-control" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Example textarea</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                            value={description}
                                            onChange={(e) => { setDescription(e.target.value) }}
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Image</label>
                                        <input name="image" type="file" accept="image/*" className="form-control" onChange={changeHandler} />
                                    </div>

                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary mb-3">Save</button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
