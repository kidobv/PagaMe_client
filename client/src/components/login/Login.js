import React from 'react'
import history from '../../history'
import { connect } from "react-redux";
import LoginForm from "./LoginForm"
import { signIn, getEmail } from "../../actions";


class Login extends React.Component {

    componentDidMount() {
        if (this.props.isSignedIn === true) {
            history.push("/")
        }
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



export default connect(mapStateToProps, { signIn, getEmail })(Login)
