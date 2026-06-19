import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Button, Table, Spinner, Alert, Form } from 'react-bootstrap';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // References for form inputs to access values without re-rendering the component
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  // Firebase URL: Replace with your specific Realtime Database project URL
  const FIREBASE_URL = 'https://react-form-24af0-default-rtdb.firebaseio.com/movies.json';

  // Fetch movies from Firebase and transform object format to array format
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(FIREBASE_URL);
      if (!response.ok) throw new Error('Failed to fetch movies.');
      
      const data = await response.json();
      
      const loadedMovies = [];
      // Firebase returns an object of objects; transform it into an array
      for (const key in data) {
        loadedMovies.push({ id: key, ...data[key] });
      }
      setMovies(loadedMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  // Run fetch on initial component load
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // Handle form submission to create (POST) a new movie in Firebase
  async function submitHandler(event) {
    event.preventDefault();
    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
 //perform POST Request
    await fetch(FIREBASE_URL, {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: { 'Content-Type': 'application/json' }
    });

    //Clear the form fields
    titleRef.current.value = '';
    openingTextRef.current.value = '';
    releaseDateRef.current.value = '';
    
    // Automatically refresh the table after adding
    fetchMoviesHandler(); 
  }

  // Handle movie deletion (DELETE) via unique Firebase ID
  async function deleteMovieHandler(id) {
    await fetch(`https://react-form-24af0-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: 'DELETE'
    });
    // Filter the state array to remove the deleted item from the UI immediately
    setMovies((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      {/* Input Form */}
      <Form onSubmit={submitHandler} className="p-4 border rounded bg-light mb-5">
        <Form.Group className="mb-3"><Form.Label>Title</Form.Label><Form.Control type="text" ref={titleRef} required /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>Opening Text</Form.Label><Form.Control as="textarea" ref={openingTextRef} required /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>Release Date</Form.Label><Form.Control type="date" ref={releaseDateRef} required /></Form.Group>
        <Button type="submit">Add Movie</Button>
      </Form>

      {/* States: Loading and Error */}
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Movies Table */}
      {!isLoading && (
        <Table striped bordered hover>
          <thead><tr><th>Title</th><th>Action</th></tr></thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td><Button variant="danger" onClick={() => deleteMovieHandler(m.id)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}