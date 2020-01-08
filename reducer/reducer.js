import LOGIN from '../action/action_types';
import LOGOUT from '../action/action_types';
import USERDATA from '../action/action_types';
import { combineReducers } from 'redux';

//let date = new Date();
const initial_state = {
    userData:{},
    archdeaconaries:[],
    officials:[],
    dioceses:[],
    parishes:[],
    profiles:[],
    provinces:[],
    isFetching:false,
    isError:false,
    isLoggedIn:false,
    create_account:false,
    account_msg:'',
    expired:false,
    renewal_email:'',
    password_reset:false,
    reset_id:0,
    newpasswordmsg: 0,
    paystack_ref:'',
    paystack_access:'',
    payment_status:'',
    payment_msg:''
};

const AsyncReducer = (state = initial_state, action) => {
   switch(action.type){
       case 'LOGIN':
           return Object.assign({}, state, {
              isFetching:true,
              userData:{},
              archdeaconaries:[],
                officials:[],
                dioceses:[],
                parishes:[],
                profiles:[],
                provinces:[],
                isError:false,
                isLoggedIn: false,
                create_account:false,
                account_msg:'',
                password_reset:false,
                reset_id:0,
                newpasswordmsg: 0
           });
           case 'GETACCESS':
           return Object.assign({}, state, {
              isFetching:false,
              userData:{},
              archdeaconaries:[],
                officials:[],
                dioceses:[],
                parishes:[],
                profiles:[],
                provinces:[],
                isError:false,
                isLoggedIn: false,
                create_account:false,
                account_msg:'',
                password_reset:false,
                reset_id:0,
                newpasswordmsg: 0,
                paystack_access:action.data.access_code,
                paystack_ref:action.data.reference

           });
           case 'GETVERIFY':
           return Object.assign({}, state, {
              isFetching:false,
               userData:{},
               archdeaconaries:[],
                officials:[],
                dioceses:[],
                parishes:[],
                profiles:[],
                provinces:[],
                isError:false,
                isLoggedIn: false,
                create_account:false,
                account_msg:'',
                password_reset:false,
                reset_id:0,
                newpasswordmsg: 0,
                paystack_access:'',
                paystack_ref:'',
                expired:false,
                payment_status:action.data.status,
                payment_msg:action.data.message

           });
        case 'USERDATA':
            return Object.assign({}, state, {
                isFetching: false,
                userData:action.data,
                archdeaconaries:action.data.archdeaconaries,
                officials:action.data.officials,
                dioceses:action.data.dioceses,
                parishes:action.data.parishes,
                profiles:action.data.profiles,
                provinces:action.data.provinces,
                isError:false,
                isLoggedIn: true,
                create_account:false,
                account_msg:'',
                password_reset:false,
                reset_id:0,
                newpasswordmsg: 0
            });
        case 'LOGOUT':
            return Object.assign({}, state,{
                isFetching:false,
                userData:{},
                archdeaconaries:[],
                officials:[],
                dioceses:[],
                parishes:[],
                profiles:[],
                provinces:[],
                isError:false,
                isLoggedIn: false,
                create_account:false,
                account_msg:'',
                password_reset:false,
                reset_id:0,
                newpasswordmsg: 0
            });
             
            case 'ERROR':
                return Object.assign({}, state,{
                    isFetching:false,
                    userData:{},
                    archdeaconaries:[],
                    officials:[],
                    dioceses:[],
                    parishes:[],
                    profiles:[],
                    provinces:[],
                    isError:true,
                    isLoggedIn: false,
                    create_account:false,
                    account_msg:'',
                    password_reset:false,
                    reset_id:0,
                    newpasswordmsg: 0
                });
                case 'EXPIRE':
                return Object.assign({}, state,{
                    isFetching:false,
                    userData:{},
                    archdeaconaries:[],
                    officials:[],
                    dioceses:[],
                    parishes:[],
                    profiles:[],
                    provinces:[],
                    isError:false,
                    isLoggedIn: false,
                    create_account:false,
                    expired:true,
                    renewal_email:action.data.email,
                    account_msg:'',
                    password_reset:false,
                    reset_id:0,
                    newpasswordmsg: 0
                });
                case 'ACCOUNT':
                    return Object.assign({}, state,{
                        isFetching:false,
                        userData:{},
                        archdeaconaries:[],
                        officials:[],
                        dioceses:[],
                        parishes:[],
                        profiles:[],
                        provinces:[],
                        isError:false,
                        isLoggedIn: false,
                        create_account:true,
                        account_msg:'',
                        password_reset:false,
                        reset_id:0,
                        newpasswordmsg: 0
                }); 
                case 'ACCOUNT_MSG':
                    return Object.assign({}, state,{
                        isFetching:false,
                        userData:{},
                        archdeaconaries:[],
                        officials:[],
                        dioceses:[],
                        parishes:[],
                        profiles:[],
                        provinces:[],
                        isError:false,
                        isLoggedIn: false,
                        create_account:false,
                        account_msg:action.data.message,
                        password_reset:false,
                        reset_id:0,
                        newpasswordmsg: 0
                });  
                case 'PASSWORD_RESET':
                    return Object.assign({}, state,{
                        isFetching:false,
                        userData:{},
                        archdeaconaries:[],
                        officials:[],
                        dioceses:[],
                        parishes:[],
                        profiles:[],
                        provinces:[],
                        isError:false,
                        isLoggedIn: false,
                        create_account:false,
                        account_msg:'',
                        password_reset:true,
                        reset_id:0,
                        newpasswordmsg: 0
                }); 
                case 'RESET_ID':
                    return Object.assign({}, state,{
                        isFetching:false,
                        userData:{},
                        archdeaconaries:[],
                        officials:[],
                        dioceses:[],
                        parishes:[],
                        profiles:[],
                        provinces:[],
                        isError:false,
                        isLoggedIn: false,
                        create_account:false,
                        account_msg:'',
                        password_reset:false,
                        reset_id:action.data.email_id,
                        newpasswordmsg: 0
                });  
                case 'NEW_PASSWORD':
                    return Object.assign({}, state,{
                        isFetching:false,
                        userData:{},
                        archdeaconaries:[],
                        officials:[],
                        dioceses:[],
                        parishes:[],
                        profiles:[],
                        provinces:[],
                        isError:false,
                        isLoggedIn: false,
                        create_account:false,
                        account_msg:'',
                        password_reset:false,
                        reset_id:0,
                        newpasswordmsg:action.data.message
                });        
            
                   
    } 
   return state;
};

export default AsyncReducer;