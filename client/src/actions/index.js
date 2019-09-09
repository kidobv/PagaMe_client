import pagame from '../apis/pagame'
import history from '../history'
import swal from 'sweetalert'

import {
    SIGN_IN, SIGN_OUT, CREATE_EXPENSE, FETCH_EXPENSES,
    FETCH_EXPENSE, DELETE_EXPENSE
} from "./types";


export const signIn = (authInstance) => {
    //needs to handle case where profile doesn't load and authInstance is null
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

// Authenticate User in Backend
export const authUser = (formValues) => {
    return async (dispatch) => {
        const response = await pagame.post('/users/find', { ...formValues })
        const profile = response.data
        if (response.data.fullName) {
            const usrProfile = {
                fullName: profile.fullName,
                email: profile.email
            }
            dispatch({
                type: SIGN_IN,
                payload: usrProfile,
                instance: null
            });
            history.push('/');
        }
        else {
            //swal to handle error
            swal("Not found", response.data, "warning");
        }

    }
}

export const signOut = () => {   
    return {
        type: SIGN_OUT
    };
};

//this is using redux thunk therefore we will pass the dispatch function
export const createExpense = (formValues) => {
    //we need to set a handle on the response that we get form the post, we will be getting the record that was created
    return async (dispatch, getState) => {
        //tweek to remove posible $ entires
        formValues.amount = formValues.amount.replace("$", "");
        //format the date to be added to the expense record
        var date = new Date()
        const userId = getState().auth.usrProfile.userId;
        const requestor = getState().auth.usrProfile.email;

        const response = await pagame.post('/expenses/create', { ...formValues, requestor, userId, date }); //here we are taking all the objects inside formValues and adding the userId
        dispatch({
            type: CREATE_EXPENSE,
            payload: response.data
        });
        history.push('/');

    };
}

export const fetchExpenses = (userEmail) => {
    return async (dispatch) => {
        const response = await pagame.get(`/expenses/${userEmail}/all`);
        dispatch(
            {
                type: FETCH_EXPENSES,
                payload: response.data
            });
    };
}

export const deleteExpense = (id) => {
    return async (dispatch) => {
        try{
            const response = await pagame.delete(`/expenses/${id}/delete`);
            dispatch(
                {
                    type: DELETE_EXPENSE,
                    payload: response.data._id //passing the ID of the deleted record in the response to omit in our reducer
                });
            swal("Successfully Deleted!", {
                icon: "success",
            });
        }catch(error){
            swal("Error while trying to delete", {
                icon: "error",
            });
        }        
    };
};

export const fetchExpense = (id) => {
    return async (dispatch) => {
        const response = await pagame.get(`/expenses/${id}`);
        dispatch(
            {
                type: FETCH_EXPENSE,
                payload: response.data
            });
    };
};


