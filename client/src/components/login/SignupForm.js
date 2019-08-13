import React from 'react'
import { Field, reduxForm } from 'redux-form'


class SignupForm extends React.Component {

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
        const className = `ui labeled input ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`
        const { placeholder, type, icon } = formProps;
        const iconClass = `${icon} icon`
        return (
            <div className={className} >
                <div className="ui label">
                    <i className={iconClass}></i>
                </div>
                <input type={type} placeholder={placeholder}  {...formProps.input} />
                {/* meta property from redux forms has the error messages for each field */}
                {this.renderError(formProps.meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (//onSubmit with redux forms handler -- also un semamntic UI if we don't specify the error class inside the form className the errors are going to be hidden by default
            <div className="ui middle aligned center aligned grid">
                <div className="six wide column">
                    <h2 className="ui teal image header">
                        {/* <img src="assets/images/logo.png" className="image"> */}
                        <div className="content">
                            Create an account
                            </div>
                    </h2>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui large form error">
                        <div className="ui stacked segment">
                            <div className="field">
                                <Field name="email" type="email" icon="user" component={this.renderInput} placeholder="E-mail address" />
                            </div>
                            <div className="field">
                                <Field name="fullName" type="text" icon="user" component={this.renderInput} placeholder="Full Name" />
                            </div>
                            <div className="field">
                                <Field name="password" type="Password" icon="lock" component={this.renderInput} placeholder="Password" />
                            </div>
                            <div className="field">
                                <Field name="re_password" type="Password" icon="lock" component={this.renderInput} placeholder="Confirm Password" />
                            </div>
                        </div>
                        <div className="ui fluid large teal submit button">Sign Up</div>
                    </form>
                </div>
            </div>

        );
    };
};

const validate = (formValues) => {
    const errors = {};
    //redux form looks at the name property if an errors property as the same name as the field then Redux form is going to take that error message and pass it into the renderInput function
    //basically the callback function that that specific field is calling and passing the fromProps
    if (!formValues.email) {
        errors.title = "You must enter a valid email address ";
    }
    if (!formValues.fullName) {
        errors.title = "You must enter a valid email address ";
    }
    if (!formValues.password) {
        errors.description = "You must enter your password";
    }
    if (formValues.password.length < 6) {
        errors.description = "Your password must be 6 characters or longer";
    }    
    if (!formValues.re_password) {
        errors.description = "You must enter your password";
    }
    if (formValues.re_password !== formValues.password ) {
        errors.description = "The specified passwords do not match";
    }
    return errors
}

export default reduxForm({ //reduxForm is very similar to connect except it takes only one argument {}
    form: 'signup form',
    validate: validate
})(SignupForm);