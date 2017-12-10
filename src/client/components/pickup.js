import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Button } from 'react-native-elements';

export default class PickupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.pickupReq = this.pickupReq.bind(this);
        this.pickupView = this.pickupView.bind(this);
        this.setVolInfo = this.setVolInfo.bind(this);
        this.getDirections = this.getDirections.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.fdcOptions = this.fdcOptions.bind(this);
    }

    // user story 1
    pickupReq(type, username, auth_token) {
        this.props.navigation.navigate('PForm',{type, username, auth_token});
    }

    // user story 5 & 8
    pickupView(type) {
        this.props.navigation.navigate('PView',{type});
    }

    // user story 6
    setVolInfo() {
        this.props.navigation.navigate('VInfo');
    }

    // user story 9
    getDirections() {
        this.props.navigation.navigate('PMap');
    }

    getProfile(type) {
        this.props.navigation.navigate('Profile', {type});
    }

    fdcOptions() {
        this.props.navigation.navigate('FDCOpt');
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pickup</Text>

                <Button
                    style={styles.button}
                    title="Post Pickup Request"
                    onPress={() => this.pickupReq(params.type, params.username, params.token)}
                />

                <Button
                    style={styles.button}
                    title="View or Accept Pickups"
                    onPress={() => this.pickupView(params.type)}
                />

                <Button
                    style={styles.button}
                    title="Set Volunteer Info"
                    onPress={() => this.setVolInfo()}
                />

                <Button
                    style={styles.button}
                    title="Google Map Directions"
                    onPress={() => this.getDirections()}
                />

                <Button
                    style={styles.button}
                    title="View Profile"
                    onPress={() => this.getProfile(params.type)}
                />

                <Button
                    style={styles.button}
                    title="FDC Options"
                    onPress={() => this.fdcOptions()}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a0e7a0',
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
    button: {
        marginTop: 15
    }
});
