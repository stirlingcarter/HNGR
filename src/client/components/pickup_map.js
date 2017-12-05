import React from 'react';
import { View} from 'react-native';
import { MapView } from 'expo';


export default class PickupMap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 36.1429722,
                    longitude: -86.8079109,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                }}
            />
        );
    }
}