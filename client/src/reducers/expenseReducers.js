import _ from 'lodash';
import { CREATE_EXPENSE, FETCH_EXPENSES,FETCH_EXPENSE} from '../actions/types';

export default (state = [], action) =>{
    switch (action.type) {
        case FETCH_EXPENSES:
            return {...state, ..._.mapKeys(action.payload, '_id')};
        case FETCH_EXPENSE:
            return {...state, [action.payload._id]: action.payload};
        case CREATE_EXPENSE:
            return { ...state, [action.payload._id]: action.payload};      
        
        default:
            return state;
    }
}