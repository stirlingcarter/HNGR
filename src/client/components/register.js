import React from 'react';
import { StyleSheet, View, Text, Alert} from 'react-native';
import { Button, FormLabel, FormInput} from 'react-native-elements';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onRegister = this.onRegister.bind(this);
    }

    onRegister() {
        Alert.alert(this.state);
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

                <FormLabel>Confirm Password</FormLabel>
                <FormInput onChangeText={(password) => this.setState({password})}
                           secureTextEntry={true}/>

                <FormLabel>Company</FormLabel>
                <FormInput onChangeText={(company) => this.setState({company})}/>

                <FormLabel>Location</FormLabel>
                <FormInput onChangeText={(username) => this.setState({location})}/>

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
