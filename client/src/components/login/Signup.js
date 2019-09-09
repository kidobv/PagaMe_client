import React from 'react'
import history from '../../history'
import pagame from '../../apis/pagame'
import swal from 'sweetalert'
import { connect } from "react-redux";
import SignupForm from "./SignupForm"
import { authUser } from "../../actions";



class Signup extends React.Component {

    componentWillMount() {
        if (this.props.isSignedIn === true) {
            history.push("/")
        }
    }

    onSubmit = async (formValues) =>{
        //remove re_password since it's only needed for validation
        if(formValues.re_password){
            delete formValues.re_password
        }
        //api call to create User
        try{
            const response = await pagame.post('/users/create', { ...formValues });
            if(response.data === 'error'){
                swal("Sorry", "Unable to create account", "error");
            }
            else{
                swal("Welcome to PagaMe", "Your account has been created successfully", "success");
                this.props.authUser(response.data);
            }            
        }catch(error){
            //Log the error
            swal("Sorry", "Unable to create account", "error");
        }        
    }

    render() {        
        return (
            <div className="row justify-content-md-center" style={{ marginTop: '20px' }}>
                <div className="col-md-8 col-sm-10 col-xs-12">
                    <SignupForm onSubmit={this.onSubmit} />
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

export default connect(mapStateToProps, { authUser })(Signup)
