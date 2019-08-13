import React from 'react'
import { connect } from "react-redux";
import { signOut } from "../../actions";

class HeaderLogout extends React.Component {

    onSignOutClick = () => {//remember this.auth is a reference to the AuthInstance from gapi declared inside the then() method
        this.authInstance.signOut();
    }

    renderButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui teal button">
                    Sign out
                </button>
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
    return { isSignedIn: state.auth.isSignedIn }; // passed as props
};
export default connect(mapStateToProps, { signOut })(HeaderLogout)