import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";

const productsArr = [
  {
    id: "p1",
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    id: "p2",
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    id: "p3",
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    id: "p4",
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

export default function ProductList({ onShowCart }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <Container className="py-5" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-5 fw-bold font-monospace fs-1">MUSIC</h2>
      
      <Row className="g-5 justify-content-center">
        {productsArr.map((product) => (
          <Col
            key={product.id}
            xs={12}
            md={6}
            className="d-flex justify-content-center mb-4"
          >
            <div className="text-center" style={{ width: "250px" }}>
              {/* Title links to product detail page */}
              <Link
                to={`/product/${product.id}`}
                className="text-decoration-none text-dark"
              >
                <h3 className="fs-4 fw-semibold mb-3">{product.title}</h3>
              </Link>

              {/* Image links to product detail page */}
              <Link to={`/product/${product.id}`}>
                <div className="overflow-hidden rounded shadow-sm mb-3">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="img-fluid"
                    style={{
                      height: "250px",
                      width: "250px",
                      objectFit: "cover",
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
              </Link>

              <div className="d-flex justify-content-between align-items-center mt-3 px-2">
                <span className="fs-5 fw-bold">${product.price}</span>
                <Button
                  variant="info"
                  className="text-white fw-bold px-3 py-1 btn-sm"
                  onClick={() => addItemToCart(product)}
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <Button
          variant="secondary"
          className="fw-bold px-4 py-2 bg-dark text-info border-0"
          onClick={onShowCart}
        >
          See the cart
        </Button>
      </div>
    </Container>
  );
}