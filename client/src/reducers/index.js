import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'; //giving it an alias
import authReducer from './authReducer';
import expenseReducer from './expenseReducers'

export default combineReducers ({
    auth: authReducer,
    form: formReducer,
    expenses: expenseReducer
});