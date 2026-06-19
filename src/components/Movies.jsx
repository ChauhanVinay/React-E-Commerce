import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Table, Spinner, Alert } from 'react-bootstrap';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  
  // useRef keeps track of the active timer interval so we can clear it anywhere
  const retryIntervalRef = useRef(null);

  // The main async/await movie fetching function
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.info/api/films');
      
      if (!response.ok) {
        // Deliverable 1: Updated custom error message text
        throw new Error('Something went wrong ....Retrying');
      }

      const data = await response.json();
      setMovies(data);
      stopRetryingHandler(); // If it passes, clear any active retry interval timers
    } catch (err) {
      setError(err.message);
      // Deliverable 2: If it fails and we aren't already retrying, start the 5-second interval loop
      if (!isRetrying) {
        startRetryingLoop();
      }
    }
    setIsLoading(false);
  }

  // Starts calling the API automatically every 5 seconds
  function startRetryingLoop() {
    setIsRetrying(true);
    retryIntervalRef.current = setInterval(() => {
      fetchMoviesHandler();
    }, 5000);
  }

  // Deliverable 3: Cancels/Stops the auto-retry loop completely
  function stopRetryingHandler() {
    setIsRetrying(false);
    if (retryIntervalRef.current) {
      clearInterval(retryIntervalRef.current);
    }
  }

  // Cleanup: Clears the timer if the user leaves the page component entirely
  useEffect(() => {
    return () => {
      if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
    };
  }, []);

  return (
    <Container className="py-5 text-center" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4 fw-bold font-monospace">STAR WARS MOVIES</h2>
      
      <div className="mb-4">
        <Button 
          variant="primary" 
          onClick={fetchMoviesHandler} 
          disabled={isLoading}
          className="me-2 fw-bold"
        >
          {isLoading ? 'Loading...' : 'Fetch Movies'}
        </Button>

        {/* Deliverable 3: Cancel button displays on screen while retrying is active */}
        {isRetrying && (
          <Button variant="danger" onClick={stopRetryingHandler} className="fw-bold">
            Cancel Retry
          </Button>
        )}
      </div>

      {/* ERROR STATUS ALERT CONTAINER */}
      {error && (
        <Alert variant="danger" className="my-3 mx-auto" style={{ maxWidth: '500px' }}>
          {error}
        </Alert>
      )}

      {/* LOADING SPINNER STATUS */}
      {isLoading && (
        <div className="my-4">
          <Spinner animation="border" variant="primary" className="mb-2" />
          <p className="text-muted small">Contacting network...</p>
        </div>
      )}

      {/* MOVIES DATA PRESENTATION VIEW */}
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