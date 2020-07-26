import React from 'react';
import {NavLink, BrowserRouter, Route, Switch} from 'react-router-dom'
import '../../styles/admin.css';
import {getUser, removeUserSession} from '../../services/auth.service';

import GenerateReport from './generateReport';
import Tithe from './tithe';
import Welfare from './welfare';

const Accounts = (props) => {
    const user = getUser();
    const logOut = (e) => {
        e.preventDefault();
        axios.get("http://localhost:5000/api/logout")
        .then(response => {
            swal(response.data.message)
            removeUserSession();
            props.history.push('/');
        })
        .catch(error => {
            if(error.response.status === 400){
                swal(error.response.data.message)
            }
        })
      };
    return(
        <BrowserRouter>
            <div>
                <div id="header">
                <div className="bar">
                    <center>Welcome {user.name}</center>
                    <center><strong>
                        Accounts
                    </strong></center>
                    </div>
                </div>
                <center><ul id="nav">
                    <li>
                        
                    <center><NavLink to="/accounts/tithe" activeStyle={{color: "red"}}><p>Add Tithe</p></NavLink></center>
                    </li>
                    <li>
                        <span></span>
                        <center><NavLink to="/accounts/welfare" activeStyle={{color: 'red'}}><p>Add Welfare</p></NavLink></center>
                    </li>
                    <li>
                        <span></span>
                        <center><NavLink to="/accounts/generateReports" activeStyle={{color: "red"}}><p>Generate Reports</p></NavLink></center>
                    </li>
                
                    <li>
                        <span></span>
                        <center><form onSubmit={e => logOut(e)}>
                            <NavLink to="/"><p>Log Out</p></NavLink>
                                </form></center>
                    </li>
                </ul>
                </center>
                <Switch>
                    <Route exact path="/accounts/tithe" component={Tithe}></Route>
                    <Route exact path="/accounts/welfare" component={Welfare}></Route>
                    <Route exact path="/accounts/generateReports" component={GenerateReport}></Route>
                </Switch>
                <p></p>
            </div>
        </BrowserRouter>
        
    )
    
}

export default Accounts;