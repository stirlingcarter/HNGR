import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class LandingScreen extends React.Component {
    static navigationOptions = {
        title: 'Landing'
    };

    constructor(props) {
        super(props);
        this.state = { userid: '' };
    }

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.plainText}>{params.type} Landing</Text>


            </ScrollView>
        );
    }
}

const LandingScreenNav = StackNavigator({

});

export default class App extends React.Component {
    render() {
        return <LandingScreenNav />;
    }
}


const styles = StyleSheet.create({

});
