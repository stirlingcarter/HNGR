import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

export default class PickupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pickups: [] };
    }

    render() {
        return (
            <View>
                <Text style={styles.plainText}>Pickup</Text>
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
    }
});
