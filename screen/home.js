import React,{Component} from 'react';
import {View, Text,StyleSheet, TextInput, TouchableOpacity, Image,ScrollView,Alert,Dimensions,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {current_diocese} from "../action/fetchAction";

class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search:'',
            showthisData:'',
            loadData:true,
            provinces: [
                {
                    "id": 7,
                    "province_name": "Ibadan",
                    "date_created": "2019-06-27",
                    "inserted_by": "1",
                    "created_at": "2019-06-27 09:46:36",
                    "updated_at": "2019-06-27 09:46:36",
                    "archbishop": "The Most Revd Dr. Segun Okubadejo, Ph.D, FCIPA",
                    "e_secretary": "Rt. Rev. Olukemi o. Oduntan",
                    "c_secretary": "Ven. Samuel A.O. Osungbeju",
                    "treaser": "Mr O.O Obisesan",
                    "image": "ibadan.jpg"
                }
            ],
            dioceses: [
                {
                    "id": 7,
                    "diocese_name": "Ife",
                    "date_created": "2019-06-27",
                    "province_id": "7",
                    "inserted_by": "1",
                    "created_at": "2019-06-27 09:48:42",
                    "updated_at": "2019-06-27 09:48:42"
                }
            ],
            searchprovinces:[
                {
                    "id": 7,
                    "province_name": "Ibadan",
                    "date_created": "2019-06-27",
                    "inserted_by": "1",
                    "created_at": "2019-06-27 09:46:36",
                    "updated_at": "2019-06-27 09:46:36"
                }
            ],
        };
      }
    static navigationOptions = {
        header: null
      }
    componentDidMount = () => {

        this.setState({provinces:this.props.data.provinces.slice()});
        this.setState({dioceses:this.props.data.dioceses.slice()});
        this.setState({searchprovinces:this.props.data.provinces.slice()});
    }  
    showprovince = (val) =>{
        //e.preventDefault();
        this.setState({showthisData:val});
    } 
    showdiocese = async (val) =>{
        //Alert.alert(val);
        await this.props.dispatch(current_diocese(val));
        this.props.navigation.navigate('tab');
    }
    getText = (val) => {
        this.setState({provinces:[]});
        this.setState({search:val});
        let listprovinces = [];
        for(let f  = 0; f < this.state.searchprovinces.length; f++){
            let index = this.state.searchprovinces[f].province_name.toLowerCase().search(val.toLowerCase());
            //Alert.alert(index.toString());
            
            if(index > -1){
                //console.error(index);
                listprovinces.push(this.state.searchprovinces[f]);
            }
        }
        this.setState({provinces:listprovinces.slice()});
        if(val == ''){
            this.setState({provinces:this.state.searchprovinces.slice()});
        }
    }
    render(){
        return (
           <ScrollView style={styles.container}> 
            <SafeAreaView>   
            <View>
                <View style={styles.first}>
                    <Text style={{color:'#fff',fontSize:18,fontFamily: "Roboto-Bold"}}>Church of Nigeria</Text>
                    <TextInput 
                            onChangeText = {(text) => this.getText(text)}
                            placeholder = 'Search by Name'
                            style={{marginTop:10,backgroundColor:'#fff',borderBottomLeftRadius:5,borderBottomRightRadius:5,borderTopLeftRadius:5,borderTopRightRadius:5, width:'100%',height:45,padding:5,borderWidth: 2,borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0}}
                        />
                </View>
                <View style={styles.second}>
                   <Text style={{color:'#fff',fontSize:18,fontFamily: "Roboto-Bold"}}> List of Province</Text>
                </View>
                {this.state.provinces.map((province) =>
                       
                        <View key={province.id.toString()} value={province.province_name}>
                            <View style={styles.third}>
                                <TouchableOpacity onPress = {() => this.showprovince(province.id.toString())} style={{backgroundColor:'#fff',padding:10,borderBottomLeftRadius:5,borderBottomRightRadius:5,borderTopLeftRadius:5,borderTopRightRadius:5}}>
                                    <Text style={{alignSelf:'center',color:'#790779', fontFamily: "Roboto-Bold", fontSize:20}}>{province.province_name}</Text>
                                </TouchableOpacity>
                            </View>

                            {this.state.showthisData ==  province.id.toString()  ? (<View style={styles.four}>
                                <Image
                                source={{uri: `http://doifedirectory.com.ng/assets/img/${province.image}`}}
                                style={{width:80,height:80, alignSelf:'center', borderRadius:40}}
                                />
                                <Text style={{color:'#fff',alignSelf:'center',fontFamily: "Roboto-Regular"}}>{province.archbishop}</Text>
                                <Text style={{color:'#fff',alignSelf:'center', fontSize:14,fontFamily: "Roboto-Bold",textTransform:'uppercase'}}>Archbishop of <Text>{province.province_name}</Text> province</Text>
                                <Text style={{marginTop:10,color:'#fff', fontSize:14,fontFamily: "Roboto-Regular"}}>Episcopal Secretary: <Text>{province.e_secretary}</Text></Text>
                                <Text style={{color:'#fff', fontSize:14,fontFamily: "Roboto-Regular"}}>Clerical Secretary: <Text>{province.c_secretary}</Text> </Text>
                                <Text style={{color:'#fff', fontSize:14,fontFamily: "Roboto-Regular"}}>Treasurer: <Text>{province.treasurer}</Text></Text>
                            <View style={{marginTop:30}}>
                            <Text style={{color:'#fff',alignSelf:'center', fontSize:14,fontFamily: "Roboto-Bold"}}>Diocese in Ibadan Province</Text>  
                            {this.state.dioceses.map((diocese) => 
                               province.id.toString() == diocese.province_id &&
                                <TouchableOpacity onPress = {() => this.showdiocese(diocese.id.toString(),diocese.diocese_name.toString())} key={diocese.id.toString()} value={diocese.diocese_name} style={{backgroundColor:'#fff',marginTop:6,padding:10,borderBottomLeftRadius:5,borderBottomRightRadius:5,borderTopLeftRadius:5,borderTopRightRadius:5}}>
                                        <Text style={{alignSelf:'center',color:'#790779', fontFamily: "Roboto-Bold", fontSize:14}}>{diocese.diocese_name}</Text>
                                    </TouchableOpacity>
                                
                            )}
                            </View>
                        </View>):null}
                            
                       </View>
                    )}
                    
            </View>
            </SafeAreaView>
           </ScrollView>
        )
    }
}
const mapStateToProps =  state => {
    return {
        data: state.AsyncReducer,
        update_data:state.updateReducer
    }
}
export default connect(mapStateToProps)(HomeScreen);
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#19181D',
        height:Math.floor(Dimensions.get('window').height),
        padding:20
    },
    first:{
        backgroundColor:'transparent',
        justifyContent:'center',   
        alignItems:'center'
    },
    second:{
        marginTop:20,
        marginBottom:20,
        justifyContent:'center', 
        alignItems:'center',
        justifyContent:'flex-end'
    },
    third:{
        justifyContent:'center', 
        marginBottom:7
    },
    four:{
        marginTop:10,
        marginBottom:10,
        backgroundColor:'#790779',
        padding: 10
    },
})