import React from 'react';
import { Container } from 'react-bootstrap';

export default function About() {
  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4 fw-bold font-monospace fs-1">ABOUT</h2>
      <div className="d-flex flex-column flex-md-row align-items-center gap-4">
        <img 
          src="https://prasadyash2411.github.io/ecom-website/img/Band%20Members.png" 
          alt="The Generics Band" 
          className="rounded-circle shadow"
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
        <p className="fs-5 text-muted" style={{ lineHeight: '1.8' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vocalist and band 
          arrangements blend seamlessly to form iconic melodies. From classical roots to 
          modern structural pop, The Generics focus on bringing pure composition back to the center stage.
        </p>
      </div>
    </Container>
  );
}