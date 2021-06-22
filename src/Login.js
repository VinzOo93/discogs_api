import React, {useCallback, useContext} from "react";
import {withRouter, Redirect} from "react-router-dom"
import app from "./Base";
import {AuthContext} from "./Auth";

const Login = ({history}) => {
    const  handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                    await  app
                        .auth()
                        .signInWithEmailAndPassword(email.value, password.value);
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const  {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleLogin}>
                <label>Email
                    <input name="email" type="email" placeholder="email"/>
                </label>
                <label>Password
                    <input name="password" type="password" placeholder="Password"/>
                </label>
                <button type={"submit"}>Log In</button>
            </form>
            <a href="/signup">Create your Account</a>
        </div>
    );
};
export default withRouter(Login);
