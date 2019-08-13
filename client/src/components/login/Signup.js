import React from 'react'
import history from '../../history'
import { connect } from "react-redux";
import LoginForm from "./LoginForm"
import { signIn, createUser, getEmail } from "../../actions";


class Signup extends React.Component {

    componentDidMount() {
        console.log(this.props.isSignedIn);
        if (this.props.isSignedIn === true) {
            this.props.fetchExpenses();
        }
        else {
            history.push('/login');
        }
    }

    render() {
        return (
            <div className="ui container">
                <LoginForm onSubmit={this.onSubmit} />
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



export default connect(mapStateToProps, { signIn, createUser, getEmail })(Signup)
