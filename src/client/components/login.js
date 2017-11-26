import React from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login'
    };

    constructor(props) {
        super(props);
        this.state = { user: '', password: ''};
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text>You are a(n) {params.type}</Text>
                <Text>Please enter your login information below:</Text>
                <View style={styles.input}>
                    <TextInput
                        onChangeText={(user) => this.setState({user})}
                    />
                    <TextInput
                        onChangeText={(password) => this.setState({password})}
                    />
                </View>
                <Text>Don't have an account? Click here</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'left',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    }
});