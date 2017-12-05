import React from 'react';
import { StyleSheet, View, Text,  Alert} from 'react-native';
import { Button, FormLabel, FormInput} from 'react-native-elements';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    onLogin() {
        Alert.alert(this.state);
    }

    onRegister(type) {
        this.props.navigation.navigate('Register', {type});
    }

    test() {
        this.props.navigation.navigate('Tabs');
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text style={styles.plainText}>{params.type} Login</Text>

                <FormLabel>Username</FormLabel>
                <FormInput onChangeText={(username) => this.setState({username})}/>

                <FormLabel>Username</FormLabel>
                <FormInput onChangeText={(password) => this.setState({password})}
                            secureTextEntry={true}/>

                <Button
                    title="Sign In"
                    onPress={() => this.onLogin()}
                />

                <View>
                    <Text style={styles.plainText}>Don't have an account? </Text>
                    <Button
                        title="Click Here"
                        onPress={() => this.onRegister(params.type)}
                    />
                </View>

                <View>
                    <Button
                        title="Tab test"
                        onPress={() => this.test()}
                    />
                </View>
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
