import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function CreateProduct() {

    /********* amine belh */
    /*** safo bl **/
    
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const changeHandler = (e) => {

        const { name, value, files } = e.target;


        if (name)
            console.log("Mlih")

        setImage(e.target.files[0]);
        console.log(e.target)
        console.log(e.target.files)
    }


    const createProduct = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for sending FormData
                },
            });

            // Handle success, e.g., show a success message
            console.log('Data successfully inserted:', response.data);
            navigate('/')

        } catch (error) {
            // Handle error, e.g., show an error message
            console.error('Error inserting data:', error);
        }





        /*


        const response = await axios.post("http://1270.0.1:8000/products", formData)
            .then(({ data }) => {
                console.log(data.message)
                navigate('/')
            })
            .catch(({ response }) => {
                if (response.status === 442) {
                    console.log(response.data.message)
                } else {
                    console.log(response.data.message)

                }
            })*/
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="conl-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title"> Create Form </h3>
                            <hr>
                            </hr>
                            <div className="form-wrapper">
                                <form onSubmit={createProduct}>
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
                                        <input name="image"  type="file" accept="image/*" className="form-control" onChange={changeHandler} />
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
