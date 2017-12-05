import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

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
                        small
                        style={styles.button}
                        onPress={() => this.onSelect('volunteer')}
                        title="I am a volunteer"
                    />
                    <Button
                        small
                        style={styles.button}
                        onPress={() => this.onSelect('fdcAdmin')}
                        title="I am an FDC"
                    />
                    <Button
                        small
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
        backgroundColor: '#a0e7a0',
        padding: 30,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 60
    },
    buttons: {
        justifyContent: 'center',
    },
    button: {
        marginTop: 15,
        marginBottom: 15
    }
});
