
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { signOut } from "../actions";

class Header extends React.Component {

    onSignOutClick = () => {//remember this.auth is a reference to the AuthInstance from gapi declared inside the then() method
        this.props.signOut();
        this.props.authInstance.signOut();
    }

    renderButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <div className="ui secondary pointing menu">
                    <div className="right menu">
                        <button onClick={this.onSignOutClick} className="ui teal button">
                            Sign out
                        </button>
                    </div>
                    <div className="left menu">
                        <Link to="/" className="item">
                            Home
                        </Link>
                    </div>
                </div>                
            );
        }
    }

    render() {
        return (
            <div>{this.renderButton()}</div>
        );
    }
};

const mapStateToProps = (state) => {
    //need to pass signed status into state from regular login
    return { isSignedIn: state.auth.isSignedIn,
        authInstance: state.auth.instance }; // passed as props
};
export default connect(mapStateToProps, { signOut })(Header)

