import React, { useState } from 'react';
import { Container, Button, Table, Spinner } from 'react-bootstrap';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    // 1. Set isLoading to true when clicked
    setIsLoading(true); 
    try {
      const response = await fetch('https://swapi.info/api/films');
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error.message);
    }
    // 4. Set isLoading to false once data arrives or fails
    setIsLoading(false); 
  }

  return (
    <Container className="py-5 text-center" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4 fw-bold font-monospace">STAR WARS MOVIES</h2>
      
      <Button variant="primary" onClick={fetchMoviesHandler} className="mb-4 fw-bold" disabled={isLoading}>
        Fetch Movies
      </Button>

      {/* 2 & 3. SHOW LOADER ON THE SCREEN WHILE FETCHING */}
      {isLoading && (
        <div className="my-5">
          <Spinner animation="border" variant="primary" role="status" className="mb-2" />
          <p className="text-muted fw-semibold">Loading data from backend...</p>
        </div>
      )}

      {/* RENDER TABLE ONLY WHEN NOT LOADING AND DATA EXISTS */}
      {!isLoading && movies.length > 0 && (
        <Table striped bordered hover responsive className="text-start mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Release Date</th>
              <th>Director</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.episode_id}>
                <td className="fw-bold">{movie.title}</td>
                <td>{movie.release_date}</td>
                <td>{movie.director}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}