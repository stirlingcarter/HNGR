import React from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect = (type) => {
        this.props.navigation.navigate('Login', {type});
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>HNGR</Text>
                </View>

                <View style={styles.buttons}>
                    <Button
                        style={styles.button}
                        onPress={() => this.onSelect('donor')}
                        title="I am a donor"
                    />
                    <Button
                        style={styles.button}
                        onPress={() => this.onSelect('volunteer')}
                        title="I am a volunteer"
                    />
                    <Button
                        style={styles.button}
                        onPress={() => this.onSelect('fdcAdmin')}
                        title="I am an FDC"
                    />
                    <Button
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Resources')}
                        title="I am hungry"
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
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 80
    },
    buttons: {
        justifyContent: 'center'
    },
    button: {
        marginBottom: 10
    }
});
