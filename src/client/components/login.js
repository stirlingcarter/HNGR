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

    onLogin(type) {
        // reset for Navigation state
        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({ routeName: 'Tabs', params: { type: this.props.navigation.state.type}})
        //     ]
        // });

        //let path = this.props.navigation.state.type = "fdcAdmin" ? "fdcs" : "users";
        fetch(`http://18.216.237.239:5000/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          this.setState({auth_token: res.token});
          alert(`Success! You may now access protected content.`);
          // Redirect
          this.props.navigation.navigate('Tabs', {type});
          //   this.props.navigation.dispatch(resetAction);
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
                <Text style={styles.plainText}>Login</Text>

                <FormLabel>Username</FormLabel>
                <FormInput onChangeText={(username) => this.setState({username})}/>

                <FormLabel>Password</FormLabel>
                <FormInput onChangeText={(password) => this.setState({password})}
                           secureTextEntry={true}/>

                <Button
                    style={styles.button}
                    title="Sign In"
                    onPress={() => this.onLogin(params.type)}
                />

                <View>
                    <Text style={styles.plainText}>Don't have an account? </Text>
                    <Button
                      title="Click Here"
                      onPress={() => this.onRegister(params.type)}
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
    },
    plainText: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 7
    },
    button: {
      marginTop: 10
    }
});
