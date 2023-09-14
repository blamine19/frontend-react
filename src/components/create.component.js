import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';



export default function CreateProduct() {


    const navigate = useNavigate()
    const { title, setTitle } = useState('')
    const { description, setDescription } = useState('')
    const { image, setImage } = useState('')

    const changeHandler = (e) => {
        setImage(e.target.files[0])
    }


    const createProduct = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)


        await axios.post('http://127.0.0.1:8000/api/products', formData)
            .then(({ data }) => {
                console.log(data.message)

                /*useNavigate('/')*/
            })
            .catch(({ response }) => {
                if (response.status == 442) {
                    console.log(response.data.errors)
                }
                else {
                    console.log(response.data.message)
                }
            })
    }

    return (

        <Container>
            <Row>
                <Col>
                    <Form onSubmit={createProduct}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Description</Form.Label>
                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="Enter the Description"
                                className="mb-3"
                            >
                                <Form.Control as="textarea" placeholder="Leave a comment here" />
                            </FloatingLabel>
                        </Form.Group>



                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" placeholder="" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col>&nbsp;
                </Col>
            </Row>
        </Container>
    )
}