import React,{Component} from 'react';
import {View, Text,StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class DioceseScreen extends React.Component{
    static navigationOptions = {
        header:null
      }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flex:2}}>
                      <Ionicons name='md-arrow-back' size={25} style={{color:'#fff'}} />
                    </View>
                    <View style={{flex:4}}>
                      <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>Diocese of Ife</Text>
                    </View>
                </View>
                <View style={styles.second}>
                  <Image
                      source={require('../asset/images/mike.jpg')}
                      style={{width:70,height:70, alignSelf:'center', borderRadius:35}}
                    />
                    <TouchableOpacity style={styles.btn}>
                        <Text style={{alignSelf:'center',color:'#fff', fontSize:16}}>Diocesan</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.third}>
                    <View style={{flex:1,flexDirection:'row',width:'90%',marginLeft:'5%'}}>
                        <View style={styles.row1}>
                         <Image
                            source={require('../asset/images/officials.png')}
                            style={{marginTop:10,width:70,height:70, alignSelf:'center'}}
                            />
                            <Text style={{marginTop:15,color:'#fff',fontSize:15,alignSelf:'center'}}>Diocesian officials</Text>
                        </View>
                        <View style={styles.row2}>
                        <Image
                            source={require('../asset/images/arch.png')}
                            style={{marginTop:10,width:70,height:70, alignSelf:'center'}}
                            />
                            <Text style={{marginTop:15,color:'#fff',fontSize:15,alignSelf:'center'}}>Archdeaconry</Text>
                        </View>
                        
                    </View>
                </View>

                <View style={styles.third}>
                    <View style={{flex:1,flexDirection:'row',width:'90%',marginLeft:'5%'}}>
                        <View style={styles.row3}>
                         <Image
                            source={require('../asset/images/church.png')}
                            style={{marginTop:10,width:70,height:70, alignSelf:'center'}}
                            />
                            <Text style={{marginTop:15,color:'#fff',fontSize:15,alignSelf:'center'}}>Churches</Text>
                        </View>
                        <View style={styles.row4}>
                        <Image
                            source={require('../asset/images/priest.png')}
                            style={{marginTop:10,width:70,height:70, alignSelf:'center'}}
                            />
                            <Text style={{marginTop:15,color:'#fff',fontSize:15,alignSelf:'center'}}>Priests</Text>
                        </View>
                        
                    </View>
                </View>
            

            </View>
        )
    }
}
export default DioceseScreen;
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#19181D',
        width:'100%',
        height:'100%',
        padding:20
    },
    btn:{
        width:'60%',
        margin:10,
        alignSelf:'center',
        backgroundColor:'transparent',
        color:'#fff',
        padding:10,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        borderTopLeftRadius:5,
        borderTopRightRadius:5, 
        borderBottomColor:'#fff',
        borderBottomWidth:1,
        borderLeftColor:'#fff',
        borderLeftWidth:1,
        borderRightColor:'#fff',
        borderRightWidth:1,
        borderTopColor:'#fff',
        borderTopWidth:1
    },
    header:{
        flex:0.5,
        flexDirection:"row"
    }, 
    second:{
        flex:1,
        justifyContent:'flex-start', 
    },
    third:{
        flex:1
        
    },
    row1:{
        backgroundColor:'#797907',
        height:'95%',
        width:'50%',
        padding:10,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        borderTopLeftRadius:5,
        borderTopRightRadius:5, 
    },
    row2:{
        backgroundColor:'#790707',
        height:'95%',
        width:'50%',
        padding:10,
        marginLeft:5,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        borderTopLeftRadius:5,
        borderTopRightRadius:5, 
    },
    row3:{
        backgroundColor:'#121EA8',
        height:'95%',
        width:'50%',
        padding:10,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        borderTopLeftRadius:5,
        borderTopRightRadius:5, 
    },
    row4:{
        backgroundColor:'#0A7B54',
        height:'95%',
        width:'50%',
        padding:10,
        marginLeft:5,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        borderTopLeftRadius:5,
        borderTopRightRadius:5, 
    }
})