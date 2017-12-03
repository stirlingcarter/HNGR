import React from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';

export default class PickupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pickups: [] };
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.plainText}>Pickup</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#fff',
        padding: 30,
        flex: 1,
        flexDirection: 'column'
    },
    container: {
        marginBottom: 20
    },
    plainText: {
        fontSize: 15,
        marginBottom: 15
    }
});
