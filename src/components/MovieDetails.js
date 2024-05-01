import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API } from '../Global';
import "../style/moviedetails.css"
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import BillComponent from './Bookticket'; 
import NavbarReact from './Navbar';
function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showBill, setShowBill] = useState(false); 
  const colors2 = ['#fc6076', '#fc466b', '#ef9d43', '#e75516'];
  const colors3 = ['#090979', '#4f4fee', '#090979', '#020024'];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        console.log("Fetching movie with ID:", id);
        const response = await axios.get(`${API}/movies/get-movie-byid/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log("Response data:", response.data);

        if (response.status === 200) {
          setMovie(response.data);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
      }
    };

    fetchMovieById();
  }, [id]);

  const handleWatchTrailer = () => {
    if (movie.trailer) {
      window.open(movie.trailer, '_blank');
    } else {
      alert('Trailer not available');
    }
  }

  const handleBookTickets = () => {
    setShowBill(true); // Show bill component when "Book Tickets" button is clicked
  }

  const handleCloseBill = () => {
    setShowBill(false); // Close bill component
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavbarReact/>
    <div className="movie-container">
      <img src={movie.poster} alt='poster' className="poster" />
      <h1 className="title">{movie.name}</h1>
      <div className="details">
        <p>Language: {movie.language}</p>
        <p>Rating: {movie.rating}
        <FontAwesomeIcon icon={faStar} className="rating-icon" /></p>
        <p>{movie.summary}</p>
      </div>
      <div className="button-container">
        <Space>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                  colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                  colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button type="primary" size="large" onClick={handleWatchTrailer}>
              Watch Trailer
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(90deg,  ${colors3.join(', ')})`,
                  colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors3).join(', ')})`,
                  colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors3).join(', ')})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button type="primary" size="large" onClick={handleBookTickets}>
              Book Tickets
            </Button>
          </ConfigProvider>
        </Space>
      </div>
      <Modal
        title="Bill"
        visible={showBill}
        onCancel={handleCloseBill}
        footer={null}
      >
        <BillComponent movie={movie} onClose={handleCloseBill} />
      </Modal>
    </div>
    </div>
  );
}

export default MovieDetails;
