import React from 'react'
import GoogleAuth from './GoogleAuth'
import { Field, reduxForm } from 'redux-form'


class LoginForm extends React.Component {

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
        return (
            <div >
                <h2 className="ui teal image header">
                    {/* <img src="assets/images/logo.png" className="image"> */}
                    <div className="content">
                        Log-in to your account
                    </div>
                </h2>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui large form error">
                    <div className="ui stacked segment">
                        <div className="field">
                            <Field name="email" type="email" icon="user" component={this.renderInput} placeholder="E-mail address" />
                        </div>
                        <div className="field">
                            <Field name="password" type="password" icon="lock" component={this.renderInput} placeholder="Password" />
                        </div>
                    </div>
                    <div className="ui fluid large teal submit button">Login</div> 
                </form>
                <div className="ui message">
                    Don't have an account? <a href="#"> Sign Up</a>
                </div>
                <div className="ui horizontal divider">
                    Or
                </div>
                <div className="row justify-content-center"><GoogleAuth/></div>
                
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
    if (!formValues.password) {
        errors.description = "You must enter your password";
    }
    return errors
}

export default reduxForm({ //reduxForm is very similar to connect except it takes only one argument {}
    form: 'login form',
    validate: validate
})(LoginForm);