import React,{Component} from 'react';
import {View, Text,StyleSheet, TextInput,Linking, TouchableOpacity, Image,ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

class BishopScreen extends React.Component{
    constructor(props){
        super(props);
       
    }
    static navigationOptions = {
        header:null
    }; 
    componentDidMount(){
        //console.error(this.props.data.profiles);
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
    render(){
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.header}>
                       <View>
                        <Ionicons onPress = {()=> this.props.navigation.navigate('home')} name='md-arrow-back' size={25} style={{color:'#fff'}} />
                        </View>
                    </View>
                    {
                        this.props.data.profiles.map((profile)=>
                        profile.position !== null && this.props.updata_data.currentdiocese == profile.current_diocese.toString() && profile.position.toLowerCase() == 'bishop' &&
                         <View key ={profile.id} value={profile.id}>
                            <View style={styles.second}>
                                <Image
                                source={{uri: `http://doifedirectory.com.ng/assets/img/${profile.image}`}}
                                style={{width:100,height:100, alignSelf:'center',margin:5}}
                                />
                                <Text style={{alignSelf:'center',color:'#fff', fontSize:16,fontWeight:'100',marginBottom:7}}>{profile.firstname} {profile.middlename} {profile.surname}</Text>
                                <Text style={{alignSelf:'center',color:'#fff', fontSize:16,fontWeight:'100',marginBottom:7}}>
                                    BISHOP OF 
                                    {
                                        this.props.data.dioceses.map((d)=> 
                                        d.id == this.props.updata_data.currentdiocese &&
                                        <Text key ={d.diocese_name} value={d.id} style={{textTransform:'uppercase'}}> {d.diocese_name} </Text>
                                    )} 
                                     DIOCESE
                                </Text>
                            </View>
                            <View style={styles.third}>
                                <View style={{flexDirection:'row'}}>
                                <View style={{width:'100%', backgroundColor:'#fff',padding:10,margin:1}}>
                                    <Ionicons name='ios-pin' size={25} style={{color:'#E50DE5',alignSelf:'center'}} />
                                    {
                                        profile.address !== '' &&
                                        <Text style={{fontFamily: "Roboto-Regular"}}>{profile.address}</Text>
                                    }
                                    {
                                        profile.address2 !== '' &&
                                        <Text style={{fontFamily: "Roboto-Regular"}}>{profile.address2}</Text>
                                    }
                                    {
                                        profile.address3 !== '' &&
                                        <Text style={{fontFamily: "Roboto-Regular"}}>{profile.address3}</Text>
                                    }
                                    {
                                        profile.address4 !== '' &&
                                        <Text style={{fontFamily: "Roboto-Regular"}}>{profile.address4}</Text>
                                    }
                                </View>
                              </View>
                            </View>
                            <View style={styles.third}>
                                <View style={{flexDirection:'row'}}>
                                <View style={{width:'100%', backgroundColor:'#fff',padding:10,margin:1}}>
                                    <Ionicons name='ios-call' size={25} style={{color:'#E50DE5',alignSelf:'center'}} />
                                    {
                                        profile.phone_number_a !== '' &&
                                        <Text onPress = {()=>this.call(profile.phone_number_a)} style={{alignSelf:'center',fontFamily: "Roboto-Regular"}}>{profile.phone_number_a}</Text>
                                    }
                                    {
                                        profile.phone_number_b !== '' &&
                                        <Text onPress = {()=>this.call(profile.phone_number_b)} style={{alignSelf:'center',fontFamily: "Roboto-Regular"}}>{profile.phone_number_b}</Text>
                                    }
                                    <Ionicons name='md-mail' size={25} style={{color:'#E50DE5',alignSelf:'center'}} />
                                    {
                                        profile.email_a !== '' &&
                                        <Text onPress={() => Linking.openURL(`mailto:${profile.email_a}`) } style={{alignSelf:'center',fontFamily: "Roboto-Regular"}}>{profile.email_a}</Text>
                                    }
                                    {
                                        profile.email_b !== '' &&
                                        <Text onPress={() => Linking.openURL(`mailto:${profile.email_b}`) } style={{alignSelf:'center',fontFamily: "Roboto-Regular"}}>{profile.email_b}</Text>
                                    }
                                    
                                </View>
                              </View>
                            </View>
                            
                            
                           
                        </View>
                    )}
                    
                </View>
            </ScrollView>
        )
    }
}
const mapStateToProps = state => {
    return {
        data:state.AsyncReducer,
        updata_data:state.updateReducer
    }
}
export default connect(mapStateToProps)(BishopScreen);
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#19181D',
        width:'100%',
        height:'100%',
        padding:5
    },
    header:{
        flex:0.3,
        justifyContent:'flex-start',
        padding:7
    },
    second:{
        flex:1,
        justifyContent:'center'
    },
    third:{
        flex:1,
        padding:10
    },
    four:{
        padding:10,
        marginLeft:15,
        marginBottom:10,
        marginRight:-3,
        backgroundColor:'#790779'
    }
})