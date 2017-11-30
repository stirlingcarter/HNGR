import React from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './components/login';
import RegisterScreen from './components/register';

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <Text style={styles.title}>HNGR</Text>
                </View>

                <View style={styles.buttons}>
                    <Button
                        style={styles.button}
                        onPress={() => navigate('Login', { type: 'Donor', navigation: navigate })}
                        title="I am a donor"
                    />
                    <Button
                        style={styles.button}
                        onPress={() => navigate('Login', { type: 'Volunteer', navigation: navigate })}
                        title="I am a volunteer"
                    />
                    <Button
                        style={styles.button}
                        onPress={() => navigate('Login', { type: 'FDC', navigation: navigate })}
                        title="I am an FDC"
                    />
                    <Button
                        style={styles.button}
                        onPress={() => navigate('Login', { type: 'Hungry', navigation: navigate })}
                        title="I am hungry"
                    />
                </View>
            </ScrollView>
        );
    }
}

const HngrApp = StackNavigator({
    Home:   { screen: HomeScreen },
    Login:  { screen: LoginScreen },
    Register: { screen: RegisterScreen },
});

export default class App extends React.Component {
    render() {
        return <HngrApp />;
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#fff',
        padding: 30,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    container: {
        marginBottom: 20
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 80
    },
    buttons: {
        justifyContent: 'center'
    },
    button: {
        marginBottom: 10
    }
});
