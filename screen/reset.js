import React,{Component} from 'react';
import {View, Text,StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {reset} from '../action/fetchAction';

class ResetScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:''
        }
    }
    static navigationOptions = {
        header:null
    }; 
    handlesubmit = async () => {
        if(this.state.email == '')
           Alert.alert("Email field is Empty");
        else {
            await this.props.dispatch(reset(this.state.email));
            if(this.props.data.reset_id > 0) 
              this.props.navigation.navigate('set_password');
        }   
    }
    render(){
        return (
            <View style = {styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Don't, we've got you</Text>
                </View>
                <View style = { styles.subcontainer}>
                    <View style={{alignItems:'center',padding:15}}>
                    <Text style={{fontSize:18,color:'#2D3057',fontFamily: "Roboto-Bold"}}>Reset Password</Text>
                    </View>
                    <View style={{padding:10}}>
                    <TextInput 
                            onChangeText = {(text) => this.setState({email:text})}
                            placeholder = 'Email'
                            style={{borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />
                    <TouchableOpacity>
                        <View onPress = {this.handlesubmit} style={{marginTop:30,backgroundColor:'#C618C6',padding:10}}>
                          {
                              this.props.data.password_reset == false && <Text onPress = {this.handlesubmit} style={{alignSelf:"center",color:'#fff',fontSize:18,fontFamily: "Roboto-Regular"}}>Check Email</Text>
                          }
                          {
                              this.props.data.password_reset == true && <ActivityIndicator color="#fff" size='small' />
                          }
                          
                        </View>
        
                           
                    </TouchableOpacity>       
                    </View>
                   
                </View>
                <View style={styles.footer}>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('login')}>  
                    <Text style={{color:"#fff",fontFamily: "Roboto-Regular"}}>Go to LogIn
                    </Text>
                    </TouchableOpacity>   
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.AsyncReducer
    }
}
export default connect(mapStateToProps)(ResetScreen);
const styles = StyleSheet.create({
   container:{
       flex:1,
       justifyContent:'center',
       backgroundColor:'#000',
       height:'100%',
       padding:10
   }, 
   header:{
       marginTop:'25%',
       justifyContent:'flex-end',
       alignItems:'center',
       marginBottom:10,
       color:'red'

   },
   headerText:{
      color:'#fff',
      fontSize:20,
      fontFamily: "Roboto-Bold"
   },
   subcontainer:{
       borderBottomLeftRadius:15,
       borderBottomRightRadius:15,
       borderTopLeftRadius:15,
       borderTopRightRadius:15,
       backgroundColor:'#fff'

   },
   footer:{
       marginTop:20,
       alignItems:'center'
   }
})