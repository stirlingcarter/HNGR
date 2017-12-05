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

    }

    setOpts() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>FDC Options</Text>
                /* TODO: FDC MANAGER
                * probably render in a list
                * */
                <Button
                    title="View Incoming Deliveries"
                    onPress={() => this.onView()}
                />

                /* TODO: FDC MANAGER
                * attached to an incoming delivery item
                * */
                <Button
                    title="Set Delivery Instructions"
                    onPress={() => this.setInstructs()}
                />

                /* TODO: FDC MANAGER */
                <Button
                    title="Set Hours and Locations"
                    onPress={() => this.setOpts()}
                />
            </View>
        );
    }
};

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

