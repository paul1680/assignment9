import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import calender_icon from '../../Icon/calender_icon.png'
import './Booking.css';

const Booking = (props) => {

    const {id} = useParams();
    const {name, details} = props.info[id];
    return (
        <div className='bookingCard'>
            <div class="locationInfo row">

            <div className="col-md-6">

        <h1>{name}</h1>
        <p>{details}</p>

        </div>

<div className="col-md-6">
    <form action="" className="bookingForm">
        <div className="form-group">
            <label for="Origin">origin</label>
            <input type="text" id="origin" class="form-control bg-light" placeholder="Origin"></input>
        </div>
        <div className="form-group">
            <label for="Destination">Destination</label>
            <input type="text" id="destination" class="form-control bg-light" placeholder="Destination"></input>
        </div>

        <div className="form-row">
            <div class="form-group col-md-6">
                <label for="from">From <img className='calender' src={calender_icon} alt=""/></label>
                <input type="date" class="form-control bg-light" id="from"/>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To <img className='calender' src={calender_icon} alt=""/></label>
                <input type="date" class="form-control bg-light" id="to"/>
            </div>
        </div>
            
        <br/>
        <Link to={"/room/"+ id}>
            
            <button className="btn btn-warning col-md-4" href="">Start Booking</button>
        </Link>
    </form>
</div>

</div>

        </div>
    );
};

export default Booking;