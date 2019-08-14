
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { signOut } from "../actions";

class Header extends React.Component {

    onSignOutClick = () => {//remember this.auth is a reference to the AuthInstance from gapi declared inside the then() method
        this.props.signOut();
        this.props.authInstance.signOut();
    }

    renderCollapseMenu() {
        return (this.props.isSignedIn ?
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> : null
        );
    }
    renderLoggedNav() {
        return (this.props.isSignedIn ?
            // <div className="right menu ">
            //     <div className = "ui item">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <h5 className="nav-link">
                            <Link to="/" >
                                Home
                            </Link>
                        </h5>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <h5 className="nav-link">
                            <Link to="/expenses/new" >
                                Create
                            </Link>
                        </h5>
                    </li>
                </ul>
                <div className="ui divider"></div>
                <button onClick={this.onSignOutClick} className="ui teal google button">
                    Sign out
                </button>
            </div> : null
        );

    }

    renderHeader() {
        return (
            // <div className="ui secondary pointing menu">
            //     {this.renderWelcome()}
            //     {this.renderSignoutButton()}
            // </div>
            <div>
                <nav className="navbar navbar-expand-lg border-bottom bg-white fixed-top shadow-sm justify-content-between navbar-light">
                    <h3 className="navbar-brand">PagaMe</h3>
                    {this.renderCollapseMenu()}  
                    {this.renderLoggedNav()}
                </nav>
            </div>
        );
    }

    render() {
        return (
            <div style={{ marginTop: '70px' }}>{this.renderHeader()}</div>
        );
    }
};

const mapStateToProps = (state) => {
    //need to pass signed status into state from regular login
    return {
        isSignedIn: state.auth.isSignedIn,
        authInstance: state.auth.instance
    }; // passed as props
};
export default connect(mapStateToProps, { signOut })(Header)

