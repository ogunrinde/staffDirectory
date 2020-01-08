import React,{Component} from 'react';
import {View, Text,StyleSheet, TextInput, TouchableOpacity,ScrollView, Linking} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

class OfficialScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showthisData: '',
            "officials": [
                {
                    "id": 1,
                    "position": "Chancellor",
                    "official_name": "Hon. Justice Olayinka David Afolabi LLM; BL",
                    "address": "High Court of Justice, Osogbo, Osun State P.O. Box 420, Enuwa Post Office, Ile-Ife",
                    "phone_number": "08037149770",
                    "email": "yinkaafolabi87@yahoo.com",
                    "diocese_id": "7",
                    "province_id": "7"
                },
                {
                    "id": 2,
                    "position": "Deputy Chancellor:",
                    "official_name": "Barrister Prince Adelupo Aderemi, LLB; BL",
                    "address": "C/O St. Peterâ€™s Anglican Church, Iremo, Ile-Ife.",
                    "phone_number": "08034017007",
                    "email": "adelupoaderemi@gmail.com",
                    "diocese_id": "7",
                    "province_id": "7"
                }
            ],
            searchofficials:[
                {
                    "id": 1,
                    "position": "Chancellor",
                    "official_name": "Hon. Justice Olayinka David Afolabi LLM; BL",
                    "address": "High Court of Justice, Osogbo, Osun State P.O. Box 420, Enuwa Post Office, Ile-Ife",
                    "phone_number": "08037149770",
                    "email": "yinkaafolabi87@yahoo.com",
                    "diocese_id": "7",
                    "province_id": "7"
                },
                {
                    "id": 2,
                    "position": "Deputy Chancellor:",
                    "official_name": "Barrister Prince Adelupo Aderemi, LLB; BL",
                    "address": "C/O St. Peterâ€™s Anglican Church, Iremo, Ile-Ife.",
                    "phone_number": "08034017007",
                    "email": "adelupoaderemi@gmail.com",
                    "diocese_id": "7",
                    "province_id": "7"
                }
            ]
        }
    }
    static navigationOptions = {
        header:null
    }; 
    showDataList = (val) => {
       this.setState({showthisData:val});
    }
    call = (phoneNumber) => {
        //let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phoneNumber}`;
          }
          else {
            phoneNumber = `telprompt:${phoneNumber}`;
          }
          Linking.openURL(phoneNumber);
      }
    getText = (val) => {
        let listofficials = [];
        for(let f  = 0; f < this.state.searchofficials.length; f++){
            let index = this.state.searchofficials[f].official_name.toLowerCase().search(val.toLowerCase());
            //Alert.alert(index.toString());
            
            if(index > -1){
                //console.error(index);
                listofficials.push(this.state.searchofficials[f]);
            }
        }
        this.setState({officials:listofficials.slice()});
        if(val == ''){
            this.setState({officials:this.state.searchofficials.slice()});
        }
    }
    componentDidMount = () => {
        this.setState({officials:this.props.data.officials});
        this.setState({searchofficials:this.props.data.officials});
    } 
    render(){
        return (
           <ScrollView style={styles.container}>
            <View>
               <View style={styles.header}>
                        <View style={{marginLeft:10,marginTop:10}}>
                        <Ionicons onPress = {()=> this.props.navigation.navigate('home')} name='md-arrow-back' size={25} style={{color:'#fff'}} />
                        </View>
               </View>
                <View style={styles.header}>
                    <Text style={{alignSelf:'center',fontSize:17,fontFamily: "Roboto-Bold",color:'#fff'}}>Dioceans Officials</Text>
                    <TextInput 
                            onChangeText = {(text) => this.getText(text)}
                            placeholder = 'Search Officials'
                            style={{marginTop:30,backgroundColor:'#fff',borderBottomLeftRadius:5,borderBottomRightRadius:5,borderTopLeftRadius:5,borderTopRightRadius:5, width:'100%',height:45,padding:5,borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />
                </View>
                <View style={styles.body}>
                      
                      {        
                        this.state.officials.map((official) =>
                        this.props.update_data.currentdiocese == official.diocese_id &&
                        <View key={official.id.toString()} value={official.official_name}>
                         <TouchableOpacity onPress = {() => this.showDataList(official.id.toString())} style={{marginTop:2,backgroundColor:'#fff',padding:10,borderBottomLeftRadius:5,borderBottomRightRadius:5,borderTopLeftRadius:5,borderTopRightRadius:5}}>
                          <View  style={{flexDirection:'row',justifyContent:'space-between',padding:7}}>
                            <View>
                                <Text style={{color:'#797907', fontFamily: "Roboto-Bold", fontSize:15}}>{official.official_name}</Text>
                            </View>
                            <View>
                                {
                                    this.state.showthisData == official.id.toString() ? (
                                        <Ionicons name='md-arrow-dropright' size={25} style={{color:'#797907',marginRight:10}} />
                                    ) : (
                                        <Ionicons name='md-arrow-dropdown' size={25} style={{color:'#797907',marginRight:10}} />
                                    )
                                }
                              
                            </View>
                          </View>
                         </TouchableOpacity>
                            {
                                this.state.showthisData == official.id.toString() &&
                            <View style={{backgroundColor:'#797907',padding:7,marginTop:1}}>
                                    <View  style={{flexDirection:'row'}}>
                                        <View>
                                            <Ionicons name='md-person' size={25} style={{color:'#fff',marginRight:10}} />
                                            
                                        </View>
                                        <View>
                                            <Text style={{color:'#fff', fontFamily: "Roboto-Bold", fontSize:15}}>{official.position}</Text>
                                        </View>
                                    </View>
                                    <View  style={{flexDirection:'row',marginTop:5}}>
                                        <View>
                                            <Ionicons name='md-mail' size={25} style={{color:'#fff',marginRight:10}} />
                                            
                                        </View>
                                        <View>
                                            <Text onPress={() => Linking.openURL(`mailto:${official.email}`) } style={{color:'#fff', fontWeight:'bold', fontSize:15}}>{official.email}</Text>
                                        </View>
                                    </View>
                                    <View  style={{flexDirection:'row',marginTop:5}}>
                                        <View>
                                            <Ionicons name='md-pin' size={25} style={{color:'#fff',marginRight:10}} />
                                            
                                        </View>
                                        <View >
                                            <Text style={{color:'#fff', fontFamily: "Roboto-Bold", fontSize:15}}>{official.address}</Text>
                                        </View>
                                    </View>
                                    <View  style={{flexDirection:'row',marginTop:5}}>
                                        <View>
                                            <Ionicons name='md-call' size={25} style={{color:'#fff',marginRight:10}} />
                                            
                                        </View>
                                        <View>
                                            <Text onPress = {()=>this.call(official.phone_number)} style={{color:'#fff', fontFamily: "Roboto-Bold", fontSize:15}}>{official.phone_number}</Text>
                                        </View>
                                    </View>
                            </View>
                            }
                        </View>   
                         
                    )}
                    
                </View>
                
            </View>
           </ScrollView> 
        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.AsyncReducer,
        update_data:state.updateReducer
    }
}
export default connect(mapStateToProps)(OfficialScreen);
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#19181D',
        width:'100%',
        height:'100%',
        padding:3
    },
    header:{
        flex:1,
        padding:4

    },
    body:{
        flex:4,
        padding:4
    }
})