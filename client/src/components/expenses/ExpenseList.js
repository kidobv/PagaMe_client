import React from 'react';
import history from '../../history'
import swal from 'sweetalert'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchExpenses, deleteExpense } from '../../actions'

class ExpenseList extends React.Component {

    componentDidMount = () => {
        //Makes sure to only fetch expenses when the user is signed in and the expenses list hasn't been loaded yet
        if (this.props.isSignedIn === true) {
            if (this.props.expenses.length === 0)
                this.props.fetchExpenses(this.props.usrProfile.email);
        }
        else {
            history.push('/login');
        }
    }
    handleExpenseDelete = (expenseId) => {
        swal({
            title: "Are you sure?",
            text: "This will permanenlty delete the record",
            icon: "warning",
            buttons: ["cancel", "Yes"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.deleteExpense(expenseId, this.props.usrProfile.email);                    
                }
            });
    }

    renderList() {
        return this.props.expenses.map(expense => {
            var monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const d = new Date(expense.date)
            const date = monthname[d.getMonth()] + "/" + d.getDate() + "/" + d.getFullYear();
            return (
                <tr key={expense._id}>
                    <td>{expense.description}</td>
                    <td><h4>${expense.amount}</h4></td>
                    <td>{date}</td>
                    <td>
                        <div className="row">
                            <div className='col-sm-8'>
                                {expense.requestee}
                            </div>
                            <div className='col-sm-4'>
                                <button onClick={() => { this.handleExpenseDelete(expense._id) }}
                                    className="mini ui inverted red button" style={{ float: 'right' }}>Delete</button>
                            </div>
                        </div>

                    </td>
                </tr>
            );
        });
    };

    renderCreateBtn() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                    <div className="ui buttons">
                        <Link to="/expenses/add" className="ui  button primary">
                            Add Expense
                        </Link>
                        <div className="or"></div>
                        <Link to="/expenses/request" className="ui positive button">
                            Request Expense
                        </Link>
                    </div>
                </div>

            );
        }
    };

    render() {
        return <div>
            <h2>Expenses History</h2>
            <table className="ui celled padded table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Requestee</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderList()}
                </tbody>
            </table>
            <div>{this.renderCreateBtn()}</div>
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
export default connect(mapStateToProps, { fetchExpenses, deleteExpense })(ExpenseList);