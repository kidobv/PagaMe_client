import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
    isSignedIn: null,
    usrProfile:null,
    instance:null
};

export default (state = INITIAL_STATE, action) =>{    
    switch(action.type){        
        case SIGN_IN:
            return { ...state, isSignedIn: true, usrProfile: action.payload, instance: action.instance};
        case SIGN_OUT:
            return { ...state, isSignedIn: false, usrProfile: null, instance: null};
        default:
            return state;
    }
};