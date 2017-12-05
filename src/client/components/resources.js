import React from 'react';
import { StyleSheet, View, Text, Alert, FlatList, Linking } from 'react-native';

var map = new Object();
map['Alabama'] = 'http://www.211alabama.org/';
map['Alaska'] = 'http://www.alaska211.org/';
map['Arizona'] = 'http://www.cir.org/211.html';
map['Arkansas'] = 'http://arkansas211.org/';
map['California'] = 'http://www.211california.org/';
map['Colorado'] = 'http://www.211colorado.org/';
map['Connecticut'] = 'http://www.211ct.org/';
map['Delaware'] = 'http://www.delawarehelpline.org/';
map['District of Columbia'] = 'http://211metrodc.org/';
map['Florida'] = 'http://www.211florida.org/';
map['Georgia'] = 'http://www.unitedwayatlanta.org/c0-find_help.asp';
map['Hawaii'] = 'http://www.auw.org/2-1-1/';
map['Idaho'] = 'http://www.idahocareline.org/';
map['Illinois'] = 'http://www.211illinois.org/';
map['Indiana'] = 'http://www.in211.org/';
map['Iowa'] = 'http://www3.irissoft.com/iowa';
map['Kansas'] = 'http://kansas211.org/';
map['Kentucky'] = 'http://www.uwky.org/211help.html';
map['Louisiana'] = 'http://www.launitedway.org/211/211_home.html';
map['Maine'] = 'http://www.211maine.org/';
map['Maryland'] = 'http://211metrodc.org/';
map['Massachusetts'] = 'http://mass211.org/';
map['Michigan'] = 'http://www.uwmich.org/get-help';
map['Minnesota'] = 'http://unitedwaytwincities.org/CommunityInfo/211.cfm';
map['Mississippi'] = 'http://www.211ms.com/';
map['Missouri'] = 'http://www.211missouri.org/';
map['Montana'] = 'http://211montana.org'
map['Nebraska'] = 'http://www.ne211.org/'
map['Nevada'] = 'http://www.nevada211.org/'
map['New Hampshire'] = 'http://www.211nh.org/'
map['New Jersey'] = 'http://www.nj211.org/';
map['New Mexico'] = 'http://www.refersoftware.com/UWCNM';
map['New York'] = 'http://www.211ny.org/';
map['North Carolina'] = 'http://www.nc211.org/';
map['North Dakota'] = 'http://www.mhand.org/211/index.asp';
map['Ohio'] = 'http://www.211ohio.net/';
map['Oklahoma'] = 'http://www.211oklahoma.org/';
map['Oregon'] = 'http://www.or211.org/';
map['Pennsylvania'] = 'http://www.pa211.org/';
map['Puerto Rico'] = 'http://www.fondosunidos.org/Espanol/Servicios/211.asp';
map['Rhode Island'] = 'http://www.211ri.org/';
map['South Carolina'] = 'http://www.sc211.org/';
map['South Dakota'] = 'http://www.sd211.org/';
map['Tennessee'] = 'http://www.211tn.org/';
map['Texas'] = 'http://www.211texas.org/';
map['Utah'] = 'http://211utah.org/';
map['Virginia'] = 'http://www.211virginia.org/';
map['Vermont'] = 'http://vermont211.org/';
map['Washington'] = 'http://www.win211.org/';
map['West Virginia'] = 'http://wv211.org/';
map['Wisconsin'] = 'http://www.211wisconsin.org/';
map['Wyoming'] = 'http://www.liveunited.org/myuw/local.cfm?id=browsecities&zip=00000&abbr=wy&app';


export default class ResourceScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}> Please select your state below: </Text>
        <FlatList
          data={[
            {key: 'Alabama'},
            {key: 'Alaska'},
            {key: 'Arizona'},
            {key: 'Arkansas'},
            {key: 'California'},
            {key: 'Colorado'},
            {key: 'Connecticut'},
            {key: 'Delaware'},
            {key: 'District of Columbia'},
            {key: 'Florida'},
            {key: 'Georgia'},
            {key: 'Hawaii'},
            {key: 'Idaho'},
            {key: 'Illinois'},
            {key: 'Indiana'},
            {key: 'Iowa'},
            {key: 'Kansas'},
            {key: 'Kentucky'},
            {key: 'Louisiana'},
            {key: 'Maine'},
            {key: 'Maryland'},
            {key: 'Massachusetts'},
            {key: 'Michigan'},
            {key: 'Minnesota'},
            {key: 'Mississippi'},
            {key: 'Missouri'},
            {key: 'Montana'},
            {key: 'Nebraska'},
            {key: 'Nevada'},
            {key: 'New Hampshire'},
            {key: 'New Jersey'},
            {key: 'New Mexico'},
            {key: 'New York'},
            {key: 'North Carolina'},
            {key: 'North Dakota'},
            {key: 'Ohio'},
            {key: 'Oklahoma'},
            {key: 'Oregon'},
            {key: 'Pennsylvania'},
            {key: 'Puerto Rico'},
            {key: 'Rhode Island'},
            {key: 'South Carolina'},
            {key: 'South Dakota'},
            {key: 'Tennessee'},
            {key: 'Texas'},
            {key: 'Utah'},
            {key: 'Vermont'},
            {key: 'Washington'},
            {key: 'West Virginia'},
            {key: 'Wisconsin'},
            {key: 'Wyoming'},
          ]}
          renderItem={({item}) => <Text style={styles.text}
      onPress={() => Linking.openURL(map[item.key])}>
  {item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#a0e7a0',
      flexDirection: 'column',
   flex: 1,
   paddingTop: 22

  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  text:{
  padding: 10,
  fontSize: 24,

},
bigText:{
  fontSize: 28
}
})
