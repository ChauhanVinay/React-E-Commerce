import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function ContactUs() {
  const nameRef = useRef('');
  const emailRef = useRef('');
  const phoneRef = useRef('');

  async function submitHandler(event) {
    event.preventDefault();
    const contactData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };

    //  Firebase URL
    await fetch('https://react-form-24af0-default-rtdb.firebaseio.com/contacts.json', {
      method: 'POST',
      body: JSON.stringify(contactData),
      headers: { 'Content-Type': 'application/json' }
    });

    alert("Thank you! Your message has been sent.");
    // Clear form
    nameRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
  }

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Contact Us</h2>
      <Form onSubmit={submitHandler} className="p-4 border rounded bg-light">
        <Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control type="text" ref={nameRef} required /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>Email ID</Form.Label><Form.Control type="email" ref={emailRef} required /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>Phone Number</Form.Label><Form.Control type="tel" ref={phoneRef} required /></Form.Group>
        <Button type="submit" variant="primary">Submit</Button>
      </Form>
    </Container>
  );
}