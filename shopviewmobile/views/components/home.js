import React, { Component } from 'react';
import {Text,View,AsyncStorage,FlatList,StyleSheet} from 'react-native';
import Frisbee from 'frisbee';
import cheerio from 'react-native-cheerio';
class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state={name:''};
  }
  load = async () => {
    try {
      var b= await this.getListMenu();
      this.setState({name:b});
    } catch (e) {
      console.error('Failed to load name.')
    }
  }
  async getListMenu() {
  	try {
  		const api = new Frisbee({
  			baseURI: 'https://news.zing.vn',
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			}
  		});
  		res = await api.get('',{

  	});
  	$=cheerio.load(res.body);
  	 let listMenu = new Set();
  	 $('li.parent a').each(function(i, elem){
  				listMenu.add($(this).text());
  	 });
  	return listMenu;
  	} catch(error) {
  		console.error(error);
  	}
  }
  componentWillMount() {
    this.load();
    console.log('load');
  }
  componentWillUnmount() {

  }
  itemClick(event){
    console.log(event._targetInst.memoizedProps.children);
  }
  render() {
    const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    row: {
      padding: 15,
      marginBottom: 5,
      backgroundColor: 'skyblue',
    },
  });
    var menu=[];
    myarr=Array.from(this.state.name);
    for (i=0;i<myarr.length;i++) {
      menu[i]={key:myarr[i]}
    }
    return (
      <View style={{flex:1}}>
        <FlatList
          style={styles.container}
          data={menu}
          renderItem={({item}) => <Text id={item.id} onPress={this.itemClick} style={styles.row}>{item.key}</Text>}

        />
      </View>
    );
  }
}
export default Home;
