import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
    _donorButton() {
        Alert.alert('Pressed donor button');
    }
    _volButton() {
        Alert.alert('Pressed volunteer button');
    }
    _fdcButton() {
        Alert.alert('Pressed FDC button');
    }
    _hungryButton() {
        Alert.alert('Pressed hungry button');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Shake your phone to open the developer menu.</Text>

                <View style={styles.button}>
                    <Button
                        onPress={this._donorButton}
                        title="I am a donor"
                    />
                    <Button
                        onPress={this._volButton}
                        title="I am a volunteer"
                    />
                    <Button
                        onPress={this._fdcButton}
                        title="I am an FDC"
                    />
                    <Button
                        onPress={this._hungryButton}
                        title="I am hunry"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
