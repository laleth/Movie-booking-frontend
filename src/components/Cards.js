import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'; 
import { API } from '../Global';
import "../style/cards.css";
import axios from 'axios';
//import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
//import { Button } from 'antd';

function Cardreact() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get(`${API}/movies/get-all-movies`, {
          headers: {
            Authorization: `${token}`,
          },
        });
  
        if (response.status === 200) {
          setMovies(response.data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };
  
    fetchMovies();
  }, []);
  
  return (
    <div className="card-container"> 
      {movies.map((movie) => (
        <Card key={movie._id} className="movie-card"> 
          <Card.Img variant="top" src={movie.poster} className="card-image" />
          <Card.Body>
            <Card.Title className="card-title">{movie.name}</Card.Title>
            <Card.Text className="card-text">
              {movie.language}
              <div className="rating-container">
                <FontAwesomeIcon icon={faStar} className="rating-icon" />
                <span className="rating">{movie.rating}</span>
              </div>
            </Card.Text>
            <Link 
              to={`/movies/${movie._id}`}
              className="btn btn-primary more-info-btn"
            >
              More Info
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cardreact;
