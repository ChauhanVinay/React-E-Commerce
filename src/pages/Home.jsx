import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";

//Array containing the tour data matching the reference  site
const toursData = [
    { date: 'DETROIT, MI', venue: 'DTE ENERGY MUSIC THEATRE', label: 'JUL16' },
  { date: 'TORONTO, ON', venue: 'BUDWEISER STAGE', label: 'JUL19' },
  { date: 'BRISTOW, VA', venue: 'JIGGY LUBE LIVE', label: 'JUL 22' },
  { date: 'PHOENIX, AZ', venue: 'AK-CHIN PAVILION', label: 'JUL 29' },
  { date: 'LAS VEGAS, NV', venue: 'T-MOBILE ARENA', label: 'AUG 2' },
  { date: 'CONCORD, CA', venue: 'CONCORD PAVILION', label: 'AUG 7' }
];

export default function Home() {
    return (
        <div>
            {/* Album Banner Highlight */}
            <div className="bg-secondary text-white text-center py-4 d-flex flex-column align-items-center" style={{ backgroundColor: '#777' }}>
      <Button variant="outline-info" size="lg" className="text-white border-info px-4 py-2 mb-3 fs-4">
        Get our Latest Album
      </Button>   
      <Button variant="outline-info" className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px', borderWidth: '2px' }}>
        <span className="text-info fs-3">►</span>
      </Button>   
            </div>

            {/* Tours List Section */}
 <Container className="py-5" style={{ maxWidth: '800px' }}>
<h2 className="text-center mb-5 fw-bold font-monospace fs-1">TOURS</h2>
 {toursData.map((tour, index) => (
    <Row key={index} className="align-items-center border-bottom border-secondary py-2 my-2 text-center text-md-start">
    <Col xs={12} md={2} className="fw-bold fs-5 text-secondary">
        {tour.label}
    </Col>
    <Col xs={12} md={3} className="text-muted">
        {tour.date}
    </Col>
    <Col xs={12} md={4} className="text-dark fw-medium">
        {tour.venue}
    </Col>
    <Col xs={12} md={3} className="text-center text-md-end mt-2 mt-md-0">
        <Button variant="info" className="text-white fw-bold w-100 btn-sm py-2" style={{ maxWidth: '150px' }}>
            BUY TICKETS
        </Button>
    </Col>

    </Row>
 ))}
            </Container>
        </div>
    );
}