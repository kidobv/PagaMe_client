import React from 'react';
import { Router, Route } from 'react-router-dom'
import ExpenseCreate from "./expenses/ExpenseCreate";
import ExpenseList from "./expenses/ExpenseList";
import ExpenseShow from "./expenses/ExpenseShow";
import Login from "./login/Login"
import Header from "./Header"
import history from "../history" //to use it we need to use Router instead of the BrowserRouter component

const App = () => {
    return (
        <div className="ui container">            
            <Router history={history}>
                <Header />
            {/* exact prop by itself means exact = {ture} */}
                <Route path="/" exact component={ExpenseList} />
                <Route path="/login" exact component={Login} />
                <Route path="/expenses/new" exact component={ExpenseCreate} />
                <Route path="/expenses/show/:id" exact component = {ExpenseShow}/>
            </Router>
        </div>
    );
};
export default App