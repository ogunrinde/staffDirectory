import store from '../store/index';
import LOGIN from './action_types';
import LOGOUT from './action_types';
import USERDATA from './action_types';
import {Alert} from 'react-native';

export const login = () => {
    return {
        type: 'LOGIN'
    }
};
export const receive_access = (msg) => {
    return {
        type: 'GETACCESS',
        data:msg
    }
};
export const receive_verify = (msg) => {
    return {
        type: 'GETVERIFY',
        data:msg
    }
};
export const create_account = () => {
    return {
        type: 'ACCOUNT'
    }
};
export const account_msg = (msg) => {
    return {
        type: 'ACCOUNT_MSG',
        data:msg
    }
};
export const newpassword = (msg) => {
    return {
        type: 'NEW_PASSWORD',
        data:msg
    }
};
export const reset_id = (msg) => {
    return {
        type: 'RESET_ID',
        data:msg
    }
};
export const password_reset = () => {
    return {
        type: 'PASSWORD_RESET'
    }
};
export const receive_data = userData => {
    return {
        type: 'USERDATA',
        data: userData
    }
};
export const receive_error = () => {
    return {
        type: 'ERROR'
    }
};
export const receive_expire = userdata => {
    return {
        type: 'EXPIRE',
        data:userdata
    }
};

export const receive_network = () => {
    return {
        type: 'NETWORK'
    }
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}
export const update_diocese = (diocese) => {
    return {
        type: 'UPDATE_DIOCESE',
        data: diocese
    }
}
export const update_profile = (profile_id) => {
    return {
        type: 'UPDATE_PROFILE',
        data: profile_id
    }
}
export const current_diocese = (diocese) => {
    return function(dispatch, getState) {
        return dispatch(update_diocese(diocese));
    };
}
export const current_profile = (profile_id) => {
    return function(dispatch, getState) {
        return dispatch(update_profile(profile_id));
    };
}
export const thunk_action_creator = (username, password) => {
    const user = username.replace(/\s/g, "");
    const pass = password.replace(/\s/g, "");
    const data = {email:user, password:pass};
    store.dispatch(login());
    return function(dispatch, getState) {
        return fetch(`http://www.doifedirectory.com.ng/api/auth/login`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
          .then(data => data.json())
          .then(data => {
              //console.error(data);
              if(data.message == 'unauthorized'){
                  Alert.alert("Username and Password does not Match");
                  dispatch(receive_error());
              }else if(data.message =='subscription expired'){
                Alert.alert("Subscription Expired, Kindly renew to Log In");
                //Alert.alert(data.email);
                  dispatch(receive_expire(data));
              }else{
                dispatch(receive_data(data));
              }
                //console.error(data);
                //Alert.alert(data.access_token);
                //
          })
          .catch(err => {
            Alert.alert(err.toString());
            dispatch(receive_error());
              //dispatch(receive_network())
          });
    };
}
export const getacess = (email) => {

    const data = {email:email};
    store.dispatch(login());
    return function(dispatch, getState) {
        return fetch(`http://www.doifedirectory.com.ng/api/auth/getaccess`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
          .then(data => data.json())
          .then(data => {
              if(data.message == 'code available'){
                  //Alert.alert(data.access_code);
                  dispatch(receive_access(data));
              }else{
                dispatch(receive_error());
              }
                //console.error(data);
                //Alert.alert(data.access_token);
                //
          })
          .catch(err => {
            Alert.alert(err.toString());
            dispatch(receive_error());
              //dispatch(receive_network())
          });
    };
}

export const register = (username, password,confirm_password,email) => {
    const user = username.replace(/\s/g, "");
    const pass = password.replace(/\s/g, "");
    const cpassword = confirm_password.replace(/\s/g, "");
    const user_email = email.replace(/\s/g, "");
    const data = {name:user, password_confirmation:cpassword,email:user_email,password:pass};
    store.dispatch(create_account());
    return function(dispatch, getState) {
        return fetch(`http://www.doifedirectory.com.ng/api/auth/signup`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
          .then(data => data.json())
          .then(data => {
              if(data.message == '1'){
                  dispatch(account_msg(data));
              }else{
                dispatch(account_msg(data));
              }
                //console.error(data);
                //Alert.alert(data.access_token);
                //
          })
          .catch(err => {
            Alert.alert(err.toString());
            dispatch(receive_error())
          });
    };
}

export const verify = (reference, email) => {
    const data = {reference:reference,email:email};
    store.dispatch(login());
    return function(dispatch, getState) {
        return fetch(`http://www.doifedirectory.com.ng/api/auth/verify`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
          .then(data => data.json())
          .then(data => { 
              dispatch(receive_verify(data));
                //console.error(data.status);
                //Alert.alert(data.status);
                //
          })
          .catch(err => {
            Alert.alert(err.toString());
            dispatch(receive_error())
          });
    };
}
export const reset = (email) => {
    const user_email = email.replace(/\s/g, "");
    const data = {email:user_email};
    store.dispatch(password_reset());
    return function(dispatch, getState) {
        return fetch(`http://www.doifedirectory.com.ng/api/auth/getemail`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
          .then(data => data.json())
          .then(data => {
              dispatch(reset_id(data));
                //console.error(data);
                //Alert.alert(data.access_token);
                //
          })
          .catch(err => {
            Alert.alert(err.toString());
            dispatch(receive_error())
          });
    };
}

export const update_password = (password,email_id) => {
    const user_password = password.replace(/\s/g, "");
    //const email = email_id.replace(/\s/g, "");
    const data = {password:user_password,email_id:email_id};
    store.dispatch(password_reset());
    return function(dispatch, getState) {
        return fetch(`http://www.doifedirectory.com.ng/api/auth/reset`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
          .then(data => data.json())
          .then(data => {
              dispatch(newpassword(data));
          })
          .catch(err => {
            Alert.alert(err.toString());
            dispatch(receive_error())
          });
    };
}