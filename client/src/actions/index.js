import expenses from '../apis/expenses'
import history from '../history'

import { SIGN_IN, SIGN_OUT, 
    CREATE_EXPENSE,
    FETCH_EXPENSES, FETCH_EXPENSE} from "./types";

export const signIn = (authInstance) =>{
    //.currentUser.get().getBasicProfile()
    //needs to handle case where profile doesn't load
    const profile = authInstance.currentUser.get().getBasicProfile()
    const usrProfile = {
                    userId: profile.getId(),
                    fullName: profile.getName(),
                    email: profile.getEmail()
                }
    return {
        type: SIGN_IN,
        payload: usrProfile,
        instance: authInstance
    };
};

export const signOut = () => {
    history.push('/login');
    return {
        type: SIGN_OUT
    };
};

//this is using redux thunk therefore we will pass the dispatch function
export const createExpense = (formValues) =>{
    //we need to set a handle on the response that we get form the post, we will be getting the record that was created
    return async (dispatch, getState) =>{
        const { userId } = getState().auth.usrProfile;
        const response = await expenses.post('/expenses', {...formValues, userId}); //here we are taking all the objects inside formValues and adding the userId
        dispatch(
           {
               type: CREATE_EXPENSE,
               payload: response.data
        });
        history.push('/'); //this is how we change routes without a user input
    };
}

export const fetchExpenses = () => {   
    return async (dispatch) => {
        const response = await expenses.get('/expenses');
        dispatch(
            {
                type: FETCH_EXPENSES,
                payload: response.data
            });
    };
}

export const fetchExpense = (id) => {
    return async (dispatch) => {
        const response = await expenses.get(`/expenses/${id}`);
        dispatch(
            {
                type: FETCH_EXPENSE,
                payload: response.data
            });
    };
};

//validate if email exists in our records
export const getEmail = (formValues) =>{

}

export const createUser = (formValues) => {
    //we need to set a handle on the response that we get form the post, we will be getting the record that was created
    return async (dispatch, getState) => {
        // const usrProfile = {
        //     userId: profile.getId(),
        //     fullName: profile.getName(),
        //     email: profile.getEmail()
        // }
        //from google auth
        const { usrProfile } = getState().auth;
        const response = await expenses.post('/users', { ...formValues }, usrProfile); //here we are taking all the properties inside formValues and adding the userId
        dispatch(
            {
                type: CREATE_EXPENSE,
                payload: response.data
            });
        history.push('/'); //this is how we change routes without a user input
    };
}


