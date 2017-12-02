import React from 'react';
import { Button, StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import { StackNavigator } from 'react-navigation';
import RegisterScreen from './register';

export class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login'
    };

    constructor(props) {
        super(props);
        this.state = { user: '', password: ''};
    }

    render() {
        const { params } = this.props.navigation.state;
        const { navigate } = params.navigate;

        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.plainText}>{params.type} Login</Text>

                <View style={styles.container}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                        style={styles.input} onChangeText={(user) => this.setState({user})}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.input} onChangeText={(password) => this.setState({password})}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.container}>
                    <Button
                        style={styles.button}
                        title="Sign In"
                    />
                </View>

                <View style={styles.container}>
                    <Text
                    style={styles.plainText}
                    onPress={() => navigate('Register', { type: params.type})}>Don't have an account? Click here</Text>

                </View>
            </ScrollView>
        );
    }
}

const LoginScreenNav = StackNavigator({
  Login: {screen: LoginScreen},
  Register: {screen: RegisterScreen},
});

export default class App extends React.Component {
    render() {
        return <LoginScreenNav />;
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
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input: {
        height: 60,
        fontSize: 30,
        backgroundColor: '#DCDCDC'
    },
    button: {

    }
});
