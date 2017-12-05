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

                <Button
                    style={styles.button}
                    title="Post Pickup Request"
                    onPress={() => this.pickupReq(params.type)}
                />

                /*{renderIf(params.type==='fdcAdmin',
                    <fdcOptions />
                )}*/

                <Button
                    style={styles.button}
                    title="View Pickup Requests"
                    onPress={() => this.onRegister(params.type)}
                />

                <Button
                    style={styles.button}
                    title="Accept Pickup Requests"
                    onPress={() => this.onRegister(params.type)}
                />

                <Button
                    style={styles.button}
                    title="Set Volunteer Info"
                    onPress={() => this.onRegister(params.type)}
                />

                <Button
                    style={styles.button}
                    title="Goggle Map Directions"
                    onPress={() => this.onRegister(params.type)}
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
