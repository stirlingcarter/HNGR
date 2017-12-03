import React from 'react';
import { StyleSheet, View, Text, ScrollView, Button, TextInput} from 'react-native';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {user: '', password: '', name: '', location: ''};
    }

    onSubmit() {

    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.plainText}>Registration</Text>

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
                     <Text style={styles.label}>Verify Password:</Text>
                     <TextInput
                         style={styles.input} //onChangeText={(password) => this.setState({password})}
                     />
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Name of Company:</Text>
                    <TextInput
                        style={styles.input} onChangeText={(name) => this.setState({name})}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Location:</Text>
                    <TextInput
                        style={styles.input} onChangeText={(location) => this.setState({location})}
                    />
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