import React from 'react';
import history from '../../history'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchExpenses } from '../../actions'

class ExpenseList extends React.Component {

    componentDidMount = () => {
        if (this.props.isSignedIn === true) {
            this.props.fetchExpenses();
        }
        else {
            history.push('/login');
        }
    }

    renderList() {
        return this.props.expenses.map(expense => {
            return (
                <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td><h4>${expense.amount}</h4></td>
                    <td>{expense.date}</td>
                    <td>{expense.requestee}</td>
                </tr>
            );
        });
    };

    renderCreateBtn() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right', marginBottom: '10px' }}>
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
export default connect(mapStateToProps, { fetchExpenses })(ExpenseList);