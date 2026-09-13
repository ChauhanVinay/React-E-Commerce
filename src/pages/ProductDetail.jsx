import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Badge, Spinner, Alert, Button } from "react-bootstrap";

const PRODUCTS_DATA = {
  p1: {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    openingText: "High-quality master recording of the Colors album with full dynamic range.",
    reviews: [
      { user: "Alex", comment: "Incredible sound quality and packaging." },
      { user: "Maya", comment: "My favorite tracks of the entire year." },
    ],
  },
  p2: {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    openingText: "Classic acoustic and monochrome-themed studio sessions.",
    reviews: [
      { user: "Sam", comment: "Loved the acoustic version of track 3." },
    ],
  },
  p3: {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    openingText: "Special collector's edition record with bonus live rehearsals.",
    reviews: [
      { user: "Jordan", comment: "Definitely worth every penny for fans." },
    ],
  },
  p4: {
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    openingText: "Live festival recording with extended instrumental tracks and solos.",
    reviews: [
      { user: "Taylor", comment: "Energetic and crisp performance!" },
    ],
  },
};

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://react-form-24af0-default-rtdb.firebaseio.com/products/${productId}.json`
      );

      if (response.ok) {
        const data = await response.json();
        // Use Firebase data if it exists; otherwise, fall back to local store catalog
        setProduct(data || PRODUCTS_DATA[productId] || null);
      } else {
        // HTTP error from Firebase -> use fallback catalog
        setProduct(PRODUCTS_DATA[productId] || null);
      }
    } catch (err) {
      // Network failure / offline -> use fallback catalog
      if (PRODUCTS_DATA[productId]) {
        setProduct(PRODUCTS_DATA[productId]);
      } else {
        setError("Could not load product details. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  if (isLoading) {
    return (
      <div className="text-center my-5 py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/store">
          <Button variant="outline-primary">Back to Store</Button>
        </Link>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h3>Product Not Found</h3>
        <p className="text-muted">We couldn't find details for product ID: {productId}</p>
        <Link to="/store">
          <Button variant="primary">Return to Store</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Link to="/store" className="btn btn-outline-secondary mb-4 btn-sm">
        ← Back to Store
      </Link>

      <Row className="g-4 align-items-start">
        {/* Left: Product Image */}
        <Col md={5}>
          <div className="border p-4 rounded text-center shadow-sm bg-white">
            <img
              src={product.imageUrl || "https://via.placeholder.com/400"}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxHeight: "350px", objectFit: "contain" }}
            />
          </div>
        </Col>

        {/* Right: Info & Reviews */}
        <Col md={7}>
          <h2>{product.title}</h2>
          <Badge bg="success" className="mb-3 px-2 py-1">4.5 ★</Badge>
          <h3 className="text-primary fw-bold mb-3">${product.price}</h3>

          <hr />
          <h5>Product Description</h5>
          <p className="text-secondary">{product.openingText || "No description available."}</p>

          <hr />
          <h5>Customer Reviews</h5>
          <div className="bg-light p-3 rounded shadow-sm">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((r, index) => (
                <div key={index} className="border-bottom py-2">
                  <div className="fw-bold">{r.user}</div>
                  <div className="text-warning small mb-1">★★★★★</div>
                  <p className="mb-0 text-muted small">{r.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-muted mb-0">No reviews yet for this product.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}