import React from 'react';
import history from '../../history'
import { connect } from 'react-redux';
import { createExpense } from '../../actions';
import ExpenseAddForm from './ExpenseAddForm';
import ExpenseRequestForm from './ExpenseRequestForm';


class ExpenseCreate extends React.Component {

    componentWillMount() {
        if (this.props.isSignedIn !== true) {
            history.push("/login")
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
            return (this.props.location.pathname === "/expense/add" ?
                <div>
                    <h3>Add an Expense</h3>
                    <ExpenseAddForm onSubmit={this.onSubmit} />
                </div>
                :
                <div>
                    <h3>Request an Expense</h3>
                    <ExpenseRequestForm onSubmit={this.onSubmit} />
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