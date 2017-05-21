import React from 'react'
import { connect } from 'react-redux';
import cx from 'classnames';
import { findDOMNode } from 'react-dom';
import PlacesAutocomplete from 'react-places-autocomplete'
import muiClasses from 'react-toolbox/lib/input/theme.css';
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';
import { Button } from 'react-toolbox/lib/button';
import Input from "react-toolbox/lib/input";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import { getCurrentPosition, getAddressPosition, setPosition, setGeoSearch } from 'actions';

import classes from './GeoLocation.css';


@connect(
    ({ geo }) => ({ geo }),
    { getCurrentPosition, getAddressPosition, setPosition, setGeoSearch }
)
export default class GeoLocation extends React.Component {
    handlePlacesSelect = address => this.props.getAddressPosition(address);

    handleChange = address => this.setState({ address, error: null })

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
        toolboxInput.addEventListener('focus', e => {
            autocompleteInput.dispatchEvent(new Event('input', { bubbles: true }));
        })
        toolboxInput.addEventListener('keydown', e => {
            const { keyCode } = e;
            if ([13, 27, 38, 40].includes(keyCode)) {
                e.preventDefault();
                autocompleteInput.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, keyCode }));
            }
        });
    }

    renderAutocompleteItem = ({ formattedSuggestion: { mainText, secondaryText }}) => (
        <div>
            <strong>{mainText}</strong> <small className="text-muted">{secondaryText}</small>
        </div>
    );

    renderLocationChip = address => (
        <div className={classes.locationChip}>
            <Chip deletable onDeleteClick={e => this.props.setPosition({})}>
                <Avatar icon="near_me" style={{backgroundColor: '#07a'}}/>
                <span>{address}</span>
            </Chip>
        </div>
    )

    render() {
        const { label, geo: { locating, error, address, position, search }} = this.props;
        const className = cx(classes.geoLocation, {
            [classes.hideInput]: !!address || locating,
            [classes.showMap]: !!position
        });
        return (
            <div className={className} ref={c => this.component = c}>
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
                  label={label}
                  onChange={this.props.setGeoSearch}
                  onFocus={e => this.setState({ error: false })}
                  value={search}
                  error={error}
                />
                {(!locating && !address) &&
                    <Button raised primary icon="near_me" onClick={this.props.getCurrentPosition} />
                }
                {!!position && this.renderLocationChip(address)}
                {locating && <div className={classes.loading}>{locating}</div>}
                <PlacesAutocomplete
                  onChange={e => {}}
                  onSelect={this.handlePlacesSelect}
                  autocompleteItem={this.renderAutocompleteItem}
                  onEnterKeyDown={() => this.handlePlacesSelect(search)}
                />
            </div>
        )
    }
}
