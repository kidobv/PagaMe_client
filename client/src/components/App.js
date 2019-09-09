import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import ExpenseCreate from "./expenses/ExpenseCreate";
import ExpenseList from "./expenses/ExpenseList";
import Login from "./login/Login"
import Signup from "./login/Signup"
import Header from "./Header"
import history from "../history" //to use it we need to use Router instead of the BrowserRouter component


const App = () => {    
    return (        
        <div className="container">            
            <Router history={history}>
                <div className = "row">
                    <Header />
                </div>
                <div className="container">
                    <Switch>
                        {/* exact prop by itself means exact = {ture} */}
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/" exact component={ExpenseList} />
                        <Route path="/expense/add" exact component={ExpenseCreate} />
                        <Route path="/expense/request" exact component={ExpenseCreate} />
                        {/* default route */}
                        <Route component={ExpenseList} />
                        {/* <Route path='*' exact={true} component={ExpenseList} /> */}
                    </Switch>
                   
                </div>            
           
            </Router>
        </div>
    );
};

export default (App);