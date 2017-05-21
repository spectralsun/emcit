import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import { capitalize } from 'common/util';
import { Person, Vehicle } from 'c/report';
import classes from './ReportMarker.css';


const filterSuspiciousPerson = ({ category }) => category === 'suspicious_person';
const filterBuyer = ({ category }) => category === 'buyer';
const filterVictim = ({ category }) => category === 'victim';

export default /* ReportMarker */ ({
    lat, lng,
    date,
    location,
    room_number,
    details,
    vehicles,
    people
}) => (
    <Marker position={[lat, lng]}>
        <Popup>
            <div>
                <div>{date}</div>
                {location && <div>{location}</div>}
                {room_number && <div>Room number: {room_number}</div>}
                {details && <div>{details}</div>}
                {people.filter(filterSuspiciousPerson).length > 0 &&
                    <h3 className={classes.heading}>Suspicious People</h3>}
                {people.filter(filterSuspiciousPerson).map((person, key) =>
                    <Person key={key} {...person} />
                )}
                {people.filter(filterBuyer).length > 0 &&
                    <h3 className={classes.heading}>Buyer(s)</h3>}
                {people.filter(filterBuyer).map((person, key) =>
                    <Person key={key} {...person} />
                )}
                {people.filter(filterVictim).length > 0 &&
                    <h3 className={classes.heading}>Victim(s)</h3>}
                {people.filter(filterVictim).map((person, key) =>
                    <Person key={key} {...person} />
                )}
                {vehicles.length > 0 &&
                    <h3 className={classes.heading}>Vehicles</h3>}
                {vehicles.map((vehicle, key) =>
                    <Vehicle key={key} {...vehicle} />
                )}
            </div>
        </Popup>
    </Marker>
);
