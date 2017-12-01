import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class PickupScreen extends React.Component {
    static navigationOptions = {
        title: 'Pickup'
    };

    constructor(props) {
        super(props);
        this.state = { pickups: [] };
    }

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.plainText}>{params.type} Pickup</Text>


            </ScrollView>
        );
    }
}

const PickupScreenNav = StackNavigator({

});

export default class App extends React.Component {
    render() {
        return <PickupScreenNav />;
    }
}


const styles = StyleSheet.create({

});
