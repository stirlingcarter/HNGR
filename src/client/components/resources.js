import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class ResourcesScreen extends React.Component {
    static navigationOptions = {
        title: 'Resources'
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.plainText}>{params.type} Resources</Text>


            </ScrollView>
        );
    }
}

const ResourcesScreenNav = StackNavigator({

});

export default class App extends React.Component {
    render() {
        return <ResourcesScreenNav />;
    }
}


const styles = StyleSheet.create({

});
