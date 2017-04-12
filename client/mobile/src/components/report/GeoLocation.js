import React from 'react'
import cx from 'classnames';
import { findDOMNode } from 'react-dom';
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete'
import muiClasses from 'react-toolbox/lib/input/theme.css';
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';
import { Button } from 'react-toolbox/lib/button';
import Input from "react-toolbox/lib/input";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


import classes from './GeoLocation.css';

const geolocationErrorMsgs = [ '',
    'Please allow location access from your browser settings',
    'Position unvailable due to error, please try again',
    'Position timed out, please try again'
];

class GeoLocation extends React.Component {
    state = {
        lat: null,
        lng: null,
        address: null,
        error: null,
        loadingMessage: ''
    }

    handleDelete = e => {
        this.setState({ address: null, location: '', lat: null, lng: null });
    }

    handleGeoLocate = e => {
        if (!navigator.geolocation) {

        }
        this.setState({ loadingMessage: 'Waiting for location permission...' });
        navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng }}) => {
            this.setSelectedLocation({ address: 'Current Location', lat, lng });
        }, ({ code, message }) => {
            this.setState({ loadingMessage: false, error: geolocationErrorMsgs[code] });
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    }

    handleSelect = address => {
        this.setState({ loadingMessage: 'Looking up address coordinates...' })

        geocodeByAddress(address, (error, { lat, lng }) => {
            if (error) {
                this.setState({ loadingMessage: false, error })
            } else {
                this.setSelectedLocation({ address, lat, lng });
            }
        })
    }

    handleChange = address => this.setState({ address, error: null })

    setSelectedLocation = ({ address, lat, lng }) =>
        this.setState({ address, lat, lng, loadingMessage: false, error: false },
            () => { this.props.onSelect({ address, lat, lng }) }
        );

    componentDidMount() {
        // Re-fire input and keydown events from toolbox input to autocomplete (monkey patch)
        const node = findDOMNode(this.component);
        const toolboxInput = node.firstChild.nextSibling.firstChild;
        const autocompleteInput = node.lastChild.firstChild;
        toolboxInput.addEventListener('input', e => {
            autocompleteInput.value = toolboxInput.value;
            autocompleteInput.dispatchEvent(new Event('input', { bubbles: true }))
        });
        toolboxInput.addEventListener('blur', e => {
            autocompleteInput.dispatchEvent(new Event('blur', { bubbles: true }));
        })
        toolboxInput.addEventListener('keydown', e => {
            const { keyCode } = e;
            if ([13, 27, 38, 40].includes(keyCode)) {
                e.preventDefault();
                autocompleteInput.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, keyCode }));
            }
        });
    }

    render() {
        const cssClasses = {
            classes: muiClasses.input,
            input: muiClasses.inputElement,
            autocompleteContainer: classes.autocompleteContainer,
        }
        const AutocompleteItem = ({formattedSuggestion}) => (
            <div>
                {/* add map pin icon here */}
                <strong>{formattedSuggestion.mainText}</strong>
                {' '} {/*  space between main text and muted text  */}
                <small className="text-muted">{formattedSuggestion.secondaryText}</small>
            </div>
        );
        const { loadingMessage, address, lat, lng, error, location } = this.state;
        const position = (lat && lng) ? [lat, lng] : undefined;
        const className = cx(classes.geoLocation, {
            [classes.hideInput]: !!address || loadingMessage,
            [classes.showMap]: !!position
        });
        return (
            <div
              className={className}
              ref={c => this.component = c}
            >
                <Map
                  key={position}
                  center={position}
                  zoom={15}
                  zoomControl={false}
                  attributionControl={false}
                  dragging={false}
                  scrollWheelZoom={false}
                >
                    <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                    <Marker position={position} />
                </Map>
                <Input
                  className={classes.input}
                  label="Location"
                  onChange={v => this.setState({ location: v })}
                  onFocus={e => this.setState({ error: false })}
                  value={location}
                  error={error}
                />
                {(!loadingMessage && !address) &&
                    <Button raised primary icon="near_me" onClick={this.handleGeoLocate} />
                }
                {!!position &&
                    <div className={classes.locationChip}>
                        <Chip deletable onDeleteClick={this.handleDelete}>
                            <Avatar icon="near_me" style={{backgroundColor: '#07a'}}/>
                            <span>{address}</span>
                        </Chip>
                    </div>
                }
                {loadingMessage && <div className={classes.loading}>{loadingMessage}</div>}
                <PlacesAutocomplete
                  onChange={() => {}}
                  onSelect={this.handleSelect}
                  autocompleteItem={AutocompleteItem}
                  autoFocus={true}
                  placeholder={this.props.placeholder}
                  hideLabel={true}
                  inputName="Demo__input"
                  onEnterKeyDown={this.handleSelect}
                  classNames={cssClasses}
                />
            </div>
        )
    }
}

export default GeoLocation
