import { geocodeByAddress } from 'react-places-autocomplete'

import { setPositionError, setPosition } from 'actions';

const GEOLOCATION_ERROR = [ '',
    'Please allow location access from your browser settings',
    'Position unvailable due to error, please try again',
    'Position timed out, please try again'
];

export default class Geo {
    constructor(store) {
        this.dispatch = store.dispatch;
        this.observeStore(store, ({ geo }) => geo, ({ locating, address }) => {
            if (locating) {
                address ? this.getAddressPosition(address) : this.getCurrentPosition();
            }
        });
    }

    getCurrentPosition() {
        if (!navigator.geolocation) {
            return this.dispatch(setPositionError('Current Location is unavailable'));
        }
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        const handleSuccess = ({ coords: { latitude: lat, longitude: lng }}) =>
            this.dispatch(setPosition({ address: 'Current Location', position: { lat, lng }}));

        const handleError = ({ code }) =>
            this.dispatch(setPositionError(GEOLOCATION_ERROR[code]))

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options)
    }

    getAddressPosition(address) {
        geocodeByAddress(address, (error, { lat, lng }) => {
            error
                ? this.dispatch(setPositionError(error))
                : this.dispatch(setPosition({ address, position: { lat, lng }}));;
        })
    }

    observeStore(store, select, onChange) {
        let currentState;

        const handleChange = () => {
            const nextState = select(store.getState());
            if (nextState !== currentState) {
                currentState = nextState;
                onChange(currentState);
            }
        }

        const unsubscribe = store.subscribe(handleChange);
        handleChange();
        return unsubscribe;
    }
}
