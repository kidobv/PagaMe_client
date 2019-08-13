import React from 'react';
import history from '../../history'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { fetchExpenses } from '../../actions'

class ExpenseList extends React.Component {

    componentDidMount = () => {
        console.log(this.props.isSignedIn);
        if (this.props.isSignedIn === true) {
            this.props.fetchExpenses();
        }
        else{
            history.push('/login');
        }
    }
    // renderAdmin(expense) {
    //     if (expense.userId === this.props.currentUserId) {
    //         return (
    //             <div className="right floated content">
    //                 <Link to={`/expenses/edit/${expense.id}`} className="ui button primary">
    //                     Edit
    //                 </Link>
    //                 <button className="ui button negative">
    //                     Delete
    //                 </button>
    //             </div>
    //         );
    //     }
    // };

    renderList() {
        return this.props.expenses.map(expense => {
            return (
                <div className="item" key={expense.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {expense.title}
                        <div className="description">{expense.description}</div>
                    </div>
                </div>
            );
        });
    };

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to="/expenses/new" className="ui  button primary">
                        Create Expense
                    </Link>
                </div>
            );
        }
    };

    render() {
        return <div>
            <h2>Expenses</h2>
            <div className="ui celled list">{this.renderList()}</div>
            <div>{this.renderCreate()}</div>
        </div>
    };
};

const mapStateToProps = state => {
    return {//here we extract what we need from the redux store object (state) to set as props to this component
        expenses: Object.values(state.expenses),//Object values turns all the values inside the given object into an array
        usrProfile: state.auth.usrProfile,
        isSignedIn: state.auth.isSignedIn
    }
}
//using connect here will pass the state object from the redux store as an argument to the mapStateToProps
export default connect(mapStateToProps, { fetchExpenses })(ExpenseList);