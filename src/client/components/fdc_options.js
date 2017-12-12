import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Button } from 'react-native-elements';


export default class fdcOptions extends React.Component {
    constructor(props) {
        super(props);
        this.onView = this.onView.bind(this);
        this.setInstructs = this.setInstructs.bind(this);
        this.setOpts = this.setOpts.bind(this);
    }

    onView() {

    }

    setInstructs() {
        this.props.navigation.navigate('DInfo');
    }

    setOpts() {
        this.props.navigation.navigate('FDCInfo');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>FDC Options</Text>

                <Button
                    style={styles.button}
                    title="View Incoming Deliveries"
                    onPress={() => this.onView()}
                />

                <Button
                    style={styles.button}
                    title="Set Delivery Instructions"
                    onPress={() => this.setInstructs()}
                />

                <Button
                    style={styles.button}
                    title="Set Hours and Locations"
                    onPress={() => this.setOpts()}
                />
            </View>
        );
    }
};

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

