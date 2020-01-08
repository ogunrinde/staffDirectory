import React,{Component} from 'react';
import { View, Text,StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {verify} from "../action/fetchAction";
import { connect } from 'react-redux';
import RNPaystack from 'react-native-paystack';

class PaynowScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cardNumber:'0',
            month:'',
            year:'0',
            cvc:'',
            isFetching:false
        };
      }
      
    componentDidMount(){
        //RNPaystack.init({ publicKey: 'YOUR_PUBLIC_KEY_HERE' });
    }  
    static navigationOptions = {
        header:null
    };
    handleSumbit = () =>{
        //if(this.state.cardNumber == '' ||)
        this.setState({isFetching:true});
        RNPaystack.init({ publicKey: 'pk_live_3af6aa2c38f31805fa188925d46f16a6655ac85c' });
        RNPaystack.chargeCardWithAccessCode({
            cardNumber: this.state.cardNumber, 
            expiryMonth: this.state.month, 
            expiryYear: this.state.year, 
            cvc: this.state.cvc,
            email: this.props.data.renewal_email,
            amountInKobo: 50000,
            accessCode: this.props.data.paystack_access
          })
          .then(async (response) => {
            const user = await this.props.dispatch(verify(response.reference,this.props.data.renewal_email));
            if(this.props.data.payment_status == 'success') {
                Alert.alert('Payment Successful');
                this.props.navigation.navigate('login');  
            }else {
                Alert.alert("Payment Unsuccessful");
            }
            //console.error(response); 
            console.log(response); // do stuff with the token
          })
          .catch(error => {
            console.log(error); // error is a javascript Error object
            Alert.alert(error.message);
            this.setState({isFetching:true});
          })   
          
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
                            onChangeText={(text)=>this.setState({cardNumber:text})}
                            placeholder = 'Card Number'
                            style={{borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />
                    <TextInput 
                            onChangeText={(text)=>this.setState({month:text})}
                            placeholder = 'Card Expiry Month'
                            style={{marginTop:20, borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />
                    <TextInput 
                            onChangeText={(text)=>this.setState({year:text})}
                            placeholder = 'Card Expiry Year'
                            style={{marginTop:20, borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />
                    <TextInput 
                            onChangeText={(text)=>this.setState({cvc:text})}
                            placeholder = 'CVC'
                            style={{marginTop:20, borderColor: '#C1C1C1', borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />            
                    <TouchableOpacity>
                        <View  style={{marginTop:30,backgroundColor:'#C618C6',padding:10}}>
                         {
                             this.state.isFetching == false && <Text onPress = {this.handleSumbit} style={{alignSelf:"center",color:'#fff',fontSize:18,fontFamily: "Roboto-Regular"}}>Proceed to Payment</Text> 
                         }
                         {
                             this.state.isFetching == true && <ActivityIndicator color="#fff" size='small' /> 
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
export default connect(mapStateToProps)(PaynowScreen);
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