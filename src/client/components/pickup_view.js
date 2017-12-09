import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Button } from 'react-native-elements';


export default class PickupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickups: []
        };
    }

    componentDidMount() {
        
    }

    _renderItem = ({pickup}) => (
        <Text>
            Description: {pickup.description}
            Created: {pickup.registered_on}
            Location: {pickup.location}
        </Text>
    );

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text style={styles.plainText}>View Pickup</Text>
                <FlatList
                    data={this.state.pickups}
                    renderItem={this._renderItem}
                />
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
    },
    plainText: {
        fontSize: 15,
        marginBottom: 15
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    button: {
        marginTop: 15
    }
});
