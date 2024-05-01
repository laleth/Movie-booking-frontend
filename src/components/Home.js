import React from 'react'
import NavbarReact from './Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cardreact from './Cards';

function Home() {
  return (
    <div>
        <NavbarReact/>
        <Cardreact/>
        </div>
  )
}

export default Home