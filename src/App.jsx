
// import './App.css'
import React from 'react';
import { Container, Navbar, Row, Col, Card, Button, } from 'react-bootstrap';

const productsArr = [
{
title: 'Colors',
price: 100,
imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
},
{
title: 'Black and white Colors',
price: 50,
imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
},
{
title: 'Yellow and Black Colors',
price: 70,
imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
},
{
title: 'Blue Color',
price: 100,
imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
}
];

function App() {


  return (
    <div style={{backgroundColor: '#f8f9fa', minHeight: '100vh'}}>

  {/* Header Navigation Bar */}
  <Navbar bg='dark' variant='dark' className='justify-content-center py-3'>
    <Navbar.Brand className='fs-3 fw-bold'>The Generics</Navbar.Brand>
  </Navbar>

  {/* Main Store Layout */}
 <Container className='py-5'>
 <h2 className='text-center mb-5 fw-semibold' style={{fontFamily: 'Seoge UI'}}>
  Music
 </h2>

 {/* Responsive Grid System */}
 <Row className="g-5 justify-content-center">
          {productsArr.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="d-flex justify-content-center">
              
              {/* Product Card Structure */}
              <Card className="border-0 bg-transparent text-center" style={{ width: '250px' }}>
                <Card.Title className="mb-3 fs-5 fw-semibold">{product.title}</Card.Title>
                
                {/* Product Image */}
                <div className="overflow-hidden mb-3" style={{ borderRadius: '6px' }}>
                  <Card.Img 
                    variant="top" 
                    src={product.imageUrl} 
                    alt={product.title}
                    style={{ transition: 'transform 0.3s' }}
                    className="img-fluid"
                  />
                </div>

         {/* Price and Add Button Container */}
                <Card.Body className="d-flex justify-content-between align-items-center p-0 mt-2">
                  <span className="fs-5 fw-medium">${product.price}</span>
                  <Button variant="info" className="text-white fw-bold px-3 py-1 btn-sm">
                    ADD TO CART
                  </Button>
                </Card.Body>
              </Card>

            </Col>
          ))}
        </Row>
 </Container>
    </div>
  )
}

export default App
