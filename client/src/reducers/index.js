import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'; //giving it an alias
import authReducer from './authReducer';
import expenseReducer from './expenseReducers'
import { SIGN_OUT } from '../actions/types';

// const appReducer = combineReducers({ 
//     auth: authReducer,
//     form: formReducer,
//     expenses: expenseReducer
    
// });
// export default appReducer

//Resetting when logout
//reducers are supposed to return the initial state when they are called with undefined as the first argument, no matter the action

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    expenses: expenseReducer
});


export default (state, action) => (
    action.type === SIGN_OUT
        ? rootReducer(undefined, action)
        : rootReducer(state, action)
)