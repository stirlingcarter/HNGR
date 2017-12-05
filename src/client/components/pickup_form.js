import React from 'react';
import { StyleSheet, View, Text, Alert} from 'react-native';
import { Button, FormLabel, FormInput} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class PickupForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {

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
                    <Text style={styles.plainText}>Pickup Request</Text>

                    <FormLabel labelStyle={styles.formLabel}>Name</FormLabel>
                    <FormInput containerStyle={styles.formContainer}
                               inputStyle={styles.formInput}
                               onChangeText={(username) => this.setState({name})}/>

                    <FormLabel labelStyle={styles.formLabel}>Description</FormLabel>
                    <FormInput containerStyle={styles.formContainer}
                               inputStyle={styles.formInput}
                               onChangeText={(first_name) => this.setState({description})}/>


                    <Button
                        style={styles.button}
                        title="Request"
                        onPress={() => this.onSubmit()}
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
