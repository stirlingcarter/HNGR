import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Button } from 'react-native-elements';
import renderIf from './renderif';
// import fdcOptions from './fdc_pickup';


export default class PickupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.pickupReq = this.pickupReq.bind(this);
        this.pickupView = this.pickupView.bind(this);
        this.pickupAccept = this.pickupAccept.bind(this);
        this.setInfo = this.setInfo.bind(this);
        this.getDirections = this.getDirections.bind(this);
    }

    pickupReq(type) {
        this.props.navigation.navigate('PForm',{type});
    }

    pickupView(type) {
        this.props.navigation.navigate('PView',{type});
    }

    pickupAccept() {

    }

    setInfo() {

    }

    getDirections() {
        this.props.navigation.navigate('PMap');
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pickup</Text>

                <Button
                    style={styles.button}
                    title="Post Pickup Request"
                    onPress={() => this.pickupReq(params.type)}
                />

                <Button
                    style={styles.button}
                    title="View Pickup Requests"
                    onPress={() => this.pickupView(params.type)}
                />

                <Button
                    style={styles.button}
                    title="Accept Pickup Requests"
                    onPress={() => this.pickupAccept()}
                />

                <Button
                    style={styles.button}
                    title="Set Volunteer Info"
                    onPress={() => this.setInfo()}
                />

                <Button
                    style={styles.button}
                    title="Goggle Map Directions"
                    onPress={() => this.getDirections()}
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
