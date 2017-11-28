import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register'
  };

  constructor(props) {
    super(props);
    this.state = {user: '', password: '', name: '', location: ''};
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
        <ScrollView style={styles.scroll}>
            <Text style={styles.plainText}>{params.type} Register </Text>

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

            // <View style={styles.container}>
            //     <Text style={styles.label}>Verify Password:</Text>
            //     <TextInput
            //         style={styles.input} onChangeText={(password) => this.setState({password})}
            //     />
            // </View>

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


  }
}
