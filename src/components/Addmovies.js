import React, { useState, useEffect } from 'react';
import NavbarReact from './Navbar';
import axios from 'axios';
import { API } from '../Global';
import "../style/addmovies.css";
import { notification } from 'antd';

function Addmovies() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    poster: '',
    rating: '',
    trailer: '',
    summary: '',
    language: ''
  });

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  useEffect(() => {
    const fetchLastMovieId = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get(`${API}/movies/last-movie-id`,{
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true,
        });
        console.log('API Response:', response.data);
        if (response.status === 200) {
          const nextId = parseInt(response.data.id) + 1;
          setFormData(prevState => ({
            ...prevState,
            id: nextId.toString() 
          }));
        }
      } catch (error) {
        console.error('Error fetching last movie ID:', error.message);
      }
    };

    fetchLastMovieId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.post(`${API}/movies/add-movies`, formData, {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
      });
        openNotification('success', 'Movie added Successful', 'Your Movie has been added Successfully.');
        console.log('Movie added successfully:', response.data);
        setFormData({
          id: '',
          name: '',
          poster: '',
          rating: '',
          trailer: '',
          summary: '',
          language: ''
        });
    } catch (error) {
      console.error('Error adding movie:', error.message);
    }
  };

  return (
    <div>
      <NavbarReact />
      <div className='form-container'> 
        <h2 className='form-title'>Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label htmlFor="poster">Poster URL:</label>
            <input type="text" id="poster" name="poster" value={formData.poster} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label htmlFor="rating">Rating:</label>
            <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label htmlFor="trailer">Trailer URL:</label>
            <input type="text" id="trailer" name="trailer" value={formData.trailer} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label htmlFor="summary">Summary:</label>
            <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label htmlFor="language">Language:</label>
            <input type="text" id="language" name="language" value={formData.language} onChange={handleChange} required />
          </div>

          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
}

export default Addmovies;
