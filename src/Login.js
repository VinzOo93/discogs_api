import React, {useCallback, useContext} from "react";
import {withRouter, Redirect} from "react-router-dom"
import app from "./Base";
import './form.css';
import {AuthContext} from "./Auth";

const Login = ({history}) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/"/>
    }

    return (
        <div className={"body-form"}>
            <div className="form-container">
                <form onSubmit={handleLogin}>
                    <h1>Log In</h1>
                    <label>Email
                        <input name="email" type="email" placeholder="email"/>
                    </label>
                    <label>Password
                        <input name="password" type="password" placeholder="Password"/>
                    </label>
                    <button type={"submit"}>Log In</button>
                    <a className={"link-register"} href="/signup">Create your Account</a>
                </form>
            </div>
        </div>
    );
};
export default withRouter(Login);
