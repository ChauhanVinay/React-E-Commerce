import React, { useState } from 'react';
import { Container, Button, Table } from 'react-bootstrap';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Your clean async/await fetch handler
  async function fetchMoviesHandler() {
    setIsLoading(true);
    try {
      const response = await fetch('https://swapi.info/api/films');
      
      if (!response.ok) {
        throw new Error('Something went wrong while fetching movies!');
      }

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error.message);
    }
    setIsLoading(false);
  }

  return (
    <Container className="py-5 text-center" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4 fw-bold font-monospace">STAR WARS MOVIES</h2>
      
      <Button variant="primary" onClick={fetchMoviesHandler} className="mb-4 fw-bold">
        {isLoading ? 'Loading...' : 'Fetch Movies'}
      </Button>

      {movies.length > 0 && (
        <Table striped bordered hover responsive className="text-start">
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