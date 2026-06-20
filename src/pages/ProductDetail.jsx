import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Badge, Spinner, Alert } from 'react-bootstrap';

export default function ProductDetail() {
  const { productId } = useParams(); // Retrieves ID from the URL
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch specific product details from Firebase
  const fetchProductDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Assuming your product data is under 'movies' or 'products' node in Firebase
      const response = await fetch(`https://react-form-24af0-default-rtdb.firebaseio.com/movies/${productId}.json`);
      
      if (!response.ok) throw new Error('Could not fetch product details.');
      
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  if (isLoading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-5">{error}</Alert>;
  if (!product) return <p className="mt-5 text-center">Product not found.</p>;

  return (
    <Container className="py-5">
      <Row>
        {/* Left: Images */}
        <Col md={5}>
          <div className="border p-3 rounded text-center">
            <img src={product.imageUrl || "https://via.placeholder.com/400"} alt={product.title} className="img-fluid" />
          </div>
        </Col>

        {/* Right: Info & Reviews */}
        <Col md={7}>
          <h2>{product.title}</h2>
          <Badge bg="success" className="mb-3">3.9 ★</Badge>
          <h3 className="text-primary">₹{product.price || '999'}</h3>
          
          <hr />
          <h5>Product Details</h5>
          <p>{product.openingText || "No description available."}</p>

          <hr />
          <h5>Reviews</h5>
          <div className="bg-light p-3 rounded">
            {product.reviews ? product.reviews.map((r, i) => (
              <p key={i}><strong>{r.user}:</strong> {r.comment} ★★★★★</p>
            )) : <p>No reviews yet.</p>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}