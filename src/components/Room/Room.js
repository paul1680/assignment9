import React from 'react';
import { Card } from 'react-bootstrap';
import { hotel } from '../fakeData/hotel';
import { useParams } from 'react-router-dom';
import './Room.css'

const Room = (props) => {
    const {id} = useParams();
    const {name} = props.info[id];
    return (

        <div class='row room' id='room'>
            <div class='col-md-6'>
                <h2>Rooms in {name}</h2>
                {
                    hotel.map(data=>
            <Card class='roomImg'>
        <Card.Img variant="top" src={data.img} />
        <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
        <Card.Text>
                        {data.details}
        </Card.Text>
        </Card.Body>
             </Card>)
                }
            </div>
            <div className="col-md-6">
                <h1>Google Maps</h1>
                <img src='data:image/jpeg;base64,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' alt="" />
            </div>
            
        </div>
    );
};

export default Room;