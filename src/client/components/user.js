import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class UserScreen extends React.Component {
    static navigationOptions = {
        title: 'User'
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
                <Text style={styles.plainText}>{params.type} User</Text>


            </ScrollView>
        );
    }
}

const UserScreenNav = StackNavigator({

});

export default class App extends React.Component {
    render() {
        return <UserScreenNav />;
    }
}


const styles = StyleSheet.create({

});
