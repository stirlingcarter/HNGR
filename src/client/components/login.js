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
      .then((res) => res.json())
      .then((data) => {
        if(data){
          if (data.status == 'fail') {
            alert(data.message);
          } else {
            this.setState({auth_token: data.auth_token});
            // Redirect
            //alert(res.data.message);
            alert('auth token ' + res.token);
            this.props.navigation.navigate('Tabs', {type: type, username: this.state.username, auth_token: data.token});
            //   this.props.navigation.dispatch(resetAction);
          }
        } else {
        alert('no response object');
      }})
      .catch((e) => {
        alert('There was an error logging in.');
      });
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <FormLabel labelStyle={styles.formLabel}>Username</FormLabel>
                <FormInput containerStyle={styles.formContainer}
                           inputStyle={styles.formInput}
                           autoCorrect={false}
                           onChangeText={(username) => this.setState({username})}/>

                <FormLabel labelStyle={styles.formLabel}>Password</FormLabel>
                <FormInput containerStyle={styles.formContainer}
                           inputStyle={styles.formInput}
                           secureTextEntry={true}
                           onChangeText={(password) => this.setState({password})}/>

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
        backgroundColor: '#a0e7a0',
        padding: 30,
        flex: 1,
        flexDirection: 'column',
    },
    plainText: {
        fontSize: 15,
        marginTop: 70,
        marginBottom: 7
    },
    button: {
      marginTop: 15
    },
    formLabel: {
        color: 'black'
    },
    formContainer: {
        backgroundColor: '#dbdbdb'
    },
    formInput: {
        color: 'black'
    }
});
