import React from 'react';
import { StyleSheet, View, Text, Alert} from 'react-native';
import { Button, FormLabel, FormInput} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class FdcInfo extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            auth_token: '',
            username: '',
            fdcID: 0,
            address: '',
            opening_time: '',
            closing_time: ''
        };
    }

    componentWillMount() {
        // get FDC id
        fetch(`http://18.216.237.239:5000/users/${this.state.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + this.state.auth_token,
            },
            body: JSON.stringify({
                description: this.state.description,
                name: this.state.name,
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.status == 'fail') {
                    alert(res.message);
                    alert(this.state.auth_token);
                } else {
                    fdcID = res.data.fdcID;
                }
            })
            .catch((e) => {
                alert('There was an error fetching FDC info.');
            });
    }

    async getToken() {
        let token = '';
        await AsyncStorage.getItem('webtoken', (err, item) => {
            this.setState({auth_token: item});

            fetch(`http://18.216.237.239:5000/fdcs/${this.state.fdcID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + this.state.auth_token,
                },
                body: JSON.stringify({
                    description: this.state.description,
                    address: this.state.address,
                    opening_time: this.state.opening_time,
                    closing_time: this.state.closing_time
                })
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.status == 'fail') {
                        alert(res.message);
                        alert(this.state.auth_token);
                    } else {
                        alert(`Success! Delivery instructions set!`);
                    }
                })
                .catch((e) => {
                    alert('There was an error setting delivery instructions.');
                });
        });
    }

    onSubmit() {
        const { params } = this.props.navigation.state;
        this.setState({username: params.username});
        this.getToken();
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
                    <Text style={styles.plainText}>Update FDC Info</Text>

                    <FormLabel labelStyle={styles.formLabel}>Hours</FormLabel>
                    <FormInput containerStyle={styles.formContainer}
                               inputStyle={styles.formInput}
                               onChangeText={(hours) => this.setState({hours})}/>

                    <FormLabel labelStyle={styles.formLabel}>Location</FormLabel>
                    <FormInput containerStyle={styles.formContainer}
                               inputStyle={styles.formInput}
                               onChangeText={(Location) => this.setState({Location})}/>


                    <Button
                        style={styles.button}
                        title="Update Info"
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
