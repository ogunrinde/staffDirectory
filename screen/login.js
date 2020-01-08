import React,{Component} from 'react';
import { View, Text,StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {thunk_action_creator} from "../action/fetchAction";
import { connect } from 'react-redux';

class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        };
      }
    static navigationOptions = {
        header:null
    };
     
    handleSumbit = async () =>{
        //e.preventDefault();
        if(this.state.username == '' && this.state.password == ''){
             //this.props.navigation.navigate('home');
             Alert.alert('Username and Password field is Empty');
        }
           
        else {
            const user = await  this.props.dispatch(thunk_action_creator(this.state.username,this.state.password));
            
            //Alert.alert(this.props.data.isLoggedIn);
            if(this.props.data.isLoggedIn == true)
               this.props.navigation.navigate('home'); 
            else if(this.props.data.expired == true)
               this.props.navigation.navigate('payment');     
        }
              
           
    }
    render(){
        return (
            <View style = {styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hi, Welcome Back</Text>                    
                </View>
                <View style = { styles.subcontainer}>
                    <View style={{alignItems:'center',padding:15}}>
                    <Text style={{fontSize:18,color:'#2D3057',fontFamily: "Roboto-Bold"}}>Sign In</Text>
                    </View>
                    <View style={{padding:10}}>
                    <TextInput 
                            onChangeText={(text)=>this.setState({username:text})}
                            placeholder = 'Email'
                            style={{borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />
                    <TextInput 
                            secureTextEntry={true}
                            onChangeText={(text)=>this.setState({password:text})}
                            placeholder = 'Password'
                            style={{marginTop:20, borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        /> 
                    <TouchableOpacity>
                        <View  style={{marginTop:30,backgroundColor:'#C618C6',padding:10}}>
                         {
                             this.props.data.isFetching == false && <Text onPress = {this.handleSumbit} style={{alignSelf:"center",color:'#fff',fontSize:18,fontFamily: "Roboto-Regular"}}>Login</Text> 
                         }
                         {
                             this.props.data.isFetching == true && <ActivityIndicator color="#fff" size='small' /> 
                         }   
                        
                        </View>
                        <View style={{marginTop:3}}>
                        <Text onPress = {()=> this.props.navigation.navigate('reset')} style={{alignSelf:"flex-end",color:'#C618C6',fontSize:14,fontFamily: "Roboto-Bold"}}>Forgot Password?</Text> 
                        </View>
                           
                    </TouchableOpacity>       
                    </View>
                   
                </View>
                <View style={styles.footer}>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('register')}>  
                    <Text style={{color:"#fff",fontFamily: "Roboto-Regular"}}>
                        Don't have an account? Sign Up
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
    };
};
export default connect(mapStateToProps)(LoginScreen);
//export default LoginScreen;
const styles = StyleSheet.create({
   container:{
       flex:1,
       justifyContent:'center',
       backgroundColor:'#000',
       height:'100%',
       padding:10
   }, 
   header:{
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
       backgroundColor:'#fff',
       paddingBottom:20

   },
   footer:{
       marginTop:20,
       alignItems:'center'
   }
})