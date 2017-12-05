import React from 'react';
import { StyleSheet, View, Text, ScrollView, Button, TextInput} from 'react-native';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onRegister = this.onRegister.bind(this);
    }

    onRegister(type) {
        this.props.navigation.navigate('Register', {type});
    }

    onLogin() {
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
          this.props.navigation.navigate('Pickup');
        }
      })
      .catch((e) => {
        alert('There was an error logging in.');
      });
    }

    render() {
        const { params } = this.props.navigation.state;
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
                        onPress={() => this.onLogin()}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.plainText}>Don't have an account? </Text>
                    <Text style={styles.plainText} onPress={() => this.onRegister(params.type)}>Click here</Text>
                </View>
            </ScrollView>
        );
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
