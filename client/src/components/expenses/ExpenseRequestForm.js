import React from 'react';
import pagame from '../../apis/pagame'
import { Field, reduxForm } from 'redux-form'
import swal from 'sweetalert'

class ExpenseRequestForm extends React.Component {

    state = { errors: {} }

    renderError({ error, touched }) {//distructured parameters from meta
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    //everytime the Field tag calls the renderInput function it's going to pass a number of arguments as props
    renderInput = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} type={formProps.type}/>
                {/* meta property from redux form has the error messages for each field */}
                {this.renderError(formProps.meta)}
            </div>
        );
    };

    //Need to verify that requestee email address is valid
    onExpenseSubmit = async (formValues) => {
        const response = await pagame.get(`/users/${formValues.requestee}`);
        if(response.data.email){
            this.props.onSubmit(formValues);
        }
        else{
            swal("Email not found", response.data, "warning");
        }
    }

    render() {
        return (//onSubmit with redux forms handler -- also un semamntic UI if we don't specify the error class inside the form className the errors are going to be hidden by default
            <div>
                <form onSubmit={this.props.handleSubmit(this.onExpenseSubmit)} className="ui form error">
                    <Field name="description" component={this.renderInput} label="Enter Description" />
                    <Field name="amount" component={this.renderInput} label="Enter Amount" />                    
                    <Field name="requestee" type="email" component={this.renderInput} label="Enter Requestee email" />
                    <button className="ui positive button">Submit Request</button>                    
                </form>
            </div>
        );
    };
};

const validate = (formValues) => {
    const errors = {};
    //redux form looks at the name property if an errors property as the same name as the field then Redux form is going to take that error message and pass it into the renderInput function
    //basically the callback function that that specific field is calling and passing the fromProps
    if (!formValues.description) {
        errors.description = "You must enter a description";
    }
    if (!formValues.amount) {
        errors.amount = "You must enter an amount";
    }
    if (!formValues.requestee) {
        errors.requestee = "You must enter the requestee email address";
    }
    return errors
}

export default reduxForm({ //reduxForm is very similar to connect except it takes only one argument {}
    form: 'expense form',
    validate: validate
})(ExpenseRequestForm);
