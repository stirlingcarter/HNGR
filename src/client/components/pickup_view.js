import React from 'react';
import { StyleSheet, View, Text, FlatList, AsyncStorage} from 'react-native';
import { Button, ListItem } from 'react-native-elements';


export default class PickupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickups: [],
            isLoading: true,
            auth_token: ''
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
                    location: obj.location, registered_on: obj.registered_on, status: obj.status, donor_id: obj.donor_id}});
                this.setState({pickups: pickupData}, () => {
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

    async acceptPickup(id, dest){
      await AsyncStorage.getItem('webtoken', (err, item) => {
          this.setState({auth_token: item});
          fetch(`http://18.216.237.239:5000/pickups/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + this.state.auth_token,
              },
              body: JSON.stringify({
                destination: dest,
                id: id,
                errors: "error",
              })
            })
            .then((response) => {
              console.log(response);response.json();})
            .then((res) => {
              if (res.status == 'fail') {
                alert(res.message);
                alert(this.state.auth_token);
              } else {
                alert(`Success! Pickup accepted!`);
                }
            })
            .catch((e) => {
              console.log(e);
              alert('There was an error accepting the pickup.');
            });
      });

    }

    _renderItem = ({item}) => (
        <ListItem
            title={`${item.description} @ ${item.location} by ${item.donor_id}`}
            subtitle={item.registered_on}
            containerStyle={{ borderBottomWidth: 0 }}
            onPress={() => {this.acceptPickup(item.donor_id, item.location)}}
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
                        data={this.state.pickups}
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
