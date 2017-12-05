import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Button } from 'react-native-elements';


export default class PickupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pickups: [] };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pickup</Text>

                /* TODO: DONOR
                * conditional render a form for submissions (instead of this button)
                * */
                <Button
                    title="Post Pickup Request"
                    onPress={() => this.onRegister(params.type)}
                />

                /* TODO: FDC MANAGER
                * probably render in a list
                * */
                <Button
                    title="View Incoming Deliveries"
                    onPress={() => this.onRegister(params.type)}
                />

                /* TODO: FDC MANAGER
                * attached to an incoming delivery item
                * */
                <Button
                    title="Set Delivery Instructions"
                    onPress={() => this.onRegister(params.type)}
                />

                /* TODO: FDC MANAGER */
                <Button
                    title="Set Hours and Locations"
                    onPress={() => this.onRegister(params.type)}
                />

                /* TODO: VOLUNTEER
                * render in a list
                * */
                <Button
                    title="View Pickup Requests"
                    onPress={() => this.onRegister(params.type)}
                />

                /* TODO: VOLUNTEER
                * attached to a pickup request item
                * */
                <Button
                    title="Accept Pickup Requests"
                    onPress={() => this.onRegister(params.type)}
                />

                /* TODO: VOLUNTEER */
                <Button
                    title="Set Availability, Location, Pickup Radius"
                    onPress={() => this.onRegister(params.type)}
                />

                /* TODO: VOLUNTEER */
                <Button
                    title="Goggle Map Directions"
                    onPress={() => this.onRegister(params.type)}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20
    },
    plainText: {
        fontSize: 15,
        marginBottom: 15
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 80,
    },
});
