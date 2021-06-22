import React, {useCallback} from "react";
import {withRouter} from "react-router-dom"
import app from "./Base";
import './form.css';

const SignUp = ({history}) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault()
        const {email, password} = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div className={"body-form"}>
            <div className="form-container">
                <form onSubmit={handleSignUp}>
                    <h1>Register</h1>
                    <label>Email
                        <input name="email" type="email" placeholder="email"/>
                    </label>
                    <label>Password
                        <input name="password" type="password" placeholder="Password"/>
                    </label>
                    <button type={"submit"}>Sign up</button>
                </form>
            </div>
        </div>
    )
};

export default withRouter(SignUp);
