import React from 'react';
import { connect } from 'react-redux';
import { createExpense } from '../../actions';
import ExpenseForm from './ExpenseForm';

class ExpenseCreate extends React.Component {

  
    onSubmit = (formValues) => {
        this.props.createExpense(formValues);
    }

    render() {
        return (
            <div>
                <h3>Create a Expense</h3>
                <ExpenseForm onSubmit = {this.onSubmit} />
            </div>
            
        );
    };
};


export default connect(null, { createExpense })(ExpenseCreate);