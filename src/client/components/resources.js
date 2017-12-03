import React from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';

export default class ResourceScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.plainText}>{params.type} Resources</Text>
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
    }
});
