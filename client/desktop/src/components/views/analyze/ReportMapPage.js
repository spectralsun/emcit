import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';

import { ReportMarker } from 'map';
import classes from './ReportMapPage.css';


@connect(({ reports }) => ({ reports }))
export default class ReportMapPage extends React.Component {
    state = {
        center: [45.11326925230233, -122.46597290039064]
    }

    render() {
        const reports = this.props.reports.filter(({ lat, lng }) => !!lat && !!lng);
        return (
            <Map
              className={classes.mapContainer}
              center={this.state.center}
              zoom={9}
              attributionControl={false}
            >
                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                {reports.map(report => <ReportMarker {...report} />)}
            </Map>
        )
    }
}
