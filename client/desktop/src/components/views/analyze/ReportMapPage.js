import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux';

import classes from './ReportMapPage.css'

/*const lats = []
const lngs = []
window.lats = lats;
window.lngs = lngs;*/

function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

class ReportMapPage extends React.Component {

    constructor(props) {
        super(props)
        this.markers = [];
    }

    componentDidMount() {
        const mapContainer = findDOMNode(this.mapContainer)
        const map = window.map = this.map = L.map(this.mapContainer).setView([45.11326925230233, -122.46597290039064], 9)
            /*.on('click', e => {
                lats.push(e.latlng.lat)
                lngs.push(e.latlng.lng)
                console.log(lats.length)
            });*/
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        this.renderMarkers(this.props.list);
    }

    componentWillReceiveProps(nextProps) {
        this.renderMarkers(nextProps.list)
    }

    renderVehicle(vehicle) {
        return capitalize(vehicle.color) + ' ' + capitalize(vehicle.make) + ' ' + capitalize(vehicle.model);
    }

    renderPerson({ sex, eye_color, hair_length, hair_color, weight }) {
        const getEyes = () => eye_color ? eye_color.replace('_',' ') + ' eyes' : '';
        const getHair = () => {
            const color = hair_color ? hair_color.replace('_',' ') : null;
            const vals = [hair_length, color].filter(v => !!v);
            if (vals.length > 0)
                return vals.join(' ') + ' hair'
            return ''
        }
        return capitalize(sex) + ' with ' + getEyes() + getHair() + ' weighing ' + weight + 'lbs'
    }

    renderMarkers(list) {
        this.markers.map(marker => this.map.removeLayer(marker));
        this.markers = []
        list.forEach(report => {
            if (!report.lat || !report.lng) {
                return;
            }
            let popup = [report.date, report.location]
                .concat(report.vehicles.map(this.renderVehicle))
                .concat(report.people.map(this.renderPerson))
                .join('<br/>')
            const marker = L.marker([report.lat, report.lng]);
                marker.addTo(this.map)
                .bindPopup(popup);
            this.markers.push(marker)
        });
    }

    render() {
        return (
            <div className={classes.mapContainer} ref={e => this.mapContainer = e}></div>
        )
    }
}

const mapStateToProps = ({ reports: { list } }) => ({ list });

export default connect(mapStateToProps, {
})(ReportMapPage);
