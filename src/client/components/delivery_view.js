import React from 'react';
import { StyleSheet, View, Text, FlatList} from 'react-native';
import { Button, ListItem } from 'react-native-elements';


export default class DelView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveries: [],
            isLoading: true
        };
    }

    componentWillMount() {
        fetch(`http://18.216.237.239:5000/pickups/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 'fail') {
                    alert(data.message);
                } else {
                    pickupData = data.pickups.map(obj => {return {id: obj.id, description: obj.description,
                        location: obj.location, registered_on: obj.registered_on, status: obj.status}});
                    this.setState({deliveries: pickupData}, () => {
                        this.setState({isLoading: false});
                    });
                }
            })
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    _renderItem = ({item}) => (
        <ListItem
            title={`${item.description} @ ${item.location}`}
            subtitle={item.registered_on}
            containerStyle={{ borderBottomWidth: 0 }}
        />
    );

    _keyExtractor = (item, index) => item.id;

    render() {
        const { params } = this.props.navigation.state;
        if(this.state.isLoading) {
            return <View><Text>Loading...</Text></View>;
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.deliveries}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
            );
        }
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
