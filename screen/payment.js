import React,{Component} from 'react';
import { View, Text,StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {getacess} from "../action/fetchAction";
import { connect } from 'react-redux';
import RNPaystack from 'react-native-paystack';

class PaymentScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email:this.props.data.renewal_email,
            amount:'500',
            expiration:''
        };
      }
    componentDidMount(){
        //RNPaystack.init({ publicKey: 'pk_live_3af6aa2c38f31805fa188925d46f16a6655ac85c' });
    }  
    static navigationOptions = {
        header:null
    };
    handleSumbit = async () =>{
        const user = await  this.props.dispatch(getacess(this.props.data.renewal_email));
        if(this.props.data.paystack_access == '')
            Alert.alert("Error Loading Payment Error");
        else
        this.props.navigation.navigate('paynow');      
              
           
    }
    render(){
        return (
            <View style = {styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Renew Subscription</Text>                    
                </View>
                <View style = { styles.subcontainer}>
                    <View style={{alignItems:'center',padding:15}}>
                    <Text style={{fontSize:18,color:'#2D3057',fontFamily: "Roboto-Bold"}}>Pay Now</Text>
                    </View>
                    <View style={{padding:10}}>
                    <TextInput 
                            editable={false}
                            placeholder = 'Email'
                            value={this.props.data.renewal_email}
                            style={{borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />
                    <TextInput 
                            editable={false}
                            placeholder = 'Amount'
                            value = '500'
                            style={{marginTop:20, borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />
                    <TextInput 
                            editable={false}
                            onChangeText={(text)=>this.setState({password:text})}
                            placeholder = 'Expiration Date'
                            value = 'December 31st this year'
                            style={{marginTop:20, borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />     
                    <TouchableOpacity>
                        <View  style={{marginTop:30,backgroundColor:'#C618C6',padding:10}}>
                         {
                             this.props.data.isFetching == false && <Text onPress = {this.handleSumbit} style={{alignSelf:"center",color:'#fff',fontSize:18,fontFamily: "Roboto-Regular"}}>Proceed to Payment</Text> 
                         }
                         {
                             this.props.data.isFetching == true && <ActivityIndicator color="#fff" size='small' /> 
                         }   
                        
                        </View>
                        
                           
                    </TouchableOpacity>       
                    </View>
                   
                </View>
                <View style={styles.footer}>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('login')}>  
                    <Text style={{color:"#fff",fontFamily: "Roboto-Regular"}}>
                        To Login 
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
export default connect(mapStateToProps)(PaymentScreen);
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