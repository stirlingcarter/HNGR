import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './components/login';

export class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Home'
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Shake your phone to open the developer menu.</Text>

                <View style={styles.button}>
                    <Button
                        onPress={() => navigate('Login', { type: 'Donor'})}
                        title="I am a donor"
                    />
                    <Button
                        onPress={() => navigate('Login', { type: 'Volunteer'})}
                        title="I am a volunteer"
                    />
                    <Button
                        onPress={() => navigate('Login', { type: 'FDC'})}
                        title="I am an FDC"
                    />
                    <Button
                        onPress={() => navigate('Login', { type: 'Hungry'})}
                        title="I am hungry"
                    />
                </View>
            </View>
        );
    }
}

const HngrApp = StackNavigator({
    Home:   { screen: HomeScreen },
    Login:  { screen: LoginScreen },
});

export default class App extends React.Component {
    render() {
        return <HngrApp />;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
