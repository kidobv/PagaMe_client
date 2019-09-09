import _ from 'lodash';
import { CREATE_EXPENSE, FETCH_EXPENSES, FETCH_EXPENSE, DELETE_EXPENSE} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case CREATE_EXPENSE:
            return { ...state, [action.payload._id]: action.payload }; 
        case FETCH_EXPENSES:
            return {..._.mapKeys(action.payload, '_id')};
        case FETCH_EXPENSE:
            return {...state, [action.payload._id]: action.payload};
        case DELETE_EXPENSE:
            return _.omit(state, action.payload); 
        default:             
            return state;
    }
}