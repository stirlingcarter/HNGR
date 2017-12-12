import React from 'react';
import { StyleSheet, View, Text, Alert} from 'react-native';
import { Button, FormLabel, FormInput} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        this.props.navigation.navigate('Login');
    }

    onRegister() {
        const { params } = this.props.navigation.state;
        fetch(`http://18.216.237.239:5000/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          role: params.type,
          location: this.state.location,
        })
      })
      .then((response) => response.json())
      .then((res) => {
        if (res.status == 'fail') {
          alert(res.message);
        } else {
          this.setState({auth_token: res.auth_token});
          alert(`Success! You may now log in.`);
          // Redirect
          // this.props.navigation.navigate('Login', {params.type});
        }
      })
      .catch(() => {
        alert('There was an error registering.');
      });
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
          //allows screen to scroll when keyboard blocks text input
          <KeyboardAwareScrollView
            style={{ backgroundColor: '#4c69a5' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}>

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

                <FormLabel labelStyle={styles.formLabel}>Email</FormLabel>
                <FormInput containerStyle={styles.formContainer}
                           inputStyle={styles.formInput}
                           autoCorrect={false}
                           onChangeText={(email) => this.setState({email})}/>

                <FormLabel labelStyle={styles.formLabel}>First Name</FormLabel>
                <FormInput containerStyle={styles.formContainer}
                           inputStyle={styles.formInput}
                           onChangeText={(first_name) => this.setState({first_name})}/>

                <FormLabel labelStyle={styles.formLabel}>Last Name</FormLabel>
                <FormInput containerStyle={styles.formContainer}
                           inputStyle={styles.formInput}
                           onChangeText={(last_name) => this.setState({last_name})}/>

                <FormLabel labelStyle={styles.formLabel}>Your Address</FormLabel>
                <FormInput containerStyle={styles.formContainer}
                           inputStyle={styles.formInput}
                           onChangeText={(location) => this.setState({location})}/>

                <Button
                    style={styles.button}
                    title="Register"
                    onPress={() => this.onRegister()}
                />
            </View>
          </KeyboardAwareScrollView>
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
        marginBottom: 15
    },
    button: {
        marginTop: 15
    },
    formLabel: {
        color: 'black',
        marginTop: 17
    },
    formContainer: {
        backgroundColor: '#dbdbdb'
    },
    formInput: {
        color: 'black'
    }
});
