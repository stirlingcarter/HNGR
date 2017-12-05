import React from 'react';
import { StyleSheet, View, Text, Alert} from 'react-native';
import { Button, FormLabel, FormInput} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onRegister = this.onRegister.bind(this);
    }

    onRegister(type) {
        this.props.navigation.navigate('Register', {type});
    }

    onLogin() {
        // reset for Navigation state
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Tabs' })
            ]
        });

        var path = this.props.navigation.state.type = "FDC" ? "fdcs" : "users";
        fetch(`http://18.216.237.239:5000/${path}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          username: this.state.user,
          password: this.state.password
        })
      })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          this.setState({auth_token: res.token});
          alert(`Success! You may now access protected content.`);
          // Redirect
            this.props.navigation.dispatch(resetAction);
        }
      })
      .catch((e) => {
        alert('There was an error logging in.');
      });
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
                    <Text style={styles.plainText} onPress={() => this.onRegister(params.type)}>Click here</Text>
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
