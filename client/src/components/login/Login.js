import React from 'react'
import { connect } from "react-redux";
import LoginForm from "./LoginForm"
import { signIn, authUser } from "../../actions";


class Login extends React.Component {

     onSubmit = (formValues) =>{
        this.props.authUser(formValues);
    }

    render() {
        
        return (
            <div className="row justify-content-md-center" style={{marginTop:'20px'}}>
                <div className="col-md-8 col-sm-10 col-xs-12">
                    <LoginForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        usrProfile: state.auth.usrProfile,
        isSignedIn: state.auth.isSignedIn
    };
};



export default connect(mapStateToProps, { signIn, authUser })(Login)
