import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Button } from 'react-native-elements';
import renderIf from './renderif';
// import fdcOptions from './fdc_pickup';


export default class PickupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.pickupReq = this.pickupReq.bind(this);
    }

    pickupReq(type) {
        this.props.navigation.navigate('Form',{type});
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pickup</Text>

                /* TODO: DONOR
                * conditional render a form for submissions (instead of this button)
                * */
                <Button
                    title="Post Pickup Request"
                    onPress={() => this.pickupReq(params.type)}
                />

                /*{renderIf(params.type==='fdcAdmin',
                    <fdcOptions />
                )}*/

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
    },
    plainText: {
        fontSize: 15,
        marginBottom: 15
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 50,
    },
});
