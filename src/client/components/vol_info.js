import React from 'react';
import { StyleSheet, View, Text, Alert} from 'react-native';
import { Button, FormLabel, FormInput} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class VolInfo extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        let addr = 'http://18.216.237.239:5000/users/'
        let url = addr.concat(this.state.username)
        fetch(addr, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
            })
          })
          .then((res) => res.json())
          .then((data) => {
            if(data){
              if (data.status == 'fail') {
                alert(data.message);
              } else {
                this.setState({auth_token: data.auth_token});
                // Redirect
                //alert(res.data.message);
                this.props.navigation.navigate('Tabs', {type: type, username: this.state.username});
                this.setState({isLoading: true});
                this.setToken(data.auth_token);
                //   this.props.navigation.dispatch(resetAction);
              }
            } else {
            alert('no response object');
          }})
          .catch((e) => {
            alert('There was an error logging in.');
          });
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
                    <Text style={styles.plainText}>Update Volunteer Info</Text>

                    <FormLabel labelStyle={styles.formLabel}>Name</FormLabel>
                    <FormInput containerStyle={styles.formContainer}
                               inputStyle={styles.formInput}
                               onChangeText={(name) => this.setState({name})}/>

                    <FormLabel labelStyle={styles.formLabel}>Availability</FormLabel>
                    <FormInput containerStyle={styles.formContainer}
                               inputStyle={styles.formInput}
                               onChangeText={(availability) => this.setState({availability})}/>

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
