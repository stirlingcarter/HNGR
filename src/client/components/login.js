import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';

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
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.plainText}>Don't have an account? Click here</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#fff',
        padding: 30,
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
    }
});