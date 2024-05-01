import React from 'react';
import { Link } from 'react-router-dom';
import "../style/landing.css";
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space} from 'antd';

function Landing() {
  const colors2 = ['#141059', '#4f55ee', '#00d4ff', '#00d4ff'];
  const colors3 = ['#eeaeca', '#8a48ba', '#8a48ba', '#94bbe9'];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
  return (
    <div className="container">
      <h1>
        Welcome to Movie Buzz
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaX648Z0EJ8PYRZUsVqbM_aIKvdxcORHGQZLtRjCeEwmfo3p36T5-5mDtFuTCFWLEvdJo&usqp=CAU" alt="Movie Camera" className="camera-icon" />
      </h1>
      <p><h3>Book your favorite movie tickets online with ease.</h3></p>
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
            <Link to="/login">
            <Button type="primary" size="large" id="signup-btn">
              Sign up
            </Button>
            </Link>
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
            <Link to="/login">
            <Button type="primary" size="large">
              Book Tickets
            </Button>
            </Link>
          </ConfigProvider>
        </Space>

      {/* <Link to="/login">
        <button id="signup-btn">Sign Up</button>
      </Link>
      <Link to="/login">
        <button id="book-ticket-btn">Book Ticket</button>
      </Link> */}
    </div>
  );
}

export default Landing;
