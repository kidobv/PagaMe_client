
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import pagame from '../../apis/pagame'
import swal from 'sweetalert'


class SignupForm extends React.Component {

    renderError({ error, touched }) {//distructured parameters from meta
        if (touched && error) {
            return (
                <div className = "row">
                    <div className="ui error message">
                        <div className="header">{error}</div>
                    </div>
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

    onSubmit = async (formValues) => {
        try {
            const response = await pagame.get(`/users/${formValues.email}`);
            if (response.data.email) {
                swal("Account already exists", "The email entered is already associated with an account", "warning");
            }
            else {
                //Need to check status to make sure there was no error before submit
                this.props.onSubmit(formValues);
            }
        } catch (error) {
            swal("Sorry", "There was a problem when trying to create your account", "warning");
        }        
    }

    render() {
        return (
            <div >
                <h2 className="ui teal image header">
                    {/* <img src="assets/images/logo.png" className="image"> */}
                    <div className="content">
                        Create an account
                    </div>
                </h2>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui large form error">
                    <div className="ui stacked segment">
                        <div className="field">
                            <Field name="fullName" type="text" icon="user" component={this.renderInput} placeholder="Full Name" />
                        </div>
                        <div className="field">
                            <Field name="email" type="email" icon="mail" component={this.renderInput} placeholder="E-mail address" />
                        </div>
                        <div className="field">
                            <Field name="password" type="password" icon="lock" component={this.renderInput} placeholder="Password" />
                        </div>
                        <div className="field">
                            <Field name="re_password" type="password" icon="lock" component={this.renderInput} placeholder="Confirm your password" />
                        </div>
                    </div>
                    <button className="ui fluid large teal submit button">Sign up</button>
                </form>
            </div>

        );
    };
};

const validate = (formValues) => {
    const errors = {};
    //redux form looks at the name property if an errors property as the same name as the field then Redux form is going to take that error message and pass it into the renderInput function
    //basically the callback function that that specific field is calling and passing the fromProps
    if (!formValues.fullName) {
        errors.fullName = "*";
    }
    if (!formValues.email) {
        errors.email = "*";
    }
    if (!formValues.password) {
        errors.password = "*";
    }
    if (!formValues.re_password) {
        errors.re_password = "*";
    }
    if (!(formValues.password === formValues.re_password)) {
        errors.re_password = "Password confirmation does not match";
    }
    return errors
}

export default reduxForm({ //reduxForm is very similar to connect except it takes only one argument {}
    form: 'login form',
    validate: validate
})(SignupForm);

