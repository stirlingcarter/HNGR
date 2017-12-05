import React from 'react';
import { StyleSheet, View, Text, Alert} from 'react-native';
import { Button, FormLabel, FormInput} from 'react-native-elements';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        this.props.navigation.navigate('Login');
    }

    onRegister() {
        var params = this.props.navigation.state;
        fetch(`http://18.216.237.239:5000/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          username: this.state.user,
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          role: params.type,
        })
      })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          this.setState({auth_token: res.auth_token});
          alert(`Success! You may now log in.`);
          // Redirect
          this.props.navigation.navigate('Login', {params.type});
        }
      })
      .catch((e) => {
        console.log(e);
        alert('There was an error logging in.');
      });
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text style={styles.plainText}>{params.type} Registration</Text>

                <FormLabel>Username</FormLabel>
                <FormInput onChangeText={(username) => this.setState({username})}/>

                <FormLabel>Password</FormLabel>
                <FormInput onChangeText={(password) => this.setState({password})}
                           secureTextEntry={true}/>

                <FormLabel>Email</FormLabel>
                <FormInput onChangeText={(email) => this.setState({email})}/>

                <FormLabel>First Name</FormLabel>
                <FormInput onChangeText={(first_name) => this.setState({first_name})}/>

                <FormLabel>Last Name</FormLabel>
                <FormInput onChangeText={(last_name) => this.setState({last_name})}/>

                <Button
                    title="Register"
                    onPress={() => this.onRegister()}
                />
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
