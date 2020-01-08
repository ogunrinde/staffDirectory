const update_state = {
    currentdiocese:'0',
    currentprofile:'0'
}
const updateReducer = (state = update_state, action) => {
    switch(action.type){
        case 'UPDATE_DIOCESE':
                    return Object.assign({}, state,{
                        currentdiocese:action.data
        });
        case 'UPDATE_PROFILE':
                    return Object.assign({}, state,{
                        currentprofile:action.data
        });
    }
    return state;
};

export default updateReducer;