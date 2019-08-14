import React from 'react';
import history from '../../history'
import { connect } from 'react-redux';
import { createExpense } from '../../actions';
import ExpenseForm from './ExpenseForm';

class ExpenseCreate extends React.Component {

    componentDidMount = () => {
        if (this.props.isSignedIn !== true) {           
            history.push('/login');
        }
    }
  
    onSubmit = (formValues) => {
        if(formValues.requestee){
            this.props.createExpense(formValues);
        } 
         else{
            formValues.requestee = this.props.usrProfile.email; 
            this.props.createExpense(formValues);
         }
    }

    render() {
        return (
            <div>
                <h3>Create an Expense</h3>
                <ExpenseForm onSubmit = {this.onSubmit} />
            </div>
            
        );
    };
};
const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        usrProfile: state.auth.usrProfile
    }
}
export default connect(mapStateToProps, { createExpense })(ExpenseCreate);