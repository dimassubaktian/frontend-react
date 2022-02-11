import { useState } from "react";
import { Card, Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory, Link } from 'react-router-dom';

function PostCreate() {
    //state
    const [title, setTitle] = useState([])
    const [content, setContent] = useState([])

    // state validation
    const [validation, setValidation] = useState([])

    // history
    const history = useHistory();

    // store post: proses menyimpan
    const storePost = async (e) => {
        e.preventDefault()

        // Kirim data ke server
        await axios.post('http://localhost:3000/api/posts/store', {
            title: title,
            content: content
        })
            .then(() => {
                // redirect page
                history.push('/posts')
            })
            .catch((error) => {
                // assign validation on state
                setValidation(error.response.data)
            })
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            {
                                validation.errors &&
                                <Alert variant="danger">
                                    <ul className="mt-0 mb-0">
                                        {
                                            validation.errors.map((error, index) => (
                                                <li key={index}>{`${error.param}:${error.msg}`}</li>
                                            ))
                                        }
                                    </ul>
                                </Alert>
                            }

                            <Form onSubmit={storePost}>
                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Title" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formContent">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Masukkan Content" />
                                </Form.Group>
                                <Button as={Link} to="/posts" variant="danger" className="me-1">Kembali</Button>
                                <Button variant="primary" type="submit">
                                    Simpan
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default PostCreate;