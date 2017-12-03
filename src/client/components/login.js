import React from 'react';
import { StyleSheet, View, Text, ScrollView, Button, TextInput} from 'react-native';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onRegister = this.onRegister.bind(this);
        this.state = { user: '', password: ''};
    }

    onRegister() {
        this.props.navigation.navigate('Register');
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
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.plainText}>Don't have an account? </Text>
                    <Text style={styles.plainText} onPress={() => this.onRegister()}>Click here</Text>
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
