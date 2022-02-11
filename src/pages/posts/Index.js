import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";

function PostIndex() {
    // define state
    const [posts, setPosts] = useState([]);

    // useEffect Hook
    useEffect(() => {
        // memanggil method fetch data
        fecthData();
    }, []);

    const fecthData = async () => {
        const response = await axios.get('http://localhost:3000/api/posts')
        const data = await response.data.data

        setPosts(data)
    }

    const deletePost = async (id) => {
        await axios.delete(`http://localhost:3000/api/posts/delete/${id}`)

        fecthData()
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Button as={Link} to="/posts/create" variant="success" className="mb-3">Tambah Post</Button>
                            <Table striped bordered hover className="mb-1">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Title</th>
                                        <th>Content</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post, index) => (
                                        <tr key={post.id}>
                                            <td>{index + 1}</td>
                                            <td>{post.title}</td>
                                            <td>{post.content}</td>
                                            <td className="text-center">
                                                <Button as={Link} to={`/posts/edit/${post.id}`} variant="primary" size="sm" className="me-2 mb-1 mt-1">
                                                    Edit
                                                </Button>
                                                <Button onClick={() => deletePost(post.id)} variant="danger" size="sm" className="mb-1 mt-1">
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default PostIndex;