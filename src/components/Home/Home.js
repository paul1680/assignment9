import React, { useState } from 'react';
import { location } from '../fakeData/location';
import { Link } from 'react-router-dom';
import './Home.css'

//const {id, name, img, details} = location;
const Home = () => {

    const [details, setDetails] =  useState([]);
    const handleClick = (e) => {
        const topBtn = document.getElementById('topBtn');
        topBtn.style.display = 'block';
        setDetails(e);
    }
    return (
<div class='row top'>
    <div class='col-md-4 detail'>
        <h1>{details.name}</h1>
        <p>{details.details}</p>
        <Link to={"/booking/" + details.id}>
        <button id='topBtn' className="btn btn-warning">Booking ></button>
        </Link>
    </div>  
    <div class='col-md-8'>
        {
            location.map(info =>
                <img className='areaImg'
                onClick={()=>handleClick(info)}
                src={info.img}
                id = {info.id}
                alt=''></img>
                )
        }
    </div>
</div>
    );
};

export default Home;