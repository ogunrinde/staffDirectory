import React,{Component} from 'react';
import {View, Text,StyleSheet, TextInput, TouchableOpacity,ActivityIndicator,Alert} from 'react-native';
import {register} from "../action/fetchAction";
import { connect } from 'react-redux';

class RegisterScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            password:'',
            confirm_password:'',
            email:''
        };
      }
    static navigationOptions = {
        header:null
    }; 
    handleSumbit = async () =>{
        if(this.state.name == '' && this.state.password == '' && this.state.confirm_password == '' && this.state.email == ''){
             Alert.alert("All Input fields are Required");
        }
           
        else {
            const user = await  this.props.dispatch(register(this.state.name,this.state.password,this.state.confirm_password,this.state.email));
            if(this.props.data.account_msg =='1'){
                this.setState({name:'',password:'',confirm_password:'',email:''});
                Alert.alert("Account Created Successfully...Proceed to Login");
            } 
                 
        }
              
           
    }
    render(){
        return (
            <View style = {styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>You are ready go</Text>
                </View>
                <View style = { styles.subcontainer}>
                    <View style={{alignItems:'center',padding:15}}>
                    <Text style={{fontSize:18,color:'#2D3057',fontWeight:'bold',fontFamily: "Roboto-Bold"}}>Register</Text>
                    </View>
                    <View style={{padding:10}}>
                    <TextInput 
                            onChangeText={(text)=>this.setState({name:text})}
                            placeholder = 'Name'
                            value={this.state.name}
                            style={{borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />
                    <TextInput 
                            onChangeText={(text)=>this.setState({email:text})}
                            placeholder = 'Email'
                            value={this.state.email}
                            style={{marginTop:5, borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        /> 

                    <TextInput 
                            secureTextEntry={true}
                            onChangeText={(text)=>this.setState({password:text})}
                            placeholder = 'Password'
                            value={this.state.password}
                            style={{marginTop:5, borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />  

                    <TextInput 
                            secureTextEntry={true}
                            onChangeText={(text)=>this.setState({confirm_password:text})}
                            placeholder = 'Confirm Password'
                            value={this.state.confirm_password}
                            style={{marginTop:5, borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />         
                    <TouchableOpacity>
                        <View style={{marginTop:30,backgroundColor:'#C618C6',padding:10}}>
                        {
                             this.props.data.create_account == false && <Text onPress = {this.handleSumbit} style={{alignSelf:"center",color:'#fff',fontSize:18,fontFamily: "Roboto-Regular"}}>Sign Up</Text> 
                         }
                         {
                             this.props.data.create_account == true && <ActivityIndicator color="#fff" size='small' /> 
                         }  
                         
                        </View>
                        
                           
                    </TouchableOpacity>       
                    </View>
                   
                </View>
                <View style={styles.footer}>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('login')}>  
                    <Text style={{color:"#fff",fontFamily: "Roboto-Regular"}}>Have an account? Log In
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
export default connect(mapStateToProps)(RegisterScreen);
const styles = StyleSheet.create({
   container:{
       flex:1,
       justifyContent:'center',
       backgroundColor:'#000',
       height:'100%',
       padding:10
   }, 
   header:{
       marginTop:5,
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